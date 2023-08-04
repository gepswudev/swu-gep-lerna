import { writable } from "svelte/store";

export const user = writable({
    username:"",
    role:"",
    token:"",
    loginAt:"",
});