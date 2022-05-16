import {DB_PASSWORD, DB_NAME, DB_USER, DB_PORT, DB_HOST } from '../constants/secrets.js'
import Sequelize from "sequelize";

const sequelize  = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    },
    pool: {
        acquire: 180000, // tempo de timeout
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