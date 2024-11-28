from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .functions import calculate_total, calculate_average

class NurseryCalculationAPI(APIView):
    def post(self, request):
        try:
            payload = request.data.get("payLoad", "")
            student_name = request.data.get('studentName', '')

            #seperate grades
            english_test_score = payload['ENGLISH']['testScore']
            english_exam_score = payload['ENGLISH']['examScore']

            math_test_score = payload['MATHEMATICS']['testScore']
            math_exam_score = payload['MATHEMATICS']['examScore']

            igbo_test_score = payload['IGBO']['testScore']
            igbo_exam_score = payload['IGBO']['examScore']

            quantitative_test_score = payload['QUANTITATIVE']['testScore']
            quantitative_exam_score = payload['QUANTITATIVE']['examScore']
            
            verbal_test_score = payload['VERBAL']['testScore']
            verbal_exam_score = payload['VERBAL']['examScore']

            social_habits_test_score = payload['SOCIAL HABITS']['testScore']
            social_habits_exam_score = payload['SOCIAL HABITS']['examScore']

            health_habits_test_score = payload['HEALTH HABITS']['testScore']
            health_habits_exam_score = payload['HEALTH HABITS']['examScore']

            computer_test_score = payload['COMPUTER']['testScore']
            computer_exam_score = payload['COMPUTER']['examScore']

            crs_test_score = payload['CHRISTIAN RELIGIOUS STUDIES']['testScore']
            crs_exam_score = payload['CHRISTIAN RELIGIOUS STUDIES']['examScore']

            writing_test_score = payload['WRITING']['testScore']
            writing_exam_score = payload['WRITING']['examScore']

            cca_test_score = payload['CULTURAL AND CREATIVE ARTS']['testScore']
            cca_exam_score = payload['CULTURAL AND CREATIVE ARTS']['examScore']

            nursery_sci_test_score = payload['NURSERY SCIENCE']['testScore']
            nursery_sci_exam_score = payload['NURSERY SCIENCE']['examScore']
            try: 
                english_total = calculate_total(english_test_score, english_exam_score)
                math_total  = calculate_total(math_test_score, math_exam_score)
                igbo_total = calculate_total(igbo_test_score, igbo_exam_score)
                quantitative_total  = calculate_total(quantitative_test_score, quantitative_exam_score)
                verbal_total = calculate_total(verbal_test_score, verbal_exam_score)
                social_habits_total  = calculate_total(social_habits_test_score, social_habits_exam_score)
                health_habits_total = calculate_total(health_habits_test_score, health_habits_exam_score)
                computer_total  = calculate_total(computer_test_score, computer_exam_score)
                crs_total = calculate_total(crs_test_score, crs_exam_score)
                writing_total  = calculate_total(writing_test_score, writing_exam_score)
                cca_total = calculate_total(cca_test_score, cca_exam_score)
                nursery_sci_total  = calculate_total(nursery_sci_test_score, nursery_sci_exam_score)
            except Exception as e:
                return Response({"error": 'please enter a Valid number'}, status=status.HTTP_200_OK)
            
            # calculating average
            average, grade_total = calculate_average(english_total,math_total,igbo_total,quantitative_total, verbal_total,social_habits_total,
                                        health_habits_total, computer_total, crs_total, writing_total, cca_total, nursery_sci_total)
            
            # send back to the frontend
            data_to_send = {
                'AVERAGE': average,
                'TOTAL SCORE': grade_total,
                'ENGLISH': {'totalScore':english_total},
                'MATHEMATICS': {'totalScore':math_total},
                'IGBO': {'totalScore':igbo_total},
                'QUANTITATIVE': {'totalScore':quantitative_total},
                'VERBAL': {'totalScore':verbal_total},
                'SOCIAL_HABITS': {'totalScore':social_habits_total},
                'HEALTH_HABITS': {'totalScore':health_habits_total},
                'COMPUTER': {'totalScore':computer_total},
                'CHRISTIAN RELIGIOUS STUDIES': {'totalScore':crs_total},
                'WRITING': {'totalScore':writing_total},
                'CULTURAL AND CREATIVE ARTS': {'totalScore':cca_total},
                'NURSERY SCIENCE': {'totalScore':nursery_sci_total},
                 }
            return Response({"payload": data_to_send}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PrimaryCalculationAPI(APIView):
    def post(self, request):
        try:
            payload = request.data.get("payLoad", "")
            student_name = request.data.get('studentName', '')

            #seperate grades
            english_test_score = payload['ENGLISH LANGUAGE']['testScore']
            english_exam_score = payload['ENGLISH LANGUAGE']['examScore']

            math_test_score = payload['MATHEMATICS']['testScore']
            math_exam_score = payload['MATHEMATICS']['examScore']

            igbo_test_score = payload['ASUSU IGBO']['testScore']
            igbo_exam_score = payload['ASUSU IGBO']['examScore']

            quantitative_test_score = payload['QUANTITATIVE REASONING']['testScore']
            quantitative_exam_score = payload['QUANTITATIVE REASONING']['examScore']
            
            verbal_test_score = payload['VERBAL REASONING']['testScore']
            verbal_exam_score = payload['VERBAL REASONING']['examScore']

            bst_test_score = payload['BASIC SCIENCE & TECHNOLOGY']['testScore']
            bst_exam_score = payload['BASIC SCIENCE & TECHNOLOGY']['examScore']

            prevoc_test_score = payload['PRE-VOCATIONAL STUDIES']['testScore']
            prevoc_exam_score = payload['PRE-VOCATIONAL STUDIES']['examScore']

            literature_test_score = payload['LITERATURE']['testScore']
            literature_exam_score = payload['LITERATURE']['examScore']

            rnv_test_score = payload['RELIGIOUS AND NATIONAL VALUES']['testScore']
            rnv_exam_score = payload['RELIGIOUS AND NATIONAL VALUES']['examScore']

            cca_test_score = payload['CULTURAL & CREATIVE ARTS']['testScore']
            cca_exam_score = payload['CULTURAL & CREATIVE ARTS']['examScore']

            try: 
                english_total = calculate_total(english_test_score, english_exam_score)
                math_total  = calculate_total(math_test_score, math_exam_score)
                igbo_total = calculate_total(igbo_test_score, igbo_exam_score)
                quantitative_total  = calculate_total(quantitative_test_score, quantitative_exam_score)
                verbal_total = calculate_total(verbal_test_score, verbal_exam_score)
                bst_total  = calculate_total(bst_test_score, bst_exam_score)
                prevoc_total = calculate_total(prevoc_test_score,prevoc_exam_score)
                literature_total  = calculate_total(literature_test_score, literature_exam_score)
                rnv_total = calculate_total(rnv_test_score, rnv_exam_score)
                cca_total = calculate_total(cca_test_score, cca_exam_score)
            except Exception as e:
                return Response({"error": 'please enter a Valid number'}, status=status.HTTP_200_OK)
            
            # calculating average
            average, grade_total = calculate_average(english_total,math_total,igbo_total,quantitative_total, verbal_total,bst_total,
                                       prevoc_total, literature_total, rnv_total, cca_total)
            
            # send back to the frontend
            data_to_send = {
                'AVERAGE': average,
                'TOTAL SCORE': grade_total,
                'ENGLISH LANGUAGE': {'totalScore':english_total},
                'MATHEMATICS': {'totalScore':math_total},
                'ASUSU IGBO': {'totalScore':igbo_total},
                'QUANTITATIVE REASONING': {'totalScore':quantitative_total},
                'VERBAL REASONING': {'totalScore':verbal_total},
                'BASIC SCIENCE & TECHNOLOGY': {'totalScore':bst_total},
                'PRE-VOCATIONAL STUDIES': {'totalScore':prevoc_total},
                'LITERATURE': {'totalScore':literature_total},
                'RELIGIOUS AND NATIONAL VALUES': {'totalScore':rnv_total},
                'CULTURAL & CREATIVE ARTS': {'totalScore':cca_total},
                 }
            return Response({"payload": data_to_send}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SecondaryCalculationAPI(APIView):
    def post(self, request):
        try:
            payload = request.data.get("payLoad", "")
            student_name = request.data.get('studentName', '')

            #seperate grades
            english_test_score = payload['ENGLISH LANGUAGE']['testScore']
            english_exam_score = payload['ENGLISH LANGUAGE']['examScore']

            math_test_score = payload['MATHEMATICS']['testScore']
            math_exam_score = payload['MATHEMATICS']['examScore']

            igbo_test_score = payload['ASUSU IGBO']['testScore']
            igbo_exam_score = payload['ASUSU IGBO']['examScore']

            civic_test_score = payload['CIVIC EDUCATION']['testScore']
            civic_exam_score = payload['CIVIC EDUCATION']['examScore']
            
            phe_test_score = payload['PHYSICAL AND HEALTH EDUCATION']['testScore']
            phe_exam_score = payload['PHYSICAL AND HEALTH EDUCATION']['examScore']

            basic_tech_test_score = payload['BASIC TECHNOLOGY']['testScore']
            basic_tech_exam_score = payload['BASIC TECHNOLOGY']['examScore']

            homec_test_score = payload['HOME ECONOMICS']['testScore']
            homec_exam_score = payload['HOME ECONOMICS']['examScore']

            literature_test_score = payload['LITERATURE']['testScore']
            literature_exam_score = payload['LITERATURE']['examScore']
            
            computer_test_score = payload['COMPUTER SCIENCE']['testScore']
            computer_exam_score = payload['COMPUTER SCIENCE']['examScore']

            crs_test_score = payload['CHRISTAIN RELIGIOUS STUDIES']['testScore']
            crs_exam_score = payload['CHRISTAIN RELIGIOUS STUDIES']['examScore']

            cca_test_score = payload['CULTURAL & CREATIVE ARTS']['testScore']
            cca_exam_score = payload['CULTURAL & CREATIVE ARTS']['examScore']
            
            history_test_score = payload['HISTORY']['testScore']
            history_exam_score = payload['HISTORY']['examScore']
            
            social_std_test_score = payload['SOCIAL STUDIES']['testScore']
            social_std_exam_score = payload['SOCIAL STUDIES']['examScore']
            
            basic_sci_test_score = payload['BASIC SCIENCE']['testScore']
            basic_sci_exam_score = payload['BASIC SCIENCE']['examScore']
            
            agric_test_score = payload['AGRICULTURAL SCIENCE']['testScore']
            agric_exam_score = payload['AGRICULTURAL SCIENCE']['examScore']
            
            business_std_test_score = payload['BUSINESS STUDIES']['testScore']
            business_std_exam_score = payload['BUSINESS STUDIES']['examScore']

            try: 
                english_total = calculate_total(english_test_score, english_exam_score)
                math_total  = calculate_total(math_test_score, math_exam_score)
                igbo_total = calculate_total(igbo_test_score, igbo_exam_score)
                civic_total  = calculate_total(civic_test_score, civic_exam_score)
                phe_total = calculate_total(phe_test_score, phe_exam_score)
                basic_tech_total  = calculate_total(basic_tech_test_score, basic_tech_exam_score)
                homec_total = calculate_total(homec_test_score,homec_exam_score)
                literature_total  = calculate_total(literature_test_score, literature_exam_score)
                crs_total = calculate_total(crs_test_score, crs_exam_score)
                computer_total  = calculate_total(computer_test_score, computer_exam_score)
                cca_total = calculate_total(cca_test_score, cca_exam_score)
                business_std_total = calculate_total(business_std_test_score, business_std_exam_score)
                agric_total = calculate_total(agric_test_score, agric_exam_score)
                basic_sci_total = calculate_total(basic_sci_test_score, basic_sci_exam_score)
                social_std_total = calculate_total(social_std_test_score, social_std_exam_score)
                history_total = calculate_total(history_test_score, history_exam_score)
            except Exception as e:
                return Response({"error": 'please enter a Valid number'}, status=status.HTTP_200_OK)
            
            # calculating average
            average, grade_total = calculate_average(english_total,math_total,igbo_total,civic_total, phe_total,basic_tech_total,
                                       homec_total, history_total, social_std_total, agric_total, basic_sci_total, business_std_total, literature_total, crs_total, cca_total, computer_total)
            
            # send back to the frontend
            data_to_send = {
                'AVERAGE': average,
                'TOTAL SCORE': grade_total,
                'ENGLISH LANGUAGE': {'totalScore': english_total},
                'MATHEMATICS': {'totalScore': math_total},
                'ASUSU IGBO': {'totalScore': igbo_total},
                'CIVIC EDUCATION': {'totalScore': civic_total},
                'PHYSICAL AND HEALTH EDUCATION': {'totalScore': phe_total},
                'BASIC TECHNOLOGY': {'totalScore': basic_tech_total},
                'HOME ECONOMICS': {'totalScore': homec_total},
                'LITERATURE_TOTAL': {'totalScore': literature_total},
                'CHRISTAIN RELIGIOUS STUDIES': {'totalScore': crs_total},
                'CULTURAL & CREATIVE ARTS': {'totalScore': cca_total},
                'COMPUTER SCIENCE': {'totalScore': computer_total},
                'BUSINESS STUDIES': {'totalScore': business_std_total},
                'BASIC SCIENCE': {'totalScore': basic_sci_total},
                'SOCIAL STUDIES': {'totalScore': social_std_total},
                'HISTORY': {'totalScore': history_total},
                'AGRICULTURAL SCIENCE': {'totalScore': agric_total},
                 }
            return Response({"payload": data_to_send}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
