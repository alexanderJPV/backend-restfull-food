'use strict';

module.exports = (sequealize, Sequealize) => {
    const sucursal = sequealize.define('sucursal', {
        razon_social:{
            type: Sequealize.STRING
        },
        telefono:{
            type: Sequealize.STRING
        },
        descripcion:{
            type: Sequealize.STRING
        },
        tipo:{
            type: Sequealize.ARRAY(Sequealize.STRING)
        },
        //--------------------campos imagen
        imagen: {
            type: Sequealize.STRING(255)
        },
        type: {
            type: Sequealize.STRING(255)
        },
        name: {
            type: Sequealize.STRING(255)
        },
        nit: {
            type: Sequealize.INTEGER
        },
        //---------------------fin campos imagen
        hora_apertura: {
            type: Sequealize.STRING
        },
        hora_cierre: {
            type: Sequealize.STRING
        },
        dias: {
            type: Sequealize.ARRAY(Sequealize.STRING)
        },
        direccion: {
            type: Sequealize.STRING
        },
        latitud: {
            type: Sequealize.DOUBLE
        },
        longitud: {
            type: Sequealize.DOUBLE
        }
    });
    return sucursal;
}