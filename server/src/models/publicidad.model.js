'user strict';

module.exports = (sequealize, Sequealize) => {
    const publicidad = sequealize.define('publicidad', {
        titulo: {
            type: Sequealize.STRING
        },
        fechaIni: {
            type: Sequealize.DATE
        },
        fechaFin: {
            type: Sequealize.DATE
        },
        descripcion: {
            type: Sequealize.STRING(2000)
        },
        precio: {
            type: Sequealize.DOUBLE
        }
    });
    return publicidad;
}