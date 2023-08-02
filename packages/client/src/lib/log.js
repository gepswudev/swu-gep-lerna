import env from "./env";

export default function log (page, msg, type = 'log', important = false) {
    let status = localStorage.getItem('env') || 'prod';
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
        console.error(`%c[${page}] %c${msg}`, 'color: #fff; background-color: #ff0000; padding: 5px 5px; border-radius: 3px;', 'color: #000; background-color: #fff; padding: 2px 5px; border-radius: 3px;');
        return;
    }
    if(status !== 'dev' && !important) {
        return;
    }
    if(type === 'warn'){
        console.warn(`%c[${page}] %c${msg}`, 'color: #000; background-color: #ffff00; padding: 5px 5px; border-radius: 3px;', 'color: #000; background-color: #fff; padding: 2px 5px; border-radius: 3px;');
        return;
    }
    console[type](`%c[${page}] %c${msg}`, 'color: #000; background-color: #00ff00; padding: 2px 5px; border-radius: 3px;', 'color: #000; background-color: #fff; padding: 2px 5px; border-radius: 3px;');
}