export default function lang () {
    //get user lang from localstorage or default to 'th'
    const getlang = localStorage.getItem('lang') || 'th';
    return getlang;
}
