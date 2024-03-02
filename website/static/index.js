function deleteUsr(usrId) {
    fetch('/delete-usr',{
        method: 'POST',
        body: JSON.stringify({ usrId: usrId})
    }).then((_res)=>{
        window.location.href='/secondary'
    })
};

let forms = document.querySelectorAll('.form-control')
const ClearBtn = document.getElementById('clearBtn')

ClearBtn.addEventListener('click', ()=>{
    forms.forEach(function clear(forms){
        forms.value = "";
    })
})

const BackToTopBtn = document.getElementById('BackToTopBtn')

BackToTopBtn.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})