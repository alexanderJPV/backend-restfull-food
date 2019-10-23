'use strict';

module.exports = (sequealize, Sequealize) => {
    const califica = sequealize.define('califica', {
        calificacion: {
            type: Sequealize.DOUBLE
        }
    });
    return califica;
}