const varObjIngresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500.00),
];

const varObjEgresos = [
    new Egreso('Renta departamento', 900.00),
    new Egreso('Ropa', 400.00)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};

let totalIngresos = () => {
    let totalIngreso = 0;

    for (let objIngreso of varObjIngresos) {
        totalIngreso += objIngreso.valor;
    }

    return totalIngreso;
};

let totalEgresos = () => {
    let totalEgreso = 0;

    for (let objEgreso of varObjEgresos) {
        totalEgreso += objEgreso.valor;
    }

    return totalEgreso;
};

let cargarCabecero = () => {
    let varPresupuesto = totalIngresos() - totalEgresos();
    let varPorcentajeEgreso = totalEgresos() / totalIngresos();

    let objHtmlElementoDivPresupuesto = document.getElementById('presupuesto');
    objHtmlElementoDivPresupuesto.innerHTML = formatoMoneda(varPresupuesto);

    let objHtmlElementoDivPorcentaje = document.getElementById('porcentaje');
    objHtmlElementoDivPorcentaje.innerHTML = formatoPorcentaje(varPorcentajeEgreso);

    let objHtmlElementoDivIngreso = document.getElementById('ingresos');
    objHtmlElementoDivIngreso.innerHTML = formatoMoneda(totalIngresos());

    let objHtmlElementoDivEgreso = document.getElementById('egresos');
    objHtmlElementoDivEgreso.innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (prmValor) => {
   return prmValor.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 2});
}

const formatoPorcentaje = (prmValor) => {
    return prmValor.toLocaleString('es-CO', {style: 'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let varIngresosHTML = '';

    for (let objIngreso of varObjIngresos) {
        varIngresosHTML += crearIngresoHTML(objIngreso);
    }

    let objHtmlElementoDivIngreso = document.getElementById('lista-ingresos');
    objHtmlElementoDivIngreso.innerHTML = varIngresosHTML;
}

const crearIngresoHTML = (objIngreso) => {
    let objIngresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${objIngreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(objIngreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${objIngreso.id})"></ion-icon>
                </button>
            </div>
            </div>
    </div>`

    return objIngresoHTML;
}

const eliminarIngreso = (prmId) => {
    let varIndiceEliminar = varObjIngresos.findIndex(objIngreso => objIngreso.id === prmId);

    varObjIngresos.splice(varIndiceEliminar, 1);

    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let varEgresosHTML = '';

    for (let objEgreso of varObjEgresos) {
        varEgresosHTML += crearEgresoHTML(objEgreso);
    }

    let objHtmlElementoDivEgreso = document.getElementById('lista-egresos');
    objHtmlElementoDivEgreso.innerHTML = varEgresosHTML;
}

const crearEgresoHTML = (objEgreso) => {
    let objEgresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${objEgreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(objEgreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(objEgreso.valor / totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${objEgreso.id})"></ion-icon>
                </button>
             </div>
        </div>
    </div>
`
    return objEgresoHTML;
}

const eliminarEgreso = (prmId) => {
    let varIndiceEliminar = varObjEgresos.findIndex(objEgreso => objEgreso.id === prmId);

    varObjEgresos.splice(varIndiceEliminar, 1);

    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    let objHtmlElementoFormulario = document.forms['formulario'];
    let objHtmlElementoInputTipo = objHtmlElementoFormulario['tipo'];
    let objHtmlElementoInputDescripcion = objHtmlElementoFormulario['descripcion'];
    let objHtmlElementoInputValor = objHtmlElementoFormulario['valor'];

    if (objHtmlElementoInputDescripcion.value !== '' && objHtmlElementoInputValor.value != '') {
        if (objHtmlElementoInputTipo.value === 'ingreso') {
            varObjIngresos.push( new Ingreso(objHtmlElementoInputDescripcion.value, Number(objHtmlElementoInputValor.value) ));
            cargarCabecero();
            cargarIngresos();
        }
        else if (objHtmlElementoInputTipo.value === 'egreso') {
            varObjEgresos.push( new Egreso(objHtmlElementoInputDescripcion.value, Number(objHtmlElementoInputValor.value) ))
            cargarCabecero();
            cargarEgresos();
        }
    }
}