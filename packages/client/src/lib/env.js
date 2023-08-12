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
      });
    localStorage.setItem("env", "dev");
    log("MODE", "Development Mode", "warn");
  } else {
    log("MODE", "Production Mode", "log", true);
    localStorage.setItem("env", "prod");
  }
}
env(localStorage.getItem("env") || "dev");
