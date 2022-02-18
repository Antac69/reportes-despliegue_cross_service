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
/* funciones  reutilizables*/
const calcPostes = (distancia) => Math.ceil(distancia / 35);
const calcClevis = () => {};
const calcPasantes = () => {};
const calcPreformados = () => {};
const calcCinta_bandi = () => {};
const calcHebillas = () => {};

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
/* constante reporte */
const reporte = {
  titulo: "",
  fecha: "",
  ruta: "",
  plan: "",
  distancia: 0,
  metrajeCable: {
    inicio: 0,
    final: 0,
  },
  postesUsados: calcPostes(this.distancia),
  postesInstalados: {
    cantidad: 0,
    cordenadasPostes: {},
  },
  ferreteria: {
    opgw: 0,
    clevis: calcClevis(this.postesUsados, this.postesInstalados),
    pasantes: calcPasantes(this.postesUsados, this.postesInstalados),
    preformados: calcPreformados(this.postesUsados, this.postesInstalados),
    cinta_bandi: calcCinta_bandi(this.postesUsados, this.postesInstalados),
    hebillas: calcHebillas(this.postesUsados, this.postesInstalados),
    mufa: {
      cantidad: 0,
      cordenadasMufas: {},
    },
    retenidasInstaladas: 0,
  },
};
/* eventos */
btn1.addEventListener("click", nextPag);
btn2.addEventListener("click", nextPag);
btn_back.addEventListener("click", backPag);
btn_edit.addEventListener("click", backPag);
btn_save.addEventListener("click", copiarPortapapeles);
/* funciones de cantidad de ferreteria */
const acciones = {
  agregar: (n) => {
    n++;
    return n;
  },
  eliminar: (n) => {
    n >= 1 ? n-- : (n = 0);
    return n;
  },
};
const cantidad_ferreteria = {
  "item-crucetas": (accion) => {
    const n = reporte.ferreteria.mufa.cantidad;
    reporte.ferreteria.mufa.cantidad = acciones[accion](n);
    return acciones[accion](n);
  },
  "item-postes_instalados": (accion) => {
    const n = reporte.postesInstalados.cantidad;
    reporte.postesInstalados.cantidad = acciones[accion](n);
    return acciones[accion](n);
  },
  "item-opgw": (accion) => {
    const n = reporte.ferreteria.opgw;
    reporte.ferreteria.opgw = acciones[accion](n);
    return acciones[accion](n);
  },
  "item-retenidas": (accion) => {
    const n = reporte.ferreteria.retenidasInstaladas;
    reporte.ferreteria.retenidasInstaladas = acciones[accion](n);
    return acciones[accion](n);
  },
};
/* aciones de botones items segun su id*/
const acciones_items = {
  "btn-desplegar": (btn) => {
    const header_item_desplegar = btn.parentElement;
    /* toggle para contraer y desplegar items */
    header_item_desplegar.classList.toggle("active");
  },
  "btn-agregar": (btn) => {
    /* constante de botones de accion */
    const header_item_accion = btn.parentElement.querySelector(".acciones");
    /* definiendo cantidad */
    const items_nd = header_item_accion.querySelector("#unidades");
    /* opteniendo id del item */
    const item =
      header_item_accion.parentElement.parentElement.parentElement.id;
    /* ocultando boton agregar */
    btn.classList.add("d-none");
    /* mostrando botones de accion */
    header_item_accion.classList.remove("d-none");
    /* dando la cantidad de items */
    items_nd.innerText = cantidad_ferreteria[item]("agregar");
    if(item == "item-crucetas" || item == "item-postes_instalados"){
        const header_item_desplegar = btn.parentElement;
        /* toggle para contraer y desplegar items */
        header_item_desplegar.classList.add("active");
        header_item_desplegar.parentElement.parentElement.querySelector('#btn-desplegar').classList.remove("d-none");
        console.log('esta vacio')
    }
  },
  "btn-aumentar": (btn) => {
    /* constante de botones de accion */
    const header_item_accion = btn.parentElement;
    const btn_eliminar = header_item_accion.querySelector("#btn-eliminar");
    const btn_disminuir = header_item_accion.querySelector("#btn-disminuir");
    /* definiendo cantidad */
    const items_nd = header_item_accion.querySelector("#unidades");
    /* opteniendo id del item */
    const item =
      header_item_accion.parentElement.parentElement.parentElement.id;
    /* ocultando btn eliminar y mostrando boton disminuir */
    btn_eliminar.classList.add("d-none");
    btn_disminuir.classList.remove("d-none");
    /* dando la cantidad de items */
    items_nd.innerText = cantidad_ferreteria[item]("agregar");
  },
  "btn-disminuir": (btn) => {
    const header_item_accion = btn.parentElement;
    /* definiendo cantidad de items*/
    const items_nd = header_item_accion.querySelector("#unidades");
    /* opteniendo id del item */
    const item =
      header_item_accion.parentElement.parentElement.parentElement.id;
    /* constante de botones */
    const btn_disminuir = header_item_accion.querySelector("#btn-disminuir");
    const btn_eliminar = header_item_accion.querySelector("#btn-eliminar");
    /* condicionales */
    if (parseInt(items_nd.innerText) >= 2) {
      items_nd.innerText = cantidad_ferreteria[item]("eliminar");
      if (parseInt(items_nd.innerText) == 1) {
        /* ocultando btn diminuir y mostrando boton eliminar */
        btn_disminuir.classList.add("d-none");
        btn_eliminar.classList.remove("d-none");
      }
    }
  },
  "btn-eliminar": (btn) => {
    /* constante de botones de accion */
    const header_item_accion = btn.parentElement.parentElement.querySelector(".acciones");
    /* opteniendo id del item */
    const item = header_item_accion.parentElement.parentElement.parentElement.id;
    console.log(header_item_accion,item)
    /* definiendo cantidad de items*/
    const items_nd = btn.parentElement.querySelector("#unidades");
    items_nd.innerText = cantidad_ferreteria[item]("eliminar");
    /* mostrando boton agregar */
    header_item_accion.parentElement.querySelector("#btn-agregar").classList.remove("d-none");
    /* mostrando botones de accion */
    header_item_accion.classList.add("d-none");
    if(item == "item-crucetas" || item == "item-postes_instalados"){
        const header_item_desplegar = btn.parentElement;
        /* toggle para contraer y desplegar items */
        header_item_desplegar.classList.remove("active");
        header_item_desplegar.parentElement.parentElement.querySelector('#btn-desplegar').classList.add("d-none");
        console.log('esta vacio')
    }
  },
};

/* agregando eventos los botones del formulario2 con event delegation */
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
