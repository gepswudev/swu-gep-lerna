<script>
// @ts-nocheck

  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Hero from "./pages/Home/Home.svelte";
  import Home2 from "./pages/Home/Home2.svelte";

  import { Route, Router } from "svelte-routing";
  import log from "./lib/log";
  import { checkConnection } from "./lib/API/checkConnection";
  import Swal from "sweetalert2";
  import Login from "./pages/User/UserTest.svelte";

  const defaultLang = "th";
  const lang = localStorage.getItem("lang") || defaultLang;
  localStorage.setItem("lang", lang);

  let basepath = "/";
  let currentPath = window.location.pathname;
  let err = "";

  //server connection checker
  checkConnection()
    .then((connected) => {
      if (connected) {
        //do noting
      } else {
        let timerInterval;
        Swal.fire({
          title: "Can't connect to server",
          icon: "error",
          html: "Try to connect again in <b></b> second.",
          timer: 10000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft() / 1000;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
            
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          window.location.reload();
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    })
    .catch((e) => {
      err = e.message || "Server Error";
    });


  $: log("App", `Go to ${currentPath}`);
</script>

<Router {basepath}>
  <Navbar active={currentPath} />
  <main class="pั-28 w-screen h-full">
    <Route path="/" component={Hero} />
    <Route path="/user" component={Login} />
  
    <Route path="*" component={Hero} />
  </main>
  <Footer />
</Router>
