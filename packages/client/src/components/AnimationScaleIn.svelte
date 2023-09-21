<script>
    import Saos from "saos";
</script>

<style>
    @keyframes -global-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  
</style>

<Saos
animation={'fade-in 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'}
>
<slot />
</Saos>