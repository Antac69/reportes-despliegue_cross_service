/* variables */
const movimiento = document.getElementById('movimiento-forms');
const movimiento_botones = document.getElementById('movimiento-btns');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn_retro = document.getElementById('btn-retro');
const btn_edit = document.getElementById('btn-editar');
const btn_save = document.getElementById('btn-save');
const reporte = document.getElementById('reporte');

let pag = 0;

const nextPag=()=>{
    pag++;
    movimiento.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`
    movimiento_botones.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`
}
const backPag=()=>{
    pag--;
    movimiento.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`
    movimiento_botones.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`
}
const copiarPortapapeles = async()=> {
    await reporte.select()
    await document.execCommand('copy')
};

btn1.addEventListener('click',nextPag)
btn2.addEventListener('click',nextPag)
btn_retro.addEventListener('click',backPag)
btn_edit.addEventListener('click',backPag)

btn_save.addEventListener('click',copiarPortapapeles)