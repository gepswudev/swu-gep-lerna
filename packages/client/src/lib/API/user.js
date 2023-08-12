import Swal from "sweetalert2";
import { post } from "./methods";
import { login } from "../../store/user";
export async function _login() {
  //Swal fire login popup
  const { value: formValues } = await Swal.fire({
    title: "Login",
    html:
      '<input type="text" id="swal-input1" class="swal2-input" placeholder="Username">' +
      '<input type="password" id="swal-input2" class="swal2-input" placeholder="Password">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Login",
    confirmButtonColor: "#3085d6",
    cancelButtonText: "Cancel",
    cancelButtonColor: "#d33",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      post("users/login", {
        username: document.getElementById("swal-input1").value,
        password: document.getElementById("swal-input2").value,
      }).then((res) => {
        console.log(res);
        if (res.status == "success") {
          login({
            username: res.data.username,
            token: res.data.token,
            role: res.data.role,
            loginAt: new Date().toLocaleString(),
          });
        } else {
          Swal.fire({
            title: "Login Failed",
            text: res.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
    },
  });
}
