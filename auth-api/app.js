import express from "express";

import * as db from './src/config/db/initialData.js';


const app = express();
// config de porta
const env = process.env;
const PORT = env.PORT || 8080; 

db.createInitialData();


// endpoint
app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: 'Auth-API',
        status: 'up',
        httpStatus: 200
    })
})

// escutar a aplicação
app.listen(PORT, () => {
    console.info(`Servidor rodando na porta: ${PORT}`);
});