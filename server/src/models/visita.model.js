'use strict';

module.exports = (sequealize, Sequealize) => {
    const visita = sequealize.define('visita', {
        fecha_visita: {
            type: Sequealize.DATEONLY()
        }
    });
    return visita;
}