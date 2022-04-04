import Sequelize from "sequelize";

const sequelize  = new Sequelize("auth-db","sa","123456", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    }
});

sequelize
.authenticate()
.then(() => {
    console.info('Conexão bem sucedida!')
})
.catch((err) => {
    console.error("Não foi possivel conectar por conta do erro: " + err.message);
});

export default sequelize;