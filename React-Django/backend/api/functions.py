# calculating total score
def calculate_total(test_score, exam_score):
    return int(test_score) + int(exam_score)

# calculating grade total and average
def calculate_average(*args):
    grade_total = sum(args)
    number_of_courses = len(args)
    average = round(grade_total / number_of_courses, 1)
    return average, grade_total

# calculating the grades based on the subject total
def check_subject_grade(subject_total):
    if 80 <= subject_total <= 100:
        return 'A'
    elif 70 <= subject_total <= 79:
        return 'B'
    elif 60 <= subject_total <= 69:
        return 'C'
    elif 50 <= subject_total <= 59:
        return 'D'
    elif 40 <= subject_total <= 49:
        return 'E'
    else:
        return 'F'