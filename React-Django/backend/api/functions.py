# calculating total score
def calculate_total(test_score, exam_score):
    return int(test_score) + int(exam_score)

# calculating grade total and average
def calculate_average(*args):
    grade_total = sum(args)
    number_of_courses = len(args)
    average = round(grade_total / number_of_courses, 1)
    return average, grade_total

def check_subject_grade(subject_total):
    #do some grade checking
    return 