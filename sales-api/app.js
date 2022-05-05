import express from 'express'
import { connectMongoDb } from './src/config/db/mongoDbConfig.js';
import { createInitialData } from './src/config/db/initialData.js';
import checkToken from './src/config/auth/checkToken.js';
import { connectRabbitMq } from './src/config/rabbitmq/rabbitConfig.js';
import orderRoutes from './src/modules/sales/routes/OrderRoutes.js';
import tracing from './src/config/tracing.js';

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

connectMongoDb();
connectRabbitMq();
createInitialData();

app.use(express.json());
app.use(tracing);
app.use(checkToken);
app.use(orderRoutes);

// teste rabbitMQ
// app.get('/teste', (req,res) => {
//     try {
//         sendNessageToProductStockUpdateQueue([
//             {
//                 productId: 1001,
//                 quantity: 2
//             },
//             {
//                 productId: 1003,
//                 quantity: 1
//             },
//             {
//                 productId: 1000,
//                 quantity: 2
//             },
//         ])
//         return res.status(200).json({status: 200})
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({error: true})
//     }
// })

app.get('/api/status', async (req, res) => {
    return res.status(200).json({
        service: 'Sales-API',
        status: 'up',
        httpStatus: 200
    })
});


app.listen(PORT, () => {
    console.info(`Servidor inicializado na porta: ${PORT}`);
})