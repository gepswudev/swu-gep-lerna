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
    //console.info(`[Logger]: SWU SERVER | ${process.env.NODE_ENV} `.bgWhite.black)
    const mode = (process.env.NODE_ENV ?? 'undefined').charAt(0).toUpperCase() + (process.env.NODE_ENV ?? 'undefined').slice(1);
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
        console.error(`[${mode}] - ${page} > ${msg}`.bgRed)
        return;
    }
    if(type === 'warn'){
        console.warn(`[${mode}] - ${page} > ${msg}`.bgYellow)
        return;
    }
    if(type === 'info'){
        console.info(`[${mode}] - ${page} > ${msg}`.bgCyan)
        return;
    }
    console.log(`[${mode}] - ${page} > ${msg}`.bgGreen)

}
