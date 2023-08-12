import Swal from "sweetalert2";
import { post } from "./methods";
import { login } from "../../store/user";
export async function _login() {
  //Swal fire login popup
  const { value: formValues } = await Swal.fire({
    title: "Login",
    html:
      '<p>Please enter username and password.</p>' +
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
      return post("users/login", {
        username: document.getElementById("swal-input1").value,
        password: document.getElementById("swal-input2").value,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          Swal.showValidationMessage(`Request failed: ${err}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed) {
      if (result.value.status == "success") {
        login({
          username: result.value.data.username,
          token: result.value.data.token,
          role: result.value.data.role,
          loginAt: new Date().toLocaleString(),
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: result.value.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  });
}
