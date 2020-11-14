// PUNTO 1 

const precioMaquina = (componentes) => {
    const { precios } = precios;
    let total = 0;

    for (componente of componentes) {
        let encontrar = precios.find(component => component.componente == componente);
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
    const { ventas } = local;
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

                if (vendedoraHallada.total > montoMax) {
                    montoMax = vendedoraHallada.total;
                    nameVendedora = vendedora.vendedoraNombre;
                    return nameVendedora
                }
            }
        };
    }
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
        if (nombre == venta.nombreVendedora) {
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

                if (componenteEncontrado.cantidad > cantidadMax) {
                    cantidadMax = componenteEncontrado.cantidad;
                    nameComponent = component.nombre;
                    return nameComponent
                }
            }
        }
    }
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

// PUNTO 2

const addSucursalVendedora = () => {
    const { ventas } = local;

    for (venta of ventas) {
        venta.sucursal = 'Centro';
    }
    return (ventas)
}
//console.log(addSucursalVendedora());

const addSucursal = () => {
    local.sucursal = ['Centro', 'Caballito']
    return local
}
//console.log(addSucursal());

const addVentas = () => {
    const { ventas } = local;


}