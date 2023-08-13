{#if $user !== null}
  <div class={navClass}>
    <div class="navbar-start">
      <!-- Mobile size -->
      <div class="dropdown">
        <p tabindex="-1" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </p>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
        {#if $user.role === "admin"}
        <li><a href="/">Home</a></li>
        <li tabindex="-1">
          <details>
            <summary>Menu</summary>
            <ul class="p-2 z-50">
              {#each navLink as menu, index ("md_" + menu + index)}
                <li>
                  <a id={"nav_" + menu.link} href={menu.link}>{menu.title}</a>
                </li>
              {/each}
            </ul>
          </details>
        </li>
        <li><a href="/files">File system</a></li>
        <li><a href="/viewactivities">Activities</a></li>
        <li><a href="/viewcorousels">Banner</a></li>
      {:else}
        <li><a href="/user">You are not admin!</a></li>
      {/if}
      <li><a href="/admin">{$user.username.toUpperCase()}</a></li>
      <li>
        <button
          on:click={logout}>Logout</button
        >
      </li>
        </ul>
      </div>
      <!-- Mobile size -->
      <a href="/"
        ><img
          src={logo}
          class="hidden md:flex w-10 m-4 pt-2"
          alt="_swu_logo"
        /></a
      >
      <a
        class="hidden lg:flex md:flex-1 xl:flex-none px-0 normal-case text-xl"
        href="/">{navData?.nav?.title || navData?.title}</a
      >
    </div>
    <img src={logo} class="navcenter md:hidden w-10 m-4 pt-2" alt="_swu_logo" />
    <div class="navbar-center hidden lg:flex">
      
    </div>
    <div class="navbar-end">
      <ul class="hidden lg:flex menu menu-horizontal px-1 align-baseline">
        {#if $user.role === "admin"}
          <li><a href="/">Home</a></li>
          <li tabindex="-1">
            <details>
              <summary>Menu</summary>
              <ul class="p-2 z-50">
                {#each navLink as menu, index ("md_" + menu + index)}
                  <li>
                    <a id={"nav_" + menu.link} href={menu.link}>{menu.title}</a>
                  </li>
                {/each}
              </ul>
            </details>
          </li>
          <li><a href="/files">File system</a></li>
          <li><a href="/viewactivities">Activities</a></li>
          <li><a href="/viewcorousels">Banner</a></li>
        {:else}
          <li><a href="/user">You are not admin!</a></li>
        {/if}
        <li><a href="/admin">{$user.username.toUpperCase()}</a></li>
        <li>
          <button
            on:click={logout}>Logout</button
          >
        </li>
      </ul>
      <b class="flex lg:hidden mx-4 text-red-500">ADMIN MODE</b>
    </div>
  </div>
{:else}
  <div class={navClass}>
    <div class="navbar-start">
      <!-- Mobile size -->
      <div class="dropdown">
        <p tabindex="-1" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </p>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {#each navLink as nav, index ("m_" + nav + index)}
            {#if nav.submenu}
              <li tabindex="-1">
                <details>
                  <summary>{nav.title}</summary>
                  <ul class="p-2 z-50">
                    {#each nav.submenu as menu, index ("md_" + menu + index)}
                      <li>
                        <a id={"nav_" + menu.link} href={menu.link}
                          >{menu.title}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </details>
              </li>
            {:else}
              <li>
                <a
                  id={"nav_" + nav.link}
                  href={nav.link}
                  class={active === nav.link ? "text-primary" : ""}
                  >{nav.title}</a
                >
              </li>
            {/if}
          {/each}
          <li class="navbar-end flex flex-rows">
            <!-- Languages Switcher -->
            <button on:click={languageChange} bind:this={langButton}
              >{@html lang() === "th"
                ? "<b>TH</b> / EN"
                : "<b>EN</b> / TH"}</button
            >
            <!-- Languages Switcher -->
          </li>
          <li />
        </ul>
      </div>
      <!-- Mobile size -->
      <a href="/"
        ><img
          src={logo}
          class="hidden sm:flex w-10 m-4 pt-2"
          alt="_swu_logo"
        /></a
      >
      <a
        class="hidden md:flex md:flex-1 xl:flex-none px-0 pt-1 normal-case text-xl"
        href="/"><h1>{navData?.nav?.title || navData?.title}</h1></a
      >
    </div>
    <img src={logo} class="navcenter sm:hidden w-10 m-4 pt-2" alt="_swu_logo" />
    <!-- <div class="navbar-center hidden lg:flex">
      
    </div> -->
    <div class="navbar-end">
      <!-- Navbar Link Desktop size -->
      <div class="hidden xl:flex">
        <ul class="menu menu-horizontal px-1">
          {#each navLink as nav, index ("d_" + nav + index)}
            {#if nav.submenu}
              <li tabindex="-1">
                <details>
                  <summary>{nav.title}</summary>
                  <ul class="p-2 z-50">
                    {#each nav.submenu as menu, index ("dd_" + menu + index)}
                      <li>
                        <a
                          id={"nav_" + menu.link}
                          href={menu.link}
                          class={active === menu.link
                            ? "text-primary font-bold"
                            : ""}>{menu.title}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </details>
              </li>
            {:else}
              <li>
                <a
                  id={"nav_" + nav.link}
                  href={nav.link}
                  class={active === nav.link ? "text-primary font-bold" : ""}
                  >{nav.title}</a
                >
              </li>
            {/if}
          {/each}
        </ul>
      </div>
      <!-- Languages Switcher -->
      <button on:click={toggleLangSwitcher} on:mouseenter={toggleLangSwitcher} class="hidden xl:flex mr-4 hover:animate-pulse"
        ><IconFlag stroke=1 class="hover:stroke-2"/></button
      >
      {#if langSwitcher}
        <div
          class="absolute flex top-24 mr-28 p-2 bg-base-100 border-none rounded-lg items-center align-baseline justify-center"
          on:mouseleave={toggleLangSwitcher}
          aria-hidden="true"
          
        >
          <button
            class={lang() === "th" ? "btn bg-base-200 border-none" : "btn bg-base-100 border-none"}
            on:click={languageChange}
            
            bind:this={langButton}
            ><img class="rounded w-6" src={tha} alt="tha_flag"></button
          >
          <button
            class={lang() === "en" ? "btn bg-base-200  border-none" : "btn bg-base-100 border-none"}
            on:click={languageChange}
            bind:this={langButton}
            
            ><img class="rounded w-6" src={usa} alt="usa_flag"></button
          >
        </div>
      {/if}
      <button class="hidden xl:flex mr-4 hover:animate-bounce"
        ><IconSearch stroke=1 class="hover:stroke-2"/></button
      >

      <!-- Languages Switcher -->

      <!-- Theme Switcher -->
      <!-- <ThemeSwitch /> -->
      <!-- Theme Switcher -->
      <!-- <a href="/login" class="btn btn-ghost border border-gray mr-2"><IconUser stroke=2 size=16/>Login</a> -->
      <button on:click={_login} class="btn btn-ghost border border-gray mr-2"><IconUser stroke=2 size=16/>Login</button>
    </div>
  </div>
{/if}



<script>
  //muti-lang handlers
  import { onMount } from "svelte";
  import lang from "../lib/lang";
  export let active;
  let navLink = [];
  let navData = {};
  onMount(async () => {
    try {
      // Use dynamic import to load the module based on the 'lang' variable
      const navLinkData = await import(
        `../data/lang/${lang() ?? "th"}/Navbar.json`
      );
      navLink = navLinkData.default;
      /* @vite-ignore */
      const navDataData = await import(
        `../data/lang/${lang() ?? "th"}/Config.json`
      );
      navData = navDataData.default;
      log("Navbar", `Language loaded : ${lang().toLocaleUpperCase()}`);

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
            } else {
              //destroy token
              localStorage.removeItem("username");
              log("AUTH", `User not logged in`);
            }
          })
          .catch((err) => {
            //destroy token
            localStorage.removeItem("username");
            log("AUTH", `User not logged in : ${err.message}`);
          });
      }
    } catch (error) {
      log(
        "Navbar",
        `Language ${lang().toLocaleUpperCase()} is not supported`,
        "error"
      );
      swa(
        {
          title: "Error",
          text: `Language ${lang().toLocaleUpperCase()} is not supported`,
          icon: "error",
          confirmButtonText: "Change to default language",
        },
        () => {
          localStorage.setItem("lang", "th");
          window.location.reload();
        }
      );
    }
  });
  //muti-lang handlers

  //page handlers
  import logo from "../assets/Srinakharinwirot_University_Logo.png";
  import tha from "../assets/flag/tha.png";
  import usa from "../assets/flag/usa.png";
  import swa from "../lib/popalert";
  import log from "../lib/log";
  import ThemeSwitch from "./ThemeSwitch.svelte";
  log("Navbar", `Language loaded : ${lang().toLocaleUpperCase()}`);
  let isNavbarTransparent = false;
  let nav;
  const navOnTop =
    "fixed navbar h-24  bg-base-100 z-50 transition-transform transform duration-800";
  const navScrolled =
    "fixed navbar  bg-base-100/[.5] h-24 z-50 transition-transform transform duration-800";
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
    //log("Navbar", `User scrolled ${window.scrollY}px`);
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
  };

  //active nav handler
  $: log("Navbar", `Active nav is ${active}`);

  import { user, logout, login } from "../store/user";
  import { get } from "../lib/API/methods";
  import { IconFlag, IconSearch, IconUser } from "@tabler/icons-svelte";
  import { _login } from "../lib/API/user";
  let langSwitcher = false;
  const toggleLangSwitcher = () => {
    langSwitcher = !langSwitcher;
  };

  //auth token
</script>