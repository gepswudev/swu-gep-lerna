<!-- Footer -->
<script>
     //muti-lang handlers
  import { onMount } from 'svelte';
  import lang from '../lib/lang'
  import swa from '../lib/popalert';
  import log from '../lib/log';
  let data = [];
  onMount(async () => {
    try {
      // Use dynamic import to load the module based on the 'lang' variable
      const module = await import(`../data/lang/${lang()}/Footer.json`);
      data = module.default;
      log("Footer", `Language loaded : ${lang().toLocaleUpperCase()}`);
    } catch (error) {
      log("Footer", `Language ${lang().toLocaleUpperCase()} is not supported`, "error");
        swa({
          title: "Error",
          text: `Language ${lang().toLocaleUpperCase()} is not supported`,
          icon: "error",
          confirmButtonText: "Change to default language",
          
        }, () => {
          localStorage.setItem("lang", "th");
          window.location.reload();
        });
        log("Footer", `Language ${lang().toLocaleUpperCase()} is not supported`, "error");
    }
  });
</script>

<footer class="footer p-10 bg-base-100">

    {#each data as { title, links } (title)}
    <div>
        <span class="footer-title">{title}</span> 

        {#each links as {name, link} (name)}
        <a href={link} class="link link-hover">{name}</a> 
        {/each}

      </div> 
    {/each}
    
    <div>
      <span class="footer-title">Newsletter</span> 
      <div class="form-control w-80">
        <p class="label">
          <span class="label-text">Enter your email address</span>
        </p> 
        <div class="relative">
          <input type="text" placeholder="username@site.com" class="input input-bordered w-full pr-16" /> 
          <button class="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer -->