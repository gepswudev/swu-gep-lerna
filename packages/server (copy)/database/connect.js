const mongoose = require('mongoose');
const { log } = require('../logger');

const connectDB = async () => {
    try {
        log('MongoDB', `Connecting to MongoDB...`, 'info');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        mongoose.Collection
        log('MongoDB', `MongoDB Connected: ${conn.connection.host}`, 'log');
        return conn;
    } catch (err) {
        log('MongoDB', `MongoDB Connection Failed: ${err}`, 'error');
        process.exit(1);
    }
}

module.exports =  connectDB;