<script>
// @ts-nocheck

  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Hero from "./pages/Home/Home.svelte";
  import History from "./pages/History/History01.svelte";

  import AdminMain from "./pages/Admin/Main.svelte";
  import AdminUsers from "./pages/Admin/User.svelte";
  import AdminActivities from "./pages/Admin/Activities/all.svelte";
  import AdminActivitiesCreate from "./pages/Admin/Activities/create.svelte";
  import AdminActivitiesUpdate from "./pages/Admin/Activities/update.svelte";
  import AdminCorousels from "./pages/Admin/Corousels.svelte";
  import FileManagement from "./pages/Admin/FileManagement.svelte";


  import { Route, Router } from "svelte-routing";
  import log from "./lib/log";
  import { checkConnection } from "./lib/API/checkConnection";
  import Swal from "sweetalert2";
  import Login from "./pages/User/UserTest.svelte";
  import Test from "./pages/test.svelte";
  import CookiesPage from "./components/CookiesPage.svelte";
  import Cookies from "./components/Cookies.svelte";

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
  <main class="mx-auto pt-24 w-screen h-full scroll-smooth">
    <Route path="/" component={Hero} />
    <Route path="/user" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/admin" component={AdminMain} />
    <Route path="/viewusers" component={AdminUsers} />
    <Route path="/viewcorousels" component={AdminCorousels} />
    <Route path="/viewactivities" component={AdminActivities} />
    <Route path="/admin/activities/create" component={AdminActivitiesCreate}/> 
    <Route path="/admin/activities/update/:id" let:params>
      <AdminActivitiesUpdate {...params} />
    </Route>
    <Route path="/files" component={FileManagement} />
    <Route path="/test" component={Test} />

    <Route path="/history" component={History} />

    <Route path="/cookies" component={CookiesPage} />
    <Route path="*" component={Hero} />
    <Cookies />
  </main>
  <Footer />
</Router>
