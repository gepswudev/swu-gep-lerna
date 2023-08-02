<script>
    //muti-lang handlers
    import { onMount } from 'svelte';
    import lang from '../lib/lang'
    export let active;
    let navLink = [];
    let navData = {};
    onMount(async () => {
      try {
        // Use dynamic import to load the module based on the 'lang' variable
        const navLinkData = await import(`../data/lang/${lang()??'th'}/Navbar.json`);
        navLink = navLinkData.default;
        /* @vite-ignore */
        const navDataData = await import(`../data/lang/${lang()??'th'}/Config.json`);
        navData = navDataData.default;
        log("Navbar", `Language loaded : ${lang().toLocaleUpperCase()}`);
      } catch (error) {
        log("Navbar", `Language ${lang().toLocaleUpperCase()} is not supported`, "error")
        swa({
          title: "Error",
          text: `Language ${lang().toLocaleUpperCase()} is not supported`,
          icon: "error",
          confirmButtonText: "Change to default language",
          
        }, () => {
          localStorage.setItem("lang", "th");
          window.location.reload();
        });
      }
    });
    //muti-lang handlers
  
    //page handlers
    import logo from '../assets/Srinakharinwirot_University_Logo.png'
    import swa from '../lib/popalert';
    import log from '../lib/log';
    import ThemeSwitch from './ThemeSwitch.svelte';
    log("Navbar", `Language loaded : ${lang().toLocaleUpperCase()}`)
    let isNavbarTransparent = false;
    let nav;
    const navOnTop = "fixed navbar  bg-base-100 z-50 transition-transform transform duration-800";
    const navScrolled = "fixed navbar  bg-base-100/[.5] h-12 z-50 transition-transform transform duration-800"
    let navClass = navOnTop;
    function updateNavbar() {
      if (window.scrollY > 50) {
        if (!isNavbarTransparent) {
          
          setTimeout(() => {
            navClass = navScrolled;
            isNavbarTransparent = true;
          }, 100);
        }
      } else {
        if (isNavbarTransparent) {
          navClass = navOnTop;
          isNavbarTransparent = false;
        }
      }
      log("Navbar", `User scrolled ${window.scrollY}px`);
    }
    window.addEventListener("scroll", updateNavbar);

    //language changer handler
    let langButton;

    const languageChange = () => {
      if (lang() == "th") {
        localStorage.setItem("lang", "en");
      } else {
        localStorage.setItem("lang", "th");
      }
      log("Navbar", `Language changed to ${lang().toLocaleUpperCase()}`);
      window.location.reload();
    }
    
    //active nav handler
    $: log("Navbar", `Active nav is ${active}`)

  </script>
  
  <div class={navClass}>
    <div class="navbar-start">
      <!-- Mobile size -->
      <div class="dropdown">
        <p tabindex="-1" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </p>
        <ul tabindex="-1" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
          {#each navLink as nav, index ("m_"+nav+index)}
          {#if nav.submenu}
          <li tabindex="-1">
            <details>
              <summary>{nav.title}</summary>
              <ul class="p-2 z-50">
                {#each nav.submenu as menu, index ("md_"+menu+index)}
                <li><a id={"nav_"+menu.link} href={menu.link}>{menu.title}</a></li>
                {/each}
              </ul>
            </details>
          </li>
          {:else}
            <li><a id={"nav_"+nav.link} href={nav.link}>{nav.title}</a></li>
          {/if}
          {/each}
        </ul>
      </div>
      <!-- Mobile size -->
      <a href="/"><img src={logo} class="hidden sm:flex w-16 m-4 pt-2" alt="_swu_logo"></a>
      <a class="hidden md:flex btn btn-ghost normal-case text-xl" href="/">{navData?.nav?.title || navData?.title}</a>
    </div>
    <img src={logo} class="navcenter sm:hidden w-16 m-4 pt-2" alt="_swu_logo">
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        {#each navLink as nav, index ("d_"+nav+index)}
          {#if nav.submenu}
          <li tabindex="-1">
            <details>
              <summary>{nav.title}</summary>
              <ul class="p-2 z-50">
                {#each nav.submenu as menu, index ("dd_"+menu+index)}
                <li><a id={"nav_"+menu.link} href={menu.link}>{menu.title}</a></li>
                {/each}
              </ul>
            </details>
          </li>
          {:else}
            <li><a id={"nav_"+nav.link} href={nav.link}>{nav.title}</a></li>
          {/if}
          
          {/each}
        
      </ul>
    </div>
    <div class="navbar-end">
      <!-- Languages Switcher -->
      <button class="btn bg-transparent border-none" on:click={languageChange} bind:this={langButton}>{@html lang() === 'th' ? '<b>TH</b> / EN': '<b>EN</b> / TH'}</button>
      <!-- Languages Switcher -->

      <!-- Theme Switcher -->
      <ThemeSwitch />
      <!-- Theme Switcher -->
    </div>
  </div>