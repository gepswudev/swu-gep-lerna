import config from "../config.json";

export default function lang () {
    //get user lang from localstorage or default to 'th'
    const getlang = localStorage.getItem('lang') || config.default_lang;
    return getlang;
}
