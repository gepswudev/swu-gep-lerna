import { get, writable } from "svelte/store";
import Swal from "sweetalert2";
import log from "../lib/log";

export const user = writable(null);

export const login = (data) => {
    Swal.fire({
        title: "Login Success",
        text: `Welcome back, ${data.username}`,
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
    }).then(() => {
        user.set(data);
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);
        log("LOGIN", `User ${data.username} logged in`, "info");
    });
};
export const logout = () => {
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
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            user.set(null);
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            log("LOGOUT", `User ${user.username} logged out`, "info");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", `You are still logged in as ${user.username}`, "error");
        }
    });
};
