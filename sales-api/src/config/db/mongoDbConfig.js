import mongoose from "mongoose";
import {MONGO_DB_URL} from '../constants/secrets.js';

export function connectMongoDb() {
    mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
    });

    mongoose.connection.on('connected', function() {
        console.info('connect successfull!');
    });
    mongoose.connection.on('error', function() {
        console.error('connection error!');
    });
}
