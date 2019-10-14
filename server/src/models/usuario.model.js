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
        email: {
            type: Sequealize.STRING,
            unique: {
                args: true,
                msg: 'Email-id required'
            },
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Emails-id required'
                },
                isEmail: {
                    args: true,
                    msg: 'Valid email-id required'
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
            type: Sequealize.STRING(255)
        },
        type: {
            type: Sequealize.STRING(255)
        },
        name: {
            type: Sequealize.STRING(255)
        },
        rol: {
            type: Sequealize.ARRAY(Sequealize.STRING)
        },
        genero: {
            type: Sequealize.ENUM('MASCULINO', 'FEMENINO')
        },
        estado: {
            type: Sequealize.BOOLEAN
        },
        fechaNacimiento: {
            type: Sequealize.DATE
        },
        telefono: {
            type: Sequealize.STRING
        },
        id_colaborador: {
            type: Sequealize.INTEGER
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