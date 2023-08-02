<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Hero from './pages/Home/Home.svelte';
  import env from './lib/env';
  import { onMount } from 'svelte';
  import { Route, Router } from 'svelte-routing';
  import log from './lib/log';

  const defaultLang = 'th';
  const lang = localStorage.getItem('lang') || defaultLang;
  localStorage.setItem('lang', lang);

  env('dev'); // env('prod') for production & logger will enable only on development mode

  let url = "/";
  let currentPath = window.location.pathname;
  let loaded = false;
  onMount(async () => {
    //mockup loader hander
    setTimeout(() => {
      loaded = true;
    }, 0);
  });

  $: log("App", `Go to ${currentPath}`);
</script>

{#if !loaded}
  <!-- tailwindcss full page loader animation progress bar-->
  <div class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-base-100">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
{:else}

<Router {url} >
  <Navbar active={currentPath}/>
  <Route path="/" component={Hero} />

  <Route path="*" component={Hero} />
  <Footer />
</Router>
{/if}

