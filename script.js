// PUNTO 1 

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

const cantidadVentasComponente = (componente) => {
    const { ventas } = local;
    let cantidad = [];

    for (venta of ventas) {
        for (component of venta.componentes) {
            if (component.includes(componente)) {
                cantidad.push(component)
            }
        }
    }
    return cantidad.length;
}
//console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

const vendedoraDelMes = (mes, anio) => {
    let ventas = local.ventas;
    let vendedoras = [];
    let montoMax = 0;


    for (venta of ventas) {
        if ((venta.fecha.getMonth() + 1) == mes && (venta.fecha.getFullYear()) == anio) {
            let totalVentas = precioMaquina(venta.componentes);
            let vendedoraName = venta.nombreVendedora;
            let vendedora = {}

            vendedora.total = totalVentas;
            vendedora.vendedoraNombre = vendedoraName;


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

const addSucursalVendedora = () => {
    const { ventas } = local;

    for (venta of ventas) {
        venta.sucursal = 'Centro';
    }
    return (ventas)
}
addSucursalVendedora();

const addSucursal = () => {
    local.sucursal = ['Centro', 'Caballito'];
    return local
}
addSucursal();

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
        if (branchHall.total > montoMax) {
            montoMax = branch.total;
            sucursal = branch.nombre;
        }
    }
    return sucursal

}

//console.log(sucursalDelMes(1, 2019)); // "Centro"

/*-------------------------------------------------------------------------------------------------*/

// PUNTO 3