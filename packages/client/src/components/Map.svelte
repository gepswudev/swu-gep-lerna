<script>
  import { onMount, onDestroy } from "svelte";
  import Logo from "../assets/Srinakharinwirot_University_Logo.png";
  import { navigate } from "svelte-routing";

  export let marker = {
    lat: 13.745518582850021,
    lng: 100.5649431162508,
    text: "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา",
    navigate:"#"
  };

  let mapElement;
  let map;

  onMount(async () => {
    const L = await import("leaflet");

    map = L.map(mapElement).setView([marker.lat, marker.lng], 17);

    L
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map);

    L
      .marker([marker.lat, marker.lng],{
        icon: L.icon({
          iconUrl: Logo,
          iconSize: [30, 30],
          iconAnchor: [15,30],
          popupAnchor: [0, -25],
        }),
        title: marker.text,
        autoPanOnFocus: true,
      })
      .addTo(map)
      .bindPopup(marker.text)
      .openPopup();
  });

  onDestroy(async () => {
    if (map) {
      console.log("Unloading Leaflet map.");
      map.remove();
    }
  });

  function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div bind:this={mapElement} on:click={ (e) => navigate(marker.navigate, { replace: true })} title="Click to navigate"/>
</main>

<style>
  @import "leaflet/dist/leaflet.css";
  main div {
    height: var(--map-height, 800px);
  }
</style>
