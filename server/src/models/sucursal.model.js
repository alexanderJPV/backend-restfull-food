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
        //campos imagen
        imagen: {
            type: Sequealize.STRING(255)
        },
        type: {
            type: Sequealize.STRING(255)
        },
        name: {
            type: Sequealize.STRING(255)
        },
        //fin campos imagen
        hora_inicio: {
            type: Sequealize.STRING
        },
        hora_fin: {
            type: Sequealize.STRING
        },
        dias: {
            type: Sequealize.ARRAY(Sequealize.STRING)
        },
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