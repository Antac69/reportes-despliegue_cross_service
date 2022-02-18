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
/* calculos de reporte */
const calcPostes = (distancia) => Math.ceil(distancia / 35.6);
const calcClevis = (pasantes, preformados) =>
  Math.ceil(pasantes + preformados * 2);
const calcPasantes = (postesUsa, postesInsta = 0) =>
  Math.ceil((postesUsa + postesInsta) * 0.4);
const calcPreformados = (postesUsa, postesInsta = 0) =>
  Math.ceil((postesUsa + postesInsta) * 0.6 * 2);
const calcCinta_bandi = (postesUsa, postesInsta = 0) => {
  const options = [1, 0.97, 1.1];
  var rand = Math.floor(Math.random() * options.length);
  var grosor = Math.ceil(options[rand]);
  return (postesUsa + postesInsta) * grosor;
};
const calcHebillas = (postesUsa, postesInsta = 0) =>
  (postesUsa + postesInsta) * 2;

/* funciones de movimiento de formulario */
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
  postesUsados: 0,
  postesInstalados: {
    cantidad: 0,
    cordenadasPostes: {},
  },
  ferreteria: {
    opgw: 0,
    clevis: 0,
    pasantes: 0,
    preformados: 0,
    cinta_bandi: 0,
    hebillas: 0,
    mufa: {
      cantidad: 0,
      cordenadasMufas: {},
    },
    retenidasInstaladas: 0,
  },
};
/* eventos */
const formulario = document.getElementById("formulario-1");
btn1.addEventListener("click", () => {
  nextPag();
  reporte.titulo = formulario.querySelector("#titulo").value;
  reporte.fecha = formulario.querySelector("#fecha").value;
  reporte.ruta = formulario.querySelector("#ruta").value;
  reporte.plan = formulario.querySelector("#tipo-plan").value;
  reporte.distancia = formulario.querySelector("#distancia").value;
  reporte.metrajeCable["inicio"] = formulario.querySelector("#inicio").value;
  reporte.metrajeCable["final"] = formulario.querySelector("#final").value;
  reporte.postesUsados = calcPostes(reporte.distancia);
});
btn2.addEventListener("click", async () => {
  nextPag();
  report_area.innerText = "";
  reporte.ferreteria["pasantes"] = calcPasantes(
    reporte.postesUsados,
    reporte.postesInstalados["cantidad"]
  );
  reporte.ferreteria["preformados"] = calcPreformados(
    reporte.postesUsados,
    reporte.postesInstalados["cantidad"]
  );
  reporte.ferreteria["cinta_bandi"] = calcCinta_bandi(
    reporte.postesUsados,
    reporte.postesInstalados["cantidad"]
  );
  reporte.ferreteria["hebillas"] = calcHebillas(
    reporte.postesUsados,
    reporte.postesInstalados["cantidad"]
  );
  reporte.ferreteria["clevis"] = calcClevis(
    reporte.ferreteria["pasantes"],
    reporte.ferreteria["preformados"]
  );

  report_area.value = `${reporte.titulo} ${reporte.fecha}
Ruta de Despliegue: ${reporte.ruta} ${reporte.plan}
Distancia: ${reporte.distancia} m
Inicio: ${reporte.metrajeCable["inicio"]}m ${reporte.metrajeCable["final"]}m
Cantidad de Postes Utilizados: ${
  reporte.postesUsados + reporte.postesInstalados["cantidad"]
}
Cantidad de Postes Instalados: ${reporte.postesInstalados["cantidad"]}
Cantidad de Ferretería Instalada
Opgw: ${reporte.ferreteria["opgw"]}
Clevis: ${reporte.ferreteria["clevis"]}
Pasantes: ${reporte.ferreteria["pasantes"]}
Preformados: ${reporte.ferreteria["preformados"]}
Cinta Bandit: ${reporte.ferreteria["cinta_bandi"]} m
Hebillas: ${reporte.ferreteria["hebillas"]}
Cruceta: ${reporte.ferreteria["mufa"]["cantidad"]}
Cantidad de Retenidas Instaladas: ${
  reporte.ferreteria["retenidasInstaladas"]
}`;
});
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
    if (item == "item-crucetas" || item == "item-postes_instalados") {
      const header_item_desplegar = btn.parentElement;
      /* toggle para contraer y desplegar items */
      header_item_desplegar.classList.add("active");
      header_item_desplegar.parentElement.parentElement
        .querySelector("#btn-desplegar")
        .classList.remove("d-none");
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
    const header_item_accion =
      btn.parentElement.parentElement.querySelector(".acciones");
    /* opteniendo id del item */
    const item =
      header_item_accion.parentElement.parentElement.parentElement.id;
    /* definiendo cantidad de items*/
    const items_nd = btn.parentElement.querySelector("#unidades");
    items_nd.innerText = cantidad_ferreteria[item]("eliminar");
    /* mostrando boton agregar */
    header_item_accion.parentElement
      .querySelector("#btn-agregar")
      .classList.remove("d-none");
    /* mostrando botones de accion */
    header_item_accion.classList.add("d-none");
    if (item == "item-crucetas" || item == "item-postes_instalados") {
      const header_item_desplegar = btn.parentElement;
      /* toggle para contraer y desplegar items */
      header_item_desplegar.classList.remove("active");
      header_item_desplegar.parentElement.parentElement
        .querySelector("#btn-desplegar")
        .classList.add("d-none");
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
