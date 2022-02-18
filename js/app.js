/* variables */
const move_forms = document.getElementById('movimiento-forms');
const move_btns = document.getElementById('movimiento-btns');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn_back = document.getElementById('btn-retro');
const btn_edit = document.getElementById('btn-editar');
const btn_save = document.getElementById('btn-save');
const report_area = document.getElementById('reporte');
let pag = 0;

/* funciones  reutilizables*/
const limitNext =()=> pag <= 1 ? pag++ :  pag = 2;
const limitBack =()=> pag > 0 ? pag-- :  pag = 0;
const move =()=>{
    move_forms.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`
    move_btns.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`
}
const nextPag=()=>{
    limitNext()
    move()
}
const backPag=()=>{
    limitBack()
    move()
}
const copiarPortapapeles =()=> {
    report_area.select()
    document.execCommand('copy')
    btn_save.focus()
};

btn1.addEventListener('click',nextPag)
btn2.addEventListener('click',nextPag)
btn_back.addEventListener('click',backPag)
btn_edit.addEventListener('click',backPag)
btn_save.addEventListener('click',copiarPortapapeles)