'use strict';

module.exports = (sequealize, Sequealize) => {
    const plato_especial = sequealize.define('plato_especial', {
        nombre:{
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
        //---------------------fin campos imagen
        descripcion:{
            type: Sequealize.STRING
        }
    });
    return plato_especial;
}