'use strict';

module.exports = (sequealize, Sequealize) => {
    const cocinero = sequealize.define('cocinero', {
        nombre: {
            type: Sequealize.STRING
        },
        apellidos: {
            type: Sequealize.STRING
        },
        nacionalidad: {
            type: Sequealize.STRING
        },
        especialidad: {
            type: Sequealize.STRING
        },
        imagen: {
            type: Sequealize.STRING
        }
    });
    return cocinero;
}