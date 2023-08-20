<script>
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import Hero from "./pages/Home/Home.svelte";
  import History from "./pages/History/History01.svelte";
  import PersonelPage from "./pages/Personel/Personel.svelte";

  import AdminMain from "./pages/Admin/Main.svelte";
  import AdminUsers from "./pages/Admin/User.svelte";

  import AdminActivities from "./pages/Admin/Activities/all.svelte";
  import AdminActivitiesCreate from "./pages/Admin/Activities/create.svelte";
  import AdminActivitiesUpdate from "./pages/Admin/Activities/update.svelte";

  import AdminCorousels from "./pages/Admin/Corousels/all.svelte";
  import AdminCorouselsCreate from "./pages/Admin/Corousels/create.svelte";
  import AdminCorouselsUpdate from "./pages/Admin/Corousels/update.svelte";

  import AdminPersonnels from "./pages/Admin/Personnels/all.svelte";
  import AdminPersonnelsCreate from "./pages/Admin/Personnels/create.svelte";
  import AdminPersonnelsUpdate from "./pages/Admin/Personnels/update.svelte";

  import FileManagement from "./pages/Admin/FileManagement.svelte";

  import { Route, Router } from "svelte-routing";
  import log from "./lib/log";
  import { checkConnection } from "./lib/API/checkConnection";
  import Swal from "sweetalert2";
  import Login from "./pages/User/UserTest.svelte";
  import Test from "./pages/test.svelte";
  import CookiesPage from "./components/CookiesPage.svelte";
  import Cookies from "./components/Cookies.svelte";
  import Loading from "./components/Loading.svelte";

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
          window.location.reload();
          if (result.dismiss === Swal.DismissReason.timer) {
            //Timer expired and reload page to check connection again
            window.location.reload();
          }
        });
      }
    })
    .catch((e) => {
      err = e.message || "Server Error";
    });

  $: log("App", `Go to ${currentPath}`);

  let isServerAlive = checkConnection();
</script>

{#await isServerAlive}
<!-- Preload while connecting to server -->
  <Loading
    title="Connect to Server"
    desc="It's may take a longtime cause Server is sleepy under development mode"
  />
{:then alive}
  {#if alive}
    <Router {basepath}>
      <Navbar active={currentPath} />
      <main class="mx-auto pt-24 w-screen h-full scroll-smooth">
        <!-- Homepage -->
        <Route path="/" component={Hero} />

        <!-- Login Test pages -->
        <Route path="/user" component={Login} />
        <Route path="/login" component={Login} />

        <!-- Admin pages -->
        <Route path="/admin" component={AdminMain} />
        <Route path="/viewusers" component={AdminUsers} />

        <Route path="/viewcorousels" component={AdminCorousels} />
        <Route
          path="/admin/corousels/create"
          component={AdminCorouselsCreate}
        />
        <Route path="/admin/corousels/update/:id" let:params>
          <AdminCorouselsUpdate {...params} />
        </Route>

        <Route path="/viewactivities" component={AdminActivities} />
        <Route
          path="/admin/activities/create"
          component={AdminActivitiesCreate}
        />
        <Route path="/admin/activities/update/:id" let:params>
          <AdminActivitiesUpdate {...params} />
        </Route>

        <Route path="/personnels" component={AdminPersonnels} />
        <Route
          path="/admin/personnels/create"
          component={AdminPersonnelsCreate}
        />
        <Route path="/admin/personnels/update/:id" let:params>
          <AdminPersonnelsUpdate {...params} />
        </Route>

        <Route path="/files" component={FileManagement} />
        <Route path="/test" component={Test} />

        <!-- About page -->
        <Route path="/about" component={History} />

        <!-- Personel Page -->
        <Route path="/personnel" component={PersonelPage}/>

        <!-- Cookies consent page -->
        <Route path="/cookies" component={CookiesPage} />

        <!-- 404 page = Return to home -->
        <Route path="*" component={Hero} />

        <!-- Cookies component popup -->
        <Cookies />
      </main>

      <!-- Footer -->
      <Footer />
    </Router>
  {:else}
    <!-- Server connection error -->
    <Loading
      title="Can't connect to server"
      desc={`Can't connect to server, Please contact the web developer!`}
    />
  {/if}
{:catch err}
  <!-- Server connection error -->
  <Loading
    title="Can't connect to server"
    desc={`Can't connect to server, Please contact the web developer!`}
  />
{/await}
