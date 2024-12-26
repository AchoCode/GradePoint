from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .functions import calculate_total, calculate_average, check_subject_grade, generate_card_no
from .serializers import UserSerializer, CommentSerializer, StudentSerializer, ScratchCardSerializer
from .models import Student, User, Course, ScratchCard
from rest_framework.permissions import AllowAny, IsAuthenticated

class UserRegistration(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            usr = serializer.save()
            return Response(
                {'message': 'user created successfully', 'user':serializer.data},
                  status=status.HTTP_201_CREATED
                  )
        return Response(
            serializer.errors,
              status=status.HTTP_400_BAD_REQUEST
              )

class CreateCommentView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'comment submitted successfully'},
                  status=status.HTTP_201_CREATED
                  )
        return Response(
            serializer.errors,
              status=status.HTTP_400_BAD_REQUEST
              )
        
class CreateStudentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = StudentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentListAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
    
        #* get authenticated user
        usr = User.objects.filter(username=request.user).first()
        #* get user student list
        students_list = usr.students.all().values('id','name', 'level', 'reg_no','average','overall_total')

        data_to_send = {
            'students':students_list,
        }
        return Response({'payload': data_to_send}, status=status.HTTP_200_OK)

class DeleteStudentView(APIView):
    def delete(self, request, student_id):
        try:
            # Retrieve the student instance by its ID
            student = Student.objects.get(id=student_id)
            student.delete()  # Perform the deletion
            return Response({"message": "Student deleted successfully"}, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            # If the student with the given ID does not exist
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Catch any other exceptions
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CreateScratchCardView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        num_cards = request.data.get('number_of_cards', 0)

        # if not isinstance(num_cards, int) and int(num_cards) <= 0 : 
        #     return Response({"error": "Invalid number of cards"}, status=status.HTTP_400_BAD_REQUEST)
        
        for _ in range(num_cards):
            card_no = generate_card_no()

            card_data = {
                'card_number': card_no
            }

            serializer = ScratchCardSerializer(data=card_data, context={'request':request})
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': f'{num_cards} created successfully!'}, status=status.HTTP_201_CREATED)

class ScratchCardListAPI(APIView):
    def get(self, request, *args,**kwargs):
        usr = User.objects.filter(username=request.user).first()

        usr_cards = usr.cards.all().values('id','card_number','is_valid','valid_period','no_of_times_used')

        data_to_send = {
            'cards' : usr_cards
        }
        return Response({'payload': data_to_send}, status=status.HTTP_200_OK)

class DeleteCardView(APIView):
    def delete(self, request, card_id):
        try:
            # Retrieve the student instance by its ID
            card = ScratchCard.objects.get(id=card_id)
            card.delete()  # Perform the deletion
            return Response({"message": "card deleted successfully"}, status=status.HTTP_200_OK)
        except card.DoesNotExist:
            # If the student with the given ID does not exist
            return Response({"error": "card not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Catch any other exceptions
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BaseCalculationAPI(APIView):
    def post(self, request):
        permission_classes = [AllowAny]

        try:
            payload = request.data.get('payLoad', '')
            if not payload:
                return Response({'error': 'payload missing'}, status=status.HTTP_400_BAD_REQUEST)
            
            # query for the student
            student_name = request.data.get("studentName", '')
            print(f'{student_name}, hiiii')
            
            student_level  = request.data.get("level", '')
            student_usr = Student.objects.filter(name=student_name, level=student_level).first()
            

            if not student_usr:
                if request.user.is_authenticated:
                    return Response({'error':'Student not found. Please check the "Manage Students" section.'}, 
                                    status=status.HTTP_400_BAD_REQUEST)
                
                #creates student

                student_usr = Student(
                    name = student_name,
                    level = student_level
                )
                student_usr.save()
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
                        'error': f'missing scores for {subject["name"]}'
                        }, 
                        status=status.HTTP_400_BAD_REQUEST
                        )
                
                try:
                    total_score = calculate_total(test_score,exam_score)
                except ValueError:
                    return Response(
                        {'error': f"invalid score format for {subject['name']}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                Course.objects.create(
                    subject=subject['name'],
                    test_score = test_score,
                    exam_score =  exam_score,
                    total_score = total_score,
                    student_user = student_usr
                )

                scores[subject['key']] = {'totalScore': total_score}

            # calculating average and overall total
            average, overall_total = calculate_average(*[score['totalScore'] for score in scores.values()])

            # update student usr model
            student_usr.average = average
            student_usr.overall_total = overall_total
            student_usr.save()

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
        