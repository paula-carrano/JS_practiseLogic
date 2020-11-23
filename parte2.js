//1) En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).
const addSucursalVendedora = () => {
    const { ventas } = local;

    for (venta of ventas) {
        venta.sucursal = 'Centro';
    }
    return ventas;
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
const branchSells = () => {
    let sucursal = 'centro';
    ventasSucursal(sucursal);
}


const ventasSucursal = (sucursal) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (sucursal.toLowerCase() == venta.sucursal.toLowerCase()) {
            total += precioMaquina(venta.componentes)
        }
    }
    document.getElementById('sucursales').innerHTML = `total de ventas: $ ${total}`
    return total
}
//console.log(ventasSucursal("centro"))

//5)Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta
const ventaPorParametro = (propiedad, valor) => {
    const { ventas } = local;
    let total = 0;

    for (venta of ventas) {
        if (valor.toLowerCase() == venta[propiedad].toLowerCase()) {
            total += precioMaquina(venta.componentes)
        }
    }
    return total
}
//console.log(ventaPorParametro("sucursal", "centro"));

//6) Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const branchOfMonth = () => {
    let mes = 1;
    let anio = 2019;
    sucursalDelMes(mes, anio);
}

const sucursalDelMes = (mes, anio) => {
    let array = ventasPorMes('sucursal', mes, anio);

    document.getElementById('branchmonth').innerHTML = getMax(array);

    return getMax(array);
}

//console.log(sucursalDelMes(1, 2019)); // "Centro"