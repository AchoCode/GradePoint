from flask import Blueprint, request, render_template, flash , jsonify
from .functions import main, total, average_score, sec_average_score, sec_total
from . import db
from .models import Student
import json

views = Blueprint('views', __name__)   


@views.route('/', methods=['GET', 'POST'])
def grade():
    name_of_student = ''
    average = ''
    total_score = '' 
    math_test = ''
    math_exam = ''
    math_total = ''
    eng_test = ''
    eng_exam = ''
    eng_total = '' 
    bst_test = ''
    bst_exam = ''
    bst_total = ''
    cca_exam = ''
    cca_test = ''
    cca_total = ''
    prevoc_exam = ''
    prevoc_test = ''
    prevoc_total = ''
    igbo_test = ''
    igbo_exam = ''
    igbo_total = ''
    quant_test = ''
    quant_exam = ''
    quant_total = ''
    verbal_test = ''
    verbal_exam = ''
    verbal_total = '' 
    lit_test = ''
    lit_exam = ''
    lit_total = ''
    rnv_test = ''
    rnv_exam = ''
    rnv_total=''
    if request.method == 'POST':
        name_of_student = request.form.get('name')

        math_test = request.form.get('math-test')
        math_exam = request.form.get('math-exam')
        math_test, math_exam, math_total = main(math_test,math_exam)

        eng_test = request.form.get('eng-test')
        eng_exam = request.form.get('eng-exam')
        eng_test, eng_exam, eng_total = main(eng_test,eng_exam)

        bst_test = request.form.get('bst-test')
        bst_exam = request.form.get('bst-exam')
        bst_test, bst_exam, bst_total = main(bst_test,bst_exam)

        rnv_test = request.form.get('rnv-test')
        rnv_exam = request.form.get('rnv-exam')
        rnv_test, rnv_exam, rnv_total = main(rnv_test,rnv_exam)

        prevoc_test = request.form.get('prevoc-test')
        prevoc_exam = request.form.get('prevoc-exam')
        prevoc_test, rnv_exam, prevoc_total = main(prevoc_test,prevoc_exam)

        cca_test = request.form.get('cca-test')
        cca_exam = request.form.get('cca-exam')
        cca_test, cca_exam, cca_total = main(cca_test,cca_exam)

        igbo_test = request.form.get('igbo-test')
        igbo_exam = request.form.get('igbo-exam')
        igbo_test, igbo_exam, igbo_total = main(igbo_test,igbo_exam)


        quant_test = request.form.get('quant-test')
        quant_exam = request.form.get('quant-exam')
        quant_test, quant_exam, quant_total = main(quant_test,quant_exam)


        verbal_test = request.form.get('verbal-test')
        verbal_exam = request.form.get('verbal-exam')
        verbal_test, verbal_exam, verbal_total = main(verbal_test,verbal_exam)


        lit_test = request.form.get('lit-test')
        lit_exam = request.form.get('lit-exam')
        lit_test, lit_exam, lit_total = main(lit_test,lit_exam)

        total_score = total(math_total, eng_total, bst_total, rnv_total, prevoc_total, igbo_total, cca_total, verbal_total, quant_total, lit_total)
        average = average_score(total_score)


    return render_template('grade.html',name_of_student=name_of_student, average=average, total_score=total_score, math_test=math_test, math_exam=math_exam, math_total=math_total, eng_test=eng_test, eng_exam=eng_exam,
                           eng_total=eng_total, bst_test=bst_test, bst_exam=bst_exam, bst_total=bst_total, cca_exam=cca_exam, cca_test=cca_test, cca_total=cca_total,
                           prevoc_exam=prevoc_exam, prevoc_test=prevoc_test, prevoc_total=prevoc_total, igbo_test=igbo_test, igbo_exam=igbo_exam, igbo_total=igbo_total,
                           quant_test=quant_test, quant_exam=quant_exam, quant_total=quant_total, verbal_test=verbal_test, verbal_exam=verbal_exam, verbal_total=verbal_total,
                            lit_test=lit_test, lit_exam=lit_exam, lit_total=lit_total, rnv_test=rnv_test, rnv_exam=rnv_exam, rnv_total=rnv_total)


