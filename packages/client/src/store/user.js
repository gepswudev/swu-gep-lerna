import { get, writable } from "svelte/store";
import Swal from "sweetalert2";
import log from "../lib/log";
import { navigate } from "svelte-routing";

export const user = writable(null);

export const login = (data) => {
    Swal.fire({
        title: "Authurized!",
        text: `Welcome back, ${data.username}`,
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
    }).then(() => {
        user.set(data);
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);
        log("LOGIN", `User ${data.username} logged in`, "info");
    });
};

export const logout = (redirect = "/") => {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log me out!",
        confirmButtonColor: "#d33",
        cancelButtonText: "No, cancel!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Logged Out",
                text: `You are logged out.`,
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            user.set(null);
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            navigate(redirect);
            log("LOGOUT", `User ${user.username} logged out`, "info");
        };
    });
};