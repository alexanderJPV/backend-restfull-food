'use strict';

module.exports = (sequealize, Sequealize) => {
    const sucursal = sequealize.define('sucursal', {
        latitud: {
            type: Sequealize.DOUBLE
        },
        longitud: {
            type: Sequealize.DOUBLE
        },
        direccion: {
            type: Sequealize.STRING
        }
    });
    return sucursal;
}