from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .functions import calculate_total, calculate_average, check_subject_grade
from .serializers import UserSerializer

class UserRegistration(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            usr = serializer.save()
            return Response(
                {'message': 'user created successfully', 'user':serializer.data},
                  status=status.HTTP_201_CREATED
                  )
        print(serializer.errors)
        return Response(
            serializer.errors,
              status=status.HTTP_400_BAD_REQUEST
              )
    
class BaseCalculationAPI(APIView):
    def post(self, request):
        try:
            payload = request.data.get('payLoad', '')
            if not payload:
                return Response({'error': 'payload missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            student_name = request.data.get("studentName", '')
            scores = {}

              # Dynamically extract subjects from the payload
            subjects = [{'name': key, 'key': key} for key in payload.keys()]
            if not subjects:
                return Response({'error': 'no subjects found in the payload'}, status=status.HTTP_400_BAD_REQUEST)

            # process every subject
            for subject in subjects:
                test_score = payload.get(subject['name'], {}).get('testScore')
                exam_score = payload.get(subject['name'], {}).get('examScore')

                if test_score is None or exam_score is None:
                    return Response({
                        'error': f'missing scores for {subject['name']}'}, 
                        status=status.HTTP_400_BAD_REQUEST
                        )
                
                try:
                    total_score = calculate_total(test_score,exam_score)
                except ValueError:
                    return Response(
                        {'error': f"invalid score format for {subject['name']}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                scores[subject['key']] = {'totalScore': total_score}

                # calculating average and overall total
            average, overall_total = calculate_average(*[score['totalScore'] for score in scores.values()])

            # build json response
            data_to_send = {
                'AVERAGE': average,
                'TOTAL SCORE': overall_total,
                **scores,
            }
            return Response({'payload': data_to_send}, status=status.HTTP_200_OK)

        except Exception as e:
            # log the exception for debugging
            print('Error in BaseCalculationAPI: %s', str(e))
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_400_BAD_REQUEST)
            


class NurseryCalculationAPI(BaseCalculationAPI):
    def post(self, request):
        return super().post(request)

class PrimaryCalculationAPI(BaseCalculationAPI):
    def post(self, request):
        return super().post(request)

class SecondaryCalculationAPI(BaseCalculationAPI):
    def post(self, request):

        # calls the base post method to calculate scores
        base_response = super().post(request)

        if base_response.status_code != 200:
            return base_response
        
        # adds grades for each subject to the payload
        data = base_response.data.get('payload', {})
        scores = {key: value for key,value in data.items() if isinstance(value, dict)}

        for subject, details in scores.items():
            if 'totalScore' in details:
                total_score = details['totalScore']
                details['grade'] = check_subject_grade(total_score)

        return Response({'payload': data}, status=status.HTTP_200_OK)
        