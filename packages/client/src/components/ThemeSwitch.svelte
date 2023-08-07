<!-- theme-switcher.svelte -->
<script> 
    import { IconMoonFilled, IconSunFilled } from '@tabler/icons-svelte'
  import log from '../lib/log';
    let darkMode = false;
    let animating = false;
    let thmemButton;
    // Check if the user has a preference for dark mode
    if (localStorage.getItem('theme') === 'dark') {
      darkMode = true;
      document.body.dataset.theme = 'dark';
    }

    function toggleTheme() {
      if (!animating) {
        animating = true;
        darkMode = !darkMode;
        //change body data-theme
        document.body.dataset.theme = darkMode ? 'dark' : 'main';
        localStorage.setItem('theme', darkMode ? 'dark' : 'main');
        //change button animation
        thmemButton.animate(
          [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
          ],
          {
            duration: 500,
            fill: 'forwards'
          }
        );
        // Add a small delay to allow the animation to complete
        setTimeout(() => {
          animating = false;
        }, 300); // Adjust the delay time as needed
      }
    }

    $: log("ThemeSwitch", `Theme is ${darkMode ? 'dark' : 'main'}`);
  </script>
  
  <button
    class="px-4 py-2 rounded-lg text-whit outline-none transition-transform duration-1000"
    class:opacity-50={animating}
    on:click={toggleTheme}
    bind:this={thmemButton}
  >
    <svelte:component this={darkMode ? IconSunFilled : IconMoonFilled} size={25} />
  </button>
  