module.exports.log = (page, message, type='log') => {
    if(typeof console[type] != 'function'){
        type = 'log'
    }
    if(typeof message == 'object'){
        message = JSON.stringify(message)
    }
    if(type == 'log'){
        console.log(`[%c${page}]: %c${message}`, 'color: #00ff00', 'color: #000000')
    }else if(type == 'error'){
        console.error(`[%c${page}]: %c${message}`, 'color: #ff0000', 'color: #000000')
    }else if(type == 'warn'){
        console.warn(`[%c${page}]: %c${message}`, 'color: #ffff00', 'color: #000000')
    }else{
        console.log(`[%c${page}]: %c${message}`, 'color: #00ff00', 'color: #000000')
    }
}