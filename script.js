// PUNTO 1 

//1) precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.
const precioMaquina = (componentes) => {
    let precio = local.precios
    let total = 0;

    for (componente of componentes) {
        let encontrar = precio.find(component => component.componente == componente);
        total += encontrar.precio
    }
    return total;
}
//console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); // 320 ($200 del monitor + $120 del motherboard)

//2)cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
const cantidadVentasComponente = (componente) => {
    const { ventas } = local;
    let cantidad = 0;

    for (venta of ventas) {
        if (venta.componentes.includes(componente)) {
            cantidad += 1
        }
    }
    return cantidad;
}
//console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

//3)vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const vendedoraDelMes = (mes, anio) => {
    let ventas = local.ventas;
    let vendedoras = [];
    let montoMax = 0;

    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) == mes && (venta.fecha.getFullYear()) == anio) {
            let totalVentas = precioMaquina(venta.componentes);
            let vendedora = {}

            vendedora.total = totalVentas;
            vendedora.vendedoraNombre = venta.nombreVendedora;

            if (!vendedoras.some(v => v.vendedoraNombre == venta.nombreVendedora)) {
                vendedoras.push(vendedora);
            } else {
                let vendedoraHallada = vendedoras.find(v => v.vendedoraNombre == vendedora.vendedoraNombre);
                vendedoraHallada.total += vendedora.total;
            }
        };
    }
    for (seller of vendedoras) {
        if (seller.total > montoMax) {
            montoMax = seller.total;
            nameVendedora = seller.vendedoraNombre;
        }
    }
    return nameVendedora

}
//console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

//4)ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const ventasMes = (mes, anio) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) == mes && (venta.fecha.getFullYear()) == anio) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas;
        }
    }
    return total;
}
//console.log(ventasMes(1, 2019)); // 1250

//5) ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (nombre.toLowerCase() == venta.nombreVendedora.toLowerCase()) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas
        }
    }
    return total
}
//console.log(ventasVendedora("Grace")); // 900

//6) componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente
const componenteMasVendido = () => {
    const { ventas } = local;
    let componentesVendidos = [];
    let cantidadMax = 0;

    for (venta of ventas) {
        for (componente of venta.componentes) {
            let cantComponentesVendidos = cantidadVentasComponente(componente);
            let component = {};

            component.nombre = componente;
            component.cantidad = cantComponentesVendidos;

            if (!componentesVendidos.some(c => c.nombre == component.nombre)) {
                componentesVendidos.push(component);
            } else {
                let componenteEncontrado = componentesVendidos.find(c => c.nombre == component.nombre);
                componenteEncontrado.cantidad += component.cantidad;
            }
        }
    }
    for (componente of componentesVendidos) {
        if (componente.cantidad > cantidadMax) {
            cantidadMax = componente.cantidad;
            nameComponente = componente.nombre;
        }
    }
    return nameComponente
}
//console.log(componenteMasVendido()); // Monitor GPRS 3000

//7) huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
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
    return boolean
}
//console.log(huboVentas(3, 2019)); // false

/*-------------------------------------------------------------------------------------------------*/

// PUNTO 2

//1) En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).
const addSucursalVendedora = () => {
    const { ventas } = local;

    for (venta of ventas) {
        venta.sucursal = 'Centro';
    }
    return (ventas)
}
addSucursalVendedora();

//2) Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']
const addSucursal = () => {
    local.sucursal = ['Centro', 'Caballito'];
    return local
}
addSucursal();

//3) Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal
const addVentas = (fecha, nombreVendedora, componentes, sucursal) => {
    const { ventas } = local;
    ventas.push({ fecha, nombreVendedora, componentes, sucursal })
    return ventas
}
addVentas(new Date(2019, 01, 12), 'Hedy', ["Monitor GPRS 3000", "HDD Toyiva"], 'Centro');
addVentas(new Date(2019, 01, 24), 'Sheryl', ["Motherboard ASUS 1500", "HDD Wezter Dishital"], 'Caballito');
addVentas(new Date(2019, 01, 01), 'Ada', ["Motherboard MZI", "RAM Quinston Fury"], 'Centro');
addVentas(new Date(2019, 01, 11), 'Grace', ["Monitor ASC 543", "RAM Quinston"], 'Caballito');
addVentas(new Date(2019, 01, 15), 'Ada', ["Motherboard ASUS 1200", "RAM Quinston Fury"], 'Centro');
addVentas(new Date(2019, 01, 12), 'Hedy', ["Motherboard ASUS 1500", "HDD Toyiva"], 'Caballito');
addVentas(new Date(2019, 01, 21), 'Grace', ["Motherboard MZI", "RAM Quinston"], 'Centro');
addVentas(new Date(2019, 01, 08), 'Sheryl', ["Monitor ASC 543", "HDD Wezter Dishital"], 'Centro');
addVentas(new Date(2019, 01, 16), 'Sheryl', ["Monitor GPRS 3000", "RAM Quinston Fury"], 'Centro');
addVentas(new Date(2019, 01, 27), 'Hedy', ["Motherboard ASUS 1200", "HDD Toyiva"], 'Caballito');
addVentas(new Date(2019, 01, 22), 'Grace', ["Monitor ASC 543", "HDD Wezter Dishital"], 'Centro');
addVentas(new Date(2019, 01, 05), 'Ada', ["Motherboard ASUS 1500", "RAM Quinston"], 'Centro');
addVentas(new Date(2019, 01, 01), 'Grace', ["Motherboard MZI", "HDD Wezter Dishital"], 'Centro');
addVentas(new Date(2019, 01, 07), 'Sheryl', ["Monitor GPRS 3000", "RAM Quinston"], 'Caballito');
addVentas(new Date(2019, 01, 14), 'Ada', ["Motherboard ASUS 1200", "HDD Toyiva"], 'Centro');

