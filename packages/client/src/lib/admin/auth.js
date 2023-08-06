import { user, login } from "../../store/user";
import { get } from "../API/methods";
import log  from "../log";

export default async function adminAuth() {
  try {
    let token = localStorage.getItem("token");
    if (token) {
      log("TOKEN", token);
      get("users/auth", { Authorization: `Bearer ${token}` })
        .then((res) => {
          if (res.status !== "error") {
            login({
              username: res.data.username,
              token: token,
              role: res.data.role,
              loginAt: new Date().toLocaleString(),
            });
            log("AUTH", `User logged in as ${res.data.username}`);
            if(res.data.role === 'admin'){
                return true;
            }
            return false;
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            log("AUTH", `User not logged in`);
            return false;
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          log("AUTH", `User not logged in : ${err.message}`);
          return false;
        });
    }
  } catch (error) {}
}