@views.route('/secondary', methods=['GET', 'POST'])
def seccondary_grade():
    name_of_student = ''
    sec_average = ''
    sec_total_score = '' 
    math_test = ''
    math_exam = ''
    math_total = ''
    eng_test = ''
    eng_exam = ''
    eng_total = '' 
    basic_tech_test = ''
    basic_tech_exam = ''
    basic_tech_total = ''
    cca_exam = ''
    cca_test = ''
    cca_total = ''
    Agric_exam = ''
    Agric_test = ''
    Agric_total = ''
    igbo_test = ''
    igbo_exam = ''
    igbo_total = ''
    Homec_test = ''
    Homec_exam = ''
    Homec_total = ''
    Basic_sci_test = ''
    Basic_sci_exam = ''
    Basic_sci_total = '' 
    lit_test = ''
    lit_exam = ''
    lit_total = ''
    crs_test = ''
    crs_exam = ''
    crs_total=''
    civic_test = ''
    civic_exam = ''
    civic_total=''
    social_studies_test = ''
    social_studies_exam = ''
    social_studies_total=''
    computer_test = ''
    computer_exam = ''
    computer_total=''
    phe_test = ''
    phe_exam = ''
    phe_total=''
    business_studies_test = ''
    business_studies_exam = ''
    business_studies_total=''
    if request.method == 'POST':
        name_of_student = request.form.get('name')

        math_test = request.form.get('math-test')
        math_exam = request.form.get('math-exam')
        math_test, math_exam, math_total = main(math_test,math_exam)

        eng_test = request.form.get('eng-test')
        eng_exam = request.form.get('eng-exam')
        eng_test, eng_exam, eng_total = main(eng_test,eng_exam)

        basic_tech_test = request.form.get('basic-tech-test')
        basic_tech_exam = request.form.get('basic-tech-exam')
        basic_tech_test, basic_tech_exam, basic_tech_total = main(basic_tech_test,basic_tech_exam)

        civic_test = request.form.get('civic-test')
        civic_exam = request.form.get('civic-exam')
        civic_test, civic_exam, civic_total = main(civic_test,civic_exam) 

        Agric_test = request.form.get('agric-test')
        Agric_exam = request.form.get('agric-exam')
        Agric_test, Agric_exam, Agric_total = main(Agric_test,Agric_exam)

        cca_test = request.form.get('cca-test')
        cca_exam = request.form.get('cca-exam')
        cca_test, cca_exam, cca_total = main(cca_test,cca_exam)

        igbo_test = request.form.get('igbo-test')
        igbo_exam = request.form.get('igbo-exam')
        igbo_test, igbo_exam, igbo_total = main(igbo_test,igbo_exam)

        Homec_test = request.form.get('homec-test')
        Homec_exam = request.form.get('homec-exam')
        Homec_test, Homec_exam, Homec_total = main(Homec_test,Homec_exam)

        Basic_sci_test = request.form.get('basic-sci-test')
        Basic_sci_exam = request.form.get('basic-sci-exam')
        Basic_sci_test, Basic_sci_exam, Basic_sci_total = main(Basic_sci_test,Basic_sci_exam)
        
        lit_test = request.form.get('lit-test')
        lit_exam = request.form.get('lit-exam')
        lit_test, lit_exam, lit_total = main(lit_test,lit_exam)

        business_studies_test = request.form.get('business-studies-test')
        business_studies_exam = request.form.get('business-studies-exam')
        business_studies_test, business_studies_exam, business_studies_total = main(business_studies_test,business_studies_exam)

        phe_test = request.form.get('phe-test')
        phe_exam = request.form.get('phe-exam')
        phe_test, phe_exam, phe_total = main(phe_test,phe_exam)

        crs_test = request.form.get('crs-test')
        crs_exam = request.form.get('crs-exam')
        crs_test, crs_exam, crs_total = main(crs_test,crs_exam)

        computer_test = request.form.get('computer-test')
        computer_exam = request.form.get('computer-exam')
        computer_test, computer_exam, computer_total = main(computer_test,computer_exam)

        social_studies_test = request.form.get('social-studies-test')
        social_studies_exam = request.form.get('social-studies-exam')
        social_studies_test, social_studies_exam, social_studies_total = main(social_studies_test,social_studies_exam)


        sec_total_score = sec_total(math_total, eng_total, basic_tech_total, Basic_sci_total, Agric_total, igbo_total, cca_total, Homec_total, business_studies_total, lit_total, computer_total, phe_total, crs_total, civic_total, social_studies_total)
        sec_average = round(sec_average_score(sec_total_score), 1)

        student = Student.query.filter_by(Name=name_of_student).first()

        if student :
            flash("Sorry student's results has been calculateda")
        elif name_of_student == "":
            flash('Please enter a Name')
        else:
            try:
                student = Student(Name=name_of_student, Average=sec_average, Total_score=sec_total_score)
                db.session.add(student)
                db.session.commit()
            except:
                flash('problem')


    return render_template('sec-grade.html', students = Student.query.all(), name_of_student=name_of_student, sec_average=sec_average, sec_total_score=sec_total_score, math_test=math_test, math_exam=math_exam, math_total=math_total, eng_test=eng_test, eng_exam=eng_exam, social_studies_test=social_studies_test, crs_test=crs_test,
                           eng_total=eng_total, basic_tech_test=basic_tech_test, basic_tech_exam=basic_tech_exam, basic_tech_total=basic_tech_total, cca_exam=cca_exam, cca_test=cca_test, cca_total=cca_total, phe_test=phe_test, phe_exam=phe_exam, phe_total=phe_total, crs_exam=crs_exam, crs_total=crs_total,
                           Agric_test=Agric_test, Agric_exam=Agric_exam, Agric_total=Agric_total, igbo_test=igbo_test, igbo_exam=igbo_exam, igbo_total=igbo_total, business_studies_test=business_studies_test,business_studies_total=business_studies_total, business_studies_exam=business_studies_exam,
                           Homec_test=Homec_test, Homec_exam=Homec_exam, Homec_total=Homec_total, Basic_sci_test=Basic_sci_test, Basic_sci_exam=Basic_sci_exam, Basic_sci_total=Basic_sci_total,social_studies_exam=social_studies_exam, social_studies_total=social_studies_total,
                           lit_test=lit_test, lit_exam=lit_exam, lit_total=lit_total, Civic_test=civic_test, Civic_exam=civic_exam, Civic_total=civic_total, computer_test=computer_test, computer_exam=computer_exam, computer_total=computer_total)


@views.route('/delete-usr', methods=['GET','POST'])
def delete_usr():
    usr = json.loads(request.data)
    usrId = usr['usrId']
    usr = Student.query.get(usrId)
    if usr:
        db.session.delete(usr)
        db.session.commit()
    return jsonify({})