import log from "./log";
import swa from "./popalert";
import config from "../config.json";

export default function env() {
  if (config.mode == "dev" || config.mode == "development") {
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
