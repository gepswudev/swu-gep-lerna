import log from "./log";
import swa from "./popalert";

export default function env (env) {
    if(env == 'dev') {
        swa({
            title: 'Under Development',
            text: 'This website is under development.',
            icon: 'info',
            confirmButtonText: 'OK'
        }),
        localStorage.setItem('env', 'dev');
        log("MODE", 'Development Mode','warn');
    }else{
        log("MODE", "Production Mode", 'log', true);
        localStorage.setItem('env', 'prod');
    }
}
env(localStorage.getItem('env') || 'dev');