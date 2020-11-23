//1) precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const priceMachine = () => {
    let componentes = ["Monitor GPRS 3000", "Motherboard ASUS 1500"];
    precioMaquina(componentes);
}

const precioMaquina = (componentes) => {
    let precio = local.precios
    let total = 0;

    for (componente of componentes) {
        let encontrar = precio.find(component => component.componente == componente);
        total += encontrar.precio
    }

    document.getElementById('precioMaquina').innerHTML = `Precio: $ ${total}`;
    return total
}
//precioMaquina(); // 320 ($200 del monitor + $120 del motherboard)

//2)cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const quantySellsComponent = () => {
    let componente = "Monitor ASC 543";
    cantidadVentasComponente(componente);
}

const cantidadVentasComponente = (componente) => {
    const { ventas } = local;
    let cantidad = 0;

    for (venta of ventas) {
        if (venta.componentes.includes(componente)) {
            cantidad += 1
        }
    }
    document.getElementById('componentesVentas').innerHTML = `Cantidad: ${cantidad}`;
    return cantidad
}

//console.log(cantidadVentasComponente("Monitor ASC 543")); // 5

//3)vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sellerOfMonth = () => {
    let mes = 1;
    let anio = 2019;
    vendedoraDelMes(mes, anio);
}

const vendedoraDelMes = (mes, anio) => {

    let array = ventasPorMes('nombreVendedora', mes, anio);

    document.getElementById('sellermes').innerHTML = getMax(array);
}

const ventasPorMes = (propiedad, mes, anio) => {
    const { ventas } = local;
    let arrayAcumulador = [];

    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) == mes && (venta.fecha.getFullYear()) == anio) {
            let ob = {}

            ob.total = precioMaquina(venta.componentes);
            ob.nombre = venta[propiedad];

            if (!arrayAcumulador.some(o => o.nombre == venta[propiedad])) {
                arrayAcumulador.push(ob);
            } else {
                let valorHallado = arrayAcumulador.find(o => o.nombre == ob.nombre);
                valorHallado.total += ob.total;
            }
        };
    }
    return arrayAcumulador
}

const getMax = (array) => {
    let montoMax = 0;
    let nombre = "";

    for (ob of array) {
        if (ob.total > montoMax) {
            montoMax = ob.total;
            nombre = ob.nombre;
        }
    }
    return nombre
}
//console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

//4)ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sellesOfMonth = () => {
    let mes = 1;
    let anio = 2019;
    ventasMes(mes,anio)
}

const ventasMes = (mes, anio) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) == mes && (venta.fecha.getFullYear()) == anio) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas;
        }
    }
    document.getElementById('sellesmes').innerHTML = `Cantidad de ventas por mes: $ ${total}`;

    return total;
}
//console.log(ventasMes(1, 2019)); // 1250

//5) ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const sellsofSellers = () => {
    let nombre = "Grace";
    ventasVendedora(nombre);
}

const ventasVendedora = (nombre) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (nombre.toLowerCase() == venta.nombreVendedora.toLowerCase()) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas
        }
    }
    document.getElementById('vendedoras').innerHTML = `Cantidad de ventas por vendedora: $ ${total}`;

    return total
}
//console.log(ventasVendedora("Grace")); // 900

//6) componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
    const { ventas } = local;
    let componentesVendidos = [];

    for (venta of ventas) {
        for (componente of venta.componentes) {
            let component = {};

            component.nombre = componente;
            component.total = cantidadVentasComponente(componente);

            if (!componentesVendidos.some(c => c.nombre == component.nombre)) {
                componentesVendidos.push(component);
            } else {
                let componenteEncontrado = componentesVendidos.find(c => c.nombre == component.nombre);
                componenteEncontrado.total += component.total;
            }
        }
    }

    document.getElementById('compon').innerHTML = getMax(componentesVendidos);

    return getMax(componentesVendidos);

}
//console.log(componenteMasVendido()); // Monitor GPRS 3000

//7) huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sold = () => {
    let mes = 1;
    let anio = 2019;
    huboVentas(mes, anio)
}

const huboVentas = (mes, anio) => {
    const { ventas } = local;
    let boolean = false;

    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) != mes && (venta.fecha.getFullYear()) == anio && venta.componentes.length != 0) {
            continue
        } else {
            boolean = true;
        }
    }

    document.getElementById('sold').innerHTML = boolean;
    return boolean
}
//console.log(huboVentas(3, 2019)); // false


