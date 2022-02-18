/* variables */
const move_forms = document.getElementById("movimiento-forms");
const move_btns = document.getElementById("movimiento-btns");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn_back = document.getElementById("btn-retro");
const btn_edit = document.getElementById("btn-editar");
const btn_save = document.getElementById("btn-save");
const report_area = document.getElementById("reporte");
const items_container = document.querySelectorAll(".container-items");
let pag = 0;
/* reporte */
const reporte = {
    titulo: '',
    fecha: '',
    ruta: '',
    plan: '',
    distancia: 0,
    metrajeCable:{
        inicio:0,
        final:0
    },
    postesUsados:calcPostes(this.distancia),
    postesInsalados:{
        cantidad: 0,
        cordenadasPostes:{}
    },
    ferreteria:{
        opgw : 0,
        clevis: calcClevis(this.postesUsados,this.postesInsalados.cantidad),
        pasantes: calcPasantes(this.postesUsados,this.postesInsalados.cantidad),
        preformados: calcPreformados(this.postesUsados,this.postesInsalados.cantidad),
        cinta_bandi: calcCinta_bandi(this.postesUsados,this.postesInsalados.cantidad),
        hebillas: calcHebillas(this.postesUsados,this.postesInsalados.cantidad),
        mufa:{
            cantidad: 0,
            cordenadasMufas:{}
        },
        retenidasInstaladas:0
    }

}
/* funciones  reutilizables*/
const limitNext = () => (pag <= 1 ? pag++ : (pag = 2));
const limitBack = () => (pag > 0 ? pag-- : (pag = 0));
const move = () => {
  move_forms.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`;
  move_btns.style.transform = `translateX(calc(${pag} * (calc(-100% - 64px))))`;
};
const nextPag = () => {
  limitNext();
  move();
};
const backPag = () => {
  limitBack();
  move();
};
const copiarPortapapeles = () => {
  report_area.select();
  document.execCommand("copy");
  btn_save.focus();
};

/* eventos */
btn1.addEventListener("click", nextPag);
btn2.addEventListener("click", nextPag);
btn_back.addEventListener("click", backPag);
btn_edit.addEventListener("click", backPag);
btn_save.addEventListener("click", copiarPortapapeles);
/* aciones de botones items segun su id*/
const acciones_items = {
  "btn-desplegar": (btn) => {
    const header_item = btn.parentElement;
    header_item.classList.toggle("active");
  },
  "btn-agregar":(btn)=>{
      /* ocultando boton agregar */
      btn.classList.add('d-none')
      /* constante de botones de accion */
      const header_item_accion = btn.parentElement.querySelector('.acciones')
      /* mostrando borones de accion */
      header_item_accion.classList.remove('d-none')
      /* definiendo cantidad */
      const items_nd = header_item_accion.querySelector('#unidades')
      items_nd.innerText = 1;
      console.log(header_item_accion.classList)
  }
};
items_container.forEach((e) => {
  e.addEventListener("click", (e) => {
    const btn = {
      elemento: e.target,
      name: e.target.id,
    };
    acciones_items[btn.name]
      ? acciones_items[btn.name](btn.elemento)
      : console.log(btn.name);
  });
});
