<!-- src/components/CookieConsent.svelte -->
<script>
  import Swal from "sweetalert2";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  let consentGiven = false;
  function showCookieConsent() {
    if (!consentGiven) {
      Swal.fire({
        title: "Cookie Consent",
        text: "This website uses cookies to enhance user experience. Do you consent to the use of cookies?",
        html:
    `This website uses cookies to enhance user experience. Do you consent to the <b style="text-decoration:underline;"><a href="/cookies">use of cookies<a/><b/>?`,
        showCancelButton: true,
        confirmButtonText: "Yes, I consent",
        cancelButtonText: "Read more",
        confirmButtonColor: "#00A2E0",
        toast: true,
        position: "bottom",
      }).then((result) => {
        if (result.isConfirmed) {
          consentGiven = true;
          // Here, you can add logic to set the cookie or store the user's consent
          localStorage.setItem("cookieConsent", true);
        } else {
            localStorage.setItem("cookieConsent", false);
            window.location.href = "/cookies";
        }
      });
    }
  }

  // Call showCookieConsent function on component load
  onMount(() => {
    showCookieConsent();
  });

  $: consentGiven = localStorage.getItem("cookieConsent") === "true";
  $: if (!consentGiven) showCookieConsent();
</script>

{#if !consentGiven}
  <div />
{/if}

