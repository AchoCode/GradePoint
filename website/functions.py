def total_score(test,exam):
    return test + exam 

def total(a,b,c,d,e,f,g,h,i,j):
    z = a + b + c + d + e + f + g + h + i + j
    return z

def average_score(total_score):
    return total_score / 10

def sec_total(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o):
    z = a + b + c + d + e + f + g + h + i + j +k + l + m + n + o
    return z

def sec_average_score(total_score):
    return total_score / 15

def convert_to_int(user_input):
    try:
        if user_input.isdigit():
            user_input = int(user_input)
        else:
            print('not a number')
    except:
            print('not a number')
    return user_input

def main(test,exam):
    #convert to int
    test = convert_to_int(test)
    exam = convert_to_int(exam)
    total = 0
    #calculations
    try:
        total = int(total_score(test,exam))
    except:
        print("please input a digit")
    return test, exam ,total 

def grade():
    return 2 + 3