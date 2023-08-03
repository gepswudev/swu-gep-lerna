<script>
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';
  import Hero from './pages/Home/Home.svelte';
  import env from './lib/env';
  import { onMount } from 'svelte';
  import { Route, Router } from 'svelte-routing';
  import axios from 'axios';
  import log from './lib/log';

  const defaultLang = 'th';
  const lang = localStorage.getItem('lang') || defaultLang;
  localStorage.setItem('lang', lang);

  

  let url = "/";
  let currentPath = window.location.pathname;
  let loaded = false;
  let err = '';
  onMount(async () => {
    axios.get("https://gepswu-server.onrender.com/health").then((res) => {
      if (res.status === 200) {
        loaded = true;
        env('dev'); // env('prod') for production & logger will enable only on development mode
      }else{
        err = res.statusText || 'Server Error';
      }

    }).catch((e) => {
      err = e.message || 'Server Error';
    });
  });

  $: log("App", `Go to ${currentPath}`);
</script>

{#if !loaded && !err}
  <!-- tailwindcss full page loader animation progress bar-->
  <div class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-base-100">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
{:else if err}
<!-- display error message -->
<div class="fixed top-0 left-0 z-50 w-screen h-screen flex flex-col items-center justify-center bg-base-100">
  <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  <div class="text-2xl text-center text-gray-900">
    <p>Server Error, Please try again later</p>
    <p>{err}</p>
  </div>
</div>
{:else}
<Router {url} >
  <Navbar active={currentPath}/>
  <Route path="/" component={Hero} />

  <Route path="*" component={Hero} />
  <Footer />
</Router>
{/if}

