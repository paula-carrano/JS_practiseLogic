//1)  renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
const renderPorMes = () => {
    let month = "";
    let meses = [
        { mesNombre: "Enero", mes: 0, total: 0 },
        { mesNombre: "Febrero", mes: 1, total: 0 },
        { mesNombre: "Marzo", mes: 2, total: 0 },
        { mesNombre: "Abril", mes: 3, total: 0 },
        { mesNombre: "Mayo", mes: 4, total: 0 },
        { mesNombre: "Junio", mes: 5, total: 0 },
        { mesNombre: "Julio", mes: 6, total: 0 },
        { mesNombre: "Agosto", mes: 7, total: 0 },
        { mesNombre: "Septiembre", mes: 8, total: 0 },
        { mesNombre: "Octubre", mes: 9, total: 0 },
        { mesNombre: "Noviembre", mes: 10, total: 0 },
        { mesNombre: "Diciembre", mes: 11, total: 0 },
    ]

    for (mes of meses) {
        mes.total = getTotalPorMes(mes.mes);

        month += ` Total de ${mes.mesNombre}: $ ${mes.total} <br>`
    }

    document.getElementById('rendermes').innerHTML = `<u>Ventas por mes:</u><br> ${month}`;
    return month
}

const getTotalPorMes = (mes) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (venta.fecha.getMonth() == mes) {
            total += precioMaquina(venta.componentes);
        }
    }
    return total
}

//renderPorMes();

//2) renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {
    const { ventas, sucursal } = local;
    let sucursales = [];

    for (suc of sucursal) {
        let totalVentas = 0;
        let branch = {};
        let ventaSucursal = ventas.filter(v => v.sucursal == suc);

        for (sell of ventaSucursal) {
            totalVentas += precioMaquina(sell.componentes);
        }

        branch.nombre = suc;
        branch.total = totalVentas;
        sucursales.push(branch)
    }

    let sucursales2 = sucursales.map(function (o) {
        return `Total de ${o.nombre}: $ ${o.total} <br>`
    })

    document.getElementById('rendersucursal').innerHTML = `<u>Ventas por mes sucursal:</u><br> ${sucursales2}`

    return sucursales2
}

//renderPorSucursal();
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265t

//3) render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const vendedoraConMasIngresos = () => {
    let array = masVentas("nombreVendedora", precioMaquina(venta.componentes));
    return getMax(array);
}

const masVentas = (propiedad, f) => {
    const { ventas } = local;
    let arrayAcumulador = [];

    for (venta of ventas) {
        let ob = {};

        ob.nombre = venta[propiedad];
        ob.total = f;

        if (!arrayAcumulador.some(o => o.nombre == ob.nombre)) {
            arrayAcumulador.push(ob);
        } else {
            let valorHallado = arrayAcumulador.find(o => o.nombre == ob.nombre);
            valorHallado.total += ob.total;
        }
    }
    return arrayAcumulador;
}

const render = () => {

    document.getElementById('rendertotal').innerHTML = (
        `<ul class="list-group">
            <h3>Reporte</h3>
            <li class="list-group-item"><u>Ventas por mes:</u><br>  ${renderPorMes()}</li>
            <li class="list-group-item"><u>Ventas por sucursal:</u><br> ${renderPorSucursal()}</li>
            <li class="list-group-item"><u>Componente más vendido:</u> ${componenteMasVendido()}</li>
            <li class="list-group-item"><u>Vendedora con más ingresos:</u> ${vendedoraConMasIngresos()}</li>
        </ul>`);
}
//render();