<script>
  import { onMount, onDestroy } from "svelte";

  export let marker = {
    lat: 13.745518582850021,
    lng: 100.5649431162508,
    text: "ภาควิชาการแนะแนวและจิตวิทยาการศึกษา",
  };

  let mapElement;
  let map;

  onMount(async () => {
    const leaflet = await import("leaflet");

    map = leaflet.map(mapElement).setView([marker.lat, marker.lng], 17);

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map);

    leaflet
      .marker([marker.lat, marker.lng])
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
  <div bind:this={mapElement} on:click={ (e) => console.log(e)}/>
</main>

<style>
  @import "leaflet/dist/leaflet.css";
  main div {
    height: var(--map-height, 800px);
  }
</style>
