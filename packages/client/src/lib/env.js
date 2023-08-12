import log from "./log";
import swa from "./popalert";
import { get } from "./API/methods";
import Swal from "sweetalert2";

export default function env(env) {
  if (env == "dev") {
    swa(
      {
        title: "Under Development",
        text: "This website is under development.",
        icon: "info",
        confirmButtonText: "OK",
        showLoaderOnConfirm: true,
      },
      () => {
        //display loading while checking server connection
        Swal.fire({
            title: "Connecting to server",
            text: "Please wait while we are connecting to server.",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            showLoaderOnConfirm: true,
            timer: 50000,
            timerProgressBar: true, 
        });
        //check server connection
        get("health")
          .then((res) => {
            console.log(res)
            if (res.status == "OK") {
              swa({
                title: "Server Connected",
                text: "Server is connected and running.",
                icon: "success",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
              });
            } else {
              swa({
                title: "Cannot Connect to Server",
                text: "Server is not connected.",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((err) => {
            swa({
              title: "Cannot Connect to Server",
              text: "Server is not connected.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    );
    localStorage.setItem("env", "dev");
    log("MODE", "Development Mode", "warn");
  } else {
    log("MODE", "Production Mode", "log", true);
    localStorage.setItem("env", "prod");
  }
}
env(localStorage.getItem("env") || "dev");
