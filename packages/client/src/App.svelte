<script>
//====================================| Import Pagekages and Modules |====================================//
  import { Route, Router } from "svelte-routing";
  import { checkConnection } from "./lib/API/checkConnection";
  import Swal from "sweetalert2";
  import log from "./lib/log";
  import config from "./config";

//====================================| Import Pagekages and Modules |====================================//

//====================================| Import Admin Pages |====================================//
  import AdminMain from "./pages/Admin/AdminMainPage.svelte";
  import AdminActivities from "./pages/Admin/Activities/all.svelte";
  import AdminActivitiesCreate from "./pages/Admin/Activities/create.svelte";
  import AdminActivitiesUpdate from "./pages/Admin/Activities/update.svelte";
  import AdminCorousels from "./pages/Admin/Corousels/all.svelte";
  import AdminCorouselsCreate from "./pages/Admin/Corousels/create.svelte";
  import AdminCorouselsUpdate from "./pages/Admin/Corousels/update.svelte";
  import AdminPersonnels from "./pages/Admin/Personnels/all.svelte";
  import AdminPersonnelsCreate from "./pages/Admin/Personnels/create.svelte";
  import AdminPersonnelsUpdate from "./pages/Admin/Personnels/update.svelte";
  import FileManagement from "./pages/Admin/FileManagementPage.svelte";
  import MarkdownEditor from "./pages/Editor.svelte";
  import AdminMarkdownEditor from "./pages/Admin/Editor.svelte";
//====================================| Import Admin Pages |====================================//

//====================================| Import Common Pages |====================================//
  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  import HomePage from "./pages/Home/Home.svelte";
  import HistoryPage from "./pages/History/History01.svelte";
  import PersonnelPage from "./pages/Personnel/Personnel.svelte";
  import PersonnelProfile from "./pages/Profile/Profile.svelte";

  import Login from "./pages/User/UserTest.svelte";
  import Test from "./pages/Playground.svelte";
  import CookiesPage from "./pages/Cookies/CookiesPage.svelte";
  import Cookies from "./components/Cookies.svelte";
  import Loading from "./components/Loading.svelte";
  import ActivityPage from "./pages/Activity/ActivityPage.svelte";
  // import HeaderMetadata from "./components/HeaderMetadata.svelte";
  import ContactPage from "./pages/Contact/ContactPage.svelte";
  import CoursePage from "./pages/Course/Course.svelte";
  import PrivacyPolicyPage from "./pages/Privacy/PrivacyPolicyPage.svelte";
  import TermsOfUsePage from "./pages/Terms/TermsOfUsePage.svelte";
  import WellCenter from "./pages/WellCenter/WellCenter.svelte";
  import License from "./pages/LICENSE/LICENSE.svelte";
  import { fade } from "svelte/transition";
  import ServerPubFiles from "./pages/Admin/ServerPubFiles.svelte";
  import Webconfig from "./pages/Admin/Webconfig.svelte";
  import Manual from "./pages/Admin/Manual.svelte";
  
  

//====================================| Import Common Pages |====================================//

//====================================| Languages |====================================//
  const defaultLang = config.default_lang;
  const lang = localStorage.getItem("lang") || defaultLang;
  localStorage.setItem("lang", lang);
//====================================| Languages |====================================//

//====================================| Navbar Config |====================================//
  let basepath = "/";
  export let url = "";
  let currentPath = window.location.pathname;
  let err = "";
//====================================| Navbar Config |====================================//

//====================================| Server Connection Checking |====================================//
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

    let isServerAlive = checkConnection();
//====================================| Server Connection Checking |====================================//

  $: log("App", `Go to ${currentPath}`);  
</script>

{#await isServerAlive}
<!--======================== Loading page ========================-->
  <Loading
    title={config.loading_title_msg}
    desc={config.loading_desc_msg}
  />
<!--======================== Loading page ========================-->
{:then alive}
  {#if alive}
  
  <Router {basepath} {url} >
<!--======================== Navbar ========================-->
      <Navbar/>
<!--======================== Navbar ========================-->

      <main
        class="mx-auto pt-24 w-screen h-full scroll-smooth overflow-x-hidden bg-base-100"
        transition:fade
      >
<!--======================== Common pages ========================-->
        <!-- Homepage -->
        <Route path="/" component={HomePage} />
        <!-- About page -->
        <Route path="/about" component={HistoryPage} />
        <!-- Personnel Page -->
        <Route path="/personnel" component={PersonnelPage} />
        <Route path="/personnel/:id" let:params>
          <PersonnelProfile {...params} />
        </Route>
        <!-- Personnel Profile Page -->
        
        <!-- Activity Page -->
        <Route path="/activity" component={ActivityPage} />
        <!-- Course Page -->
        <Route path="/course" component={CoursePage} />
        <!-- Well Center -->
        <Route path="/wellcenter" component={WellCenter} />
        <!-- Map Page -->
        <Route path="/contact" component={ContactPage} />
        <!-- Privacy Policy page -->
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <!-- Terms of Use page -->
        <Route path="/terms" component={TermsOfUsePage} />
        <!-- Cookies consent page -->
        <Route path="/cookies" component={CookiesPage} />
<!--======================== Common pages ========================-->


<!--======================== Admin pages ========================-->
        <!-- Login Test pages -->

        <!-- Admin pages -->
        <Route path="/admin" component={AdminMain} />

        <Route path="/mdeditor" component={MarkdownEditor} />

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

        <Route path="/profile/edit/:id" let:params>
          <AdminMarkdownEditor path={params.id} />
        </Route>

        <Route path="/license" component={License} />
        <Route path="/files" component={FileManagement} />
        <Route path="/serverfiles" component={ServerPubFiles} />
        <Route path="/config" component={Webconfig} />
        <Route path="/manual" component={Manual} />
        <Route path="/test" component={Test} />

<!--======================== Admin pages ========================-->

<!--======================== Error page ========================-->
        <!-- 404 page = Return to home -->
        <Route path="*" component={HomePage} />
<!--======================== Error page ========================-->

<!--======================== Untils component ========================-->
        <!-- Header Controller -->
        <!-- <HeaderMetadata basepath={currentPath} /> -->
        <!-- Cookies consent popup -->
        <Cookies />
<!--======================== Untils component ========================-->
      </main>

<!--======================== Footer ========================-->
      <Footer />
<!--======================== Footer ========================-->
    </Router>

    
  {:else}
    <!-- Server connection error -->
    <Loading
      title="Can't connect to server"
      desc={config.load_err_msg}
    />
  {/if}
{:catch err}
  <!-- Server connection error -->
  <Loading
    title="Can't connect to server"
    desc={config.load_err_msg}
  />
{/await}