//4) Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
const ventasSucursal = (sucursal) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (sucursal.toLowerCase() == venta.sucursal.toLowerCase()) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas
        }
    }
    return total
}
//console.log(ventasSucursal("centro"))

//5)Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta
const ventaPorParametro = (propiedad, valor) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (valor.toLowerCase() == venta[propiedad].toLowerCase()) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas
        }
    }
    return total
}
//console.log(ventaPorParametro("sucursal", "centro"));

//6) Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const sucursalDelMes = (mes, anio) => {
    const { ventas } = local;
    let sucursales = [];
    let montoMax = 0;

    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) == mes && (venta.fecha.getFullYear()) == anio) {
            let totalVentas = precioMaquina(venta.componentes);
            let branch = {}

            branch.total = totalVentas;
            branch.nombre = venta.sucursal;


            if (!sucursales.some(s => s.sucursal == venta.sucursal)) {
                sucursales.push(branch);
            } else {
                let branchHallada = sucursales.find(s => s.sucursal == venta.sucursal);
                branchHallada.total += branch.total;
            }
        };
    }
    for (branch of sucursales) {
        if (branch.total > montoMax) {
            montoMax = branch.total;
            sucursal = branch.nombre;
        }
    }
    return sucursal
}
//console.log(sucursalDelMes(1, 2019)); // "Centro"

/*-------------------------------------------------------------------------------------------------*/

// PUNTO 3

//1)  renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año
const renderPorMes = () => {
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
    console.log("Ventas por mes:");

    for (mes of meses) {
        mes.total = getTotalPorMes(mes.mes);
        console.log(`Total de ${mes.mesNombre} 2019: ${mes.total}`)
    }

}

const getTotalPorMes = (mes) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (venta.fecha.getMonth() == mes) {
            let totalVentas = precioMaquina(venta.componentes);
            total += totalVentas
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
    console.log(`Ventas por sucursales:`);
    console.table(sucursales)
}

//renderPorSucursal();
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265t

//3) render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó
const render = () => {
    renderPorMes();
    renderPorSucursal();
    console.log(`Producto estrella: ${componenteMasVendido()}`);
    console.log(`Vendedora que más ingresos generó: ${vendedoraConMasIngresos()}`)
}

const vendedoraConMasIngresos = () => {
    const { ventas } = local;
    let vendedoras = [];
    let total = 0;

    for (venta of ventas) {
        let cantComponentesVendidos = precioMaquina(venta.componentes);
        let seller = {};

        seller.nombre = venta.nombreVendedora;
        seller.cantidadVendida = cantComponentesVendidos;

        if (!vendedoras.some(s => s.nombre == seller.nombre)) {
            vendedoras.push(seller);
        } else {
            let vendedoraEncontrada = vendedoras.find(s => s.nombre == seller.nombre);
            vendedoraEncontrada.cantidadVendida += seller.cantidadVendida
        }
    }

    for (vendedora of vendedoras) {
       if(vendedora.cantidadVendida > total){
            total = vendedora.cantidadVendida;
            sellerNombre = vendedora.nombre;
       }
    }
    return sellerNombre;
}
vendedoraConMasIngresos();
render();

    // Reporte
    // Ventas por mes:
    //   Total de enero 2019: 1250
    //   Total de febrero 2019: 4210
    // Ventas por sucursal:
    //   Total de Centro: 4195
    //   Total de Caballito: 1265
    // Producto estrella: Monitor GPRS 3000
    // Vendedora que más ingresos generó: Grace