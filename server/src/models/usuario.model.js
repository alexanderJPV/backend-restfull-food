'user strict'

module.exports = (sequealize, Sequealize) => {
    const usuario = sequealize.define('usuario', {
        nombres: {
            type: Sequealize.STRING
        },
        apellidos: {
            type: Sequealize.STRING
        },
        userName: {
            type: Sequealize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 100],
                    msg: 'Porfavor el userName tinene que tener mas de 4 caracteres y menos de 100'
                }
            }
        },
        password: {
            type: Sequealize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 100],
                    msg: 'Porfavor el password tinene que tener >= a 4 caracteres y <= que 100 caracteres'
                }
            }
        },
        imagen: {
            type: Sequealize.STRING
        },
        rol: {
            type: Sequealize.ARRAY(Sequealize.STRING)
        },
        genero: {
            type: Sequealize.ENUM('HOMBRE', 'MUJER')
        },
        estado: {
            type: Sequealize.BOOLEAN
        },
        activate_key: {
            type: Sequealize.STRING
        },
        reset_key: {
            type: Sequealize.STRING
        },
    });
    return usuario;
}