<script>
  import Card from "./ActivityCardMobile.svelte";
  import { get } from "../../lib/API/methods";
  import { IconAdjustmentsHorizontal } from "@tabler/icons-svelte";
  import lang from "../../lib/lang";
  import Loading from "../Loading.svelte";

  export let sx = "";

  // Function to sort by newest
  function sortByNewest(a, b) {
    return new Date(b.createAt) - new Date(a.createAt);
  }

  // Function to sort by oldest
  function sortByOldest(a, b) {
    return new Date(a.createAt) - new Date(b.createAt);
  }

  // Function to sort by most views
  function sortByMostViews(a, b) {
    return b.views - a.views;
  }

  // Function to sort the data based on the given sort type
  function sorter(data, sortType) {
    switch (sortType) {
      case "new":
        return data.slice().sort(sortByNewest);
      case "old":
        return data.slice().sort(sortByOldest);
      case "view":
        return data.slice().sort(sortByMostViews);
      default:
        return data.slice(); // Default to the original data if sortType is not recognized
    }
  }

  let activityData = get("activities");
</script>

{#await activityData}
  <Loading />
{:then rawdata}
  <div class={"h-64 mt-10 mx-12" + " " +sx}>
    <p class="text-start text-xl font-bold my-4 pl-2">{lang() === "th" ? "ประมวลภาพกิจกรรม (ล่าสุด)" : "Activities (Recently)"}</p>
    <div class="flex flex-row overflow-y-scroll justify-start">
      {#each sorter(rawdata.data, "new") as data}
        <Card {data} sx={"w-12"}/>
      {/each}
    </div>
  </div>
{/await}
