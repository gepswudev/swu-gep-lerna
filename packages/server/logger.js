const colors = require('colors');
module.exports.log = (page, msg, type = 'log', important = false) => {

    //Log only info in production mode
    if(!important && process.env.NODE_ENV === 'production') {
        if(type === 'info'){
            //console.info(`%c[${page}] %c${msg}`, 'color: #000; background-color: #00ffff; padding: 5px 5px; border-radius: 3px;', 'color: #000; background-color: #fff; padding: 2px 5px; border-radius: 3px;');
            console.info(`[Logger]: SWU SERVER | ${process.env.NODE_ENV} `.bgWhite.black, `\n- ${page} > ${msg}`.bgBlack)
            return;
        }else{
            console.info(`[Logger]: SWU SERVER | ${process.env.NODE_ENV} `.bgWhite.black, `\n- Server will not show type of ${type} message in production mode.`.bgBlack)
        }
        return;
    }

    //Log everything in development mode
    console.info(`[Logger]: SWU SERVER | ${process.env.NODE_ENV} `.bgWhite.black)
    if(!['log', 'info', 'warn', 'error'].includes(type)) {
        type = 'log';
    }
    if(typeof msg === 'object') {
        msg = JSON.stringify(msg);
    }
    if(typeof msg === 'string') {
        msg = msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    if(typeof page !== 'string') {
        page = 'Unknown';
    }
    if(typeof msg !== 'string') {
        msg = 'Unknown';
    }
    if(typeof console[type] !== 'function') {
        type = 'log';
    }
    if(type === 'error'){
        console.error(`- ${page} > ${msg}`.bgRed)
        return;
    }
    if(type === 'warn'){
        console.warn(`- ${page} > ${msg}`.bgYellow)
        return;
    }
    if(type === 'info'){
        console.info(`- ${page} > ${msg}`.bgCyan)
        return;
    }
    console.log(`- ${page} > ${msg}`.bgGreen)

}
