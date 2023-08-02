const mongoose = require('mongoose');
const { log } = require('../logger');

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        mongoose.Collection
        log('MongoDB', `MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (err) {
        log('MongoDB', `MongoDB Connection Failed: ${err}`, 'error');
        process.exit(1);
    }
}

module.exports =  connectDB;