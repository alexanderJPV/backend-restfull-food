'user strict'

module.exports = (sequealize, DataTypes) => {
    const usuario_scursal = sequealize.define('usuario_sucursal', {
        userId: {
            type: DataTypes.INTEGER
            // references: 'usuario',
            // referencesKey: 'id',
            // allowNull: false
        }
        // sucursalId: {
        //     type: DataTypes.INTEGER,
        //     references: 'sucursal',
        //     referencesKey: 'id',
        //     allowNull: false
        // },
    });
    return usuario_scursal;
}