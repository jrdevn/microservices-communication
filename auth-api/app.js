import * as db from './src/config/db/initialData.js';

import userRoutes from './src/modules/user/routes/UserRoute.js'
import express from "express";
import tracing from './src/config/tracing.js';


const app = express();
// config de porta
const env = process.env;
const PORT = env.PORT || 8080; 

db.createInitialData(); 

app.use(tracing);
app.use(express.json());
app.use(userRoutes);

// endpoint teste
// app.get('/api/status', (req, res) => {
//     return res.status(200).json({
//         service: 'Auth-API',
//         status: 'up',
//         httpStatus: 200
//     })
// })

// escutar a aplicação
app.listen(PORT, () => {
    console.info(`Servidor rodando na porta: ${PORT}`);
});