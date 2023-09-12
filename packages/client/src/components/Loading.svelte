<script>
    import config from "../config";

    export let title = "";
    export let desc = "";
    export let sx = "";
    export let placeholder = config.loading_placeholder_msg;
    
</script>

<div class={"hero min-h-screen "+sx}>
  <div class="hero-content flex-col text-center">
    <div class="max-w-xl">
      
      <h2 class="text-5xl font-bold">{title}</h2>
      <p class="py-6">{desc}</p>
      <!-- Loding animation -->
      <div
        class="loading ease-linear rounded-full border-8 border-t-8 border-primary bg-primary h-32 w-32"
      />
      
    </div>
    <h1 class="mt-64 text-xl font-bold">{placeholder}</h1>
  </div>
</div>
