<script>
  import Card from "./ActivityCard.svelte";
  import { get } from "../../lib/API/methods";
  import { IconAdjustmentsHorizontal } from "@tabler/icons-svelte";
  import lang from "../../lib/lang";

  export let title = true;
  export let showFilter = true;
  export let showSearchFilter = true;
  export let showTagFilter = false;
  export let showSortFilter = true;
  export let showDegreeFilter = true;

  export let sx = "";

  let filter = "";
  let search = "";
  let bechelor = false;
  let master = false;
  let doctor = false;
  let sortType = "new";

  const setSortType = (e) => {
    const type = e.target.value;
    switch (type) {
      case "ใหม่":
        sortType = "new";
        break;
      case "เก่า":
        sortType = "old";
        break;
      case "การเข้าชม":
        sortType = "view";
        break;
      default:
        sortType = "new";
        break;
    }
  };

  const activeBechelor = () => {
    bechelor = !bechelor;
  };
  const activeMaster = () => {
    master = !master;
  };

  const activeDoctor = () => {
    doctor = !doctor;
  };

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
  <div />
{:then rawdata}
<!-- mobile filer section -->
<div class="flex flex-col justify-center items-center md:hidden mx-auto ">
  <div class="grid grid-cols-1 grid-row-2 gap-2">
    <div class="join flex flex-row justify-between text-center">
      <input type="button" class={sortType === 'new' ? "btn btn-ghost rounded-none flex-1 border-0 border-b-2 border-primary text-primary":"btn btn-ghost rounded-none flex-1 border-0 border-b-2 border-neutral text-neutral"} on:click={setSortType} value="ใหม่" />
      <div class="text-black flex justify-center items-center text-center">|</div>
      <input type="button" class={sortType === 'old' ? "btn btn-ghost rounded-none flex-1 border-0 border-b-2 border-primary text-primary":"btn btn-ghost rounded-none flex-1 border-0 border-b-2 border-neutral text-neutral"}  on:click={setSortType} value="เก่า" />
      <div class="text-black flex justify-center items-center text-center">|</div>
      <input type="button" class={sortType === 'view' ? "btn btn-ghost rounded-none flex-1 border-0 border-b-2 border-primary text-primary":"btn btn-ghost rounded-none flex-1 border-0 border-b-2 border-neutral text-neutral"}  on:click={setSortType} value="การเข้าชม" />
    </div>
    <div class="flex flex-row justify-between text-center">
      <button on:click={activeBechelor} class={bechelor ? "btn btn-outline btn-primary flex-1 rounded-none":"btn btn-ghost"}>{lang() === "th" ? "ปริญญาตรี" : "Bechelor Degree"}</button>
      <button on:click={activeMaster}   class={master ? "btn btn-outline btn-primary flex-1 rounded-none":"btn btn-ghost"}>{lang() === "th" ? "ปริญญาโท":"Master Degree"}</button>
      <button on:click={activeDoctor}   class={doctor ? "btn btn-outline btn-primary flex-1 rounded-none":"btn btn-ghost"}>{lang()=== "th" ? "ปริญญาเอก":"Doctoral Degree"}</button>  
    </div>
    </div>
</div>
<!-- mobile filer section -->


  <div class={"flex mx-auto my-32 w-full xl:w-[90rem] text-neutral" + " " + sx}>

    

    {#if showFilter}
      <div class="hidden lg:flex flex-none w-64 flex-col">
        <div class="mt-4 ml-3 flex flex-row align-start items-start">
          <IconAdjustmentsHorizontal stroke="1" size="28" />
          <p class="ml-1 font-normal text-xl">{lang() === "th" ? "คัดกรอง" : "Filter"}</p>
        </div>

        <!-- Filter Section -->

        <div class=" form-control pb-8 justify-start text-start text-sm">
          {#if showSearchFilter}
          <input
            bind:value={search}
            type="text"
            name="search"
            class="my-4 input input-bordered w-full h-8 focus:input-primary hover:input-primary"
            placeholder={lang() === "th" ? "ค้นหากิจกรรมที่นี่" : "Search an activity here!"}
          />
          {/if}

          {#if showTagFilter}
          <div class="m-6 mt-1">
            <b>{lang() === "th" ? "คัดกรอง" : "Filter"}</b>

            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="radio-1"
                  class="radio radio-primary"
                  bind:group={filter}
                  value=""
                  checked
                />
                <span class="label-text mx-2">ทั้งหมด</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="radio-1"
                  class="radio radio-primary"
                  bind:group={filter}
                  value="แนะนำ"
                />
                <span class="label-text mx-2">{lang() === "th" ? "แนะนำ" : "Recommend"}</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="radio-1"
                  class="radio radio-primary"
                  bind:group={filter}
                  value="ใหม่"
                />
                <span class="label-text mx-2">{lang() === "th" ? "ใหม่" : "New"}</span>
              </label>
            </div>
          </div>
          {/if}

          {#if showSortFilter}
          <div class="m-6 mt-1">
            <b>{lang() === "th" ? "เรียบเรียง":"Sort by"}</b>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                  bind:group={sortType}
                  value="new"
                  checked
                />
                <span class="label-text mx-2">{lang() === "th" ? "ใหม่" : "Newest"}</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                  bind:group={sortType}
                  value="old"
                />
                <span class="label-text mx-2">{lang() === "th" ? "เก่า" : "Oldest"}</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="radio"
                  name="radio-2"
                  class="radio radio-primary"
                  bind:group={sortType}
                  value="view"
                />
                <span class="label-text mx-2">{lang() === "th" ? "การเข้าชม" : "Most view"}</span>
              </label>
            </div>
          </div>
          {/if}

          {#if showDegreeFilter}
          <div class="m-6 mt-1">
            <b>{lang() ? "ระดับการศึกษา" : "Level"}</b>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  bind:checked={bechelor}
                />
                <span class="label-text mx-2">{lang() === "th" ? "ระดับปริญญาตรี" : "Bechelor Degree"}</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  bind:checked={master}
                />
                <span class="label-text mx-2">{lang() === "th" ? "ระดับปริญญาโท" : "Master Degree"}</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer justify-normal">
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  bind:checked={doctor}
                />
                <span class="label-text mx-2">{lang() === "th" ? "ระดับปริญญาเอก" : "Doctoral Degree"}</span>
              </label>
            </div>
          </div>
          {/if}
        </div>
        <!-- Filter Section -->
      </div>
    {/if}
    <!-- Card section -->

    <div class="flex flex-col grow mx-auto text-start h-[93vh]">
      {#if title}
        <h2 class="mt-2 ml-3 text-3xl font-semibold text-neutral">
          {lang() === "th" ? "ประมวลภาพกิจกรรม" : "Activities"}
        </h2>
      {/if}
      {#key sortType}
      <div
        class="grid grid-cols-2 xl:grid-cols-3 items-start overflow-y-scroll overflow-x-hidden no-scrollbar"
      >
        {#if sortType}
          {#each sorter(rawdata.data, sortType) as data, i (data._id)}
            {#if data.title
              .toLowerCase()
              .includes(search.toLowerCase()) || data.desc
                .toLowerCase()
                .includes(search.toLowerCase()) || !search}
              {#if data.tag.includes(filter) || data.badge.includes(filter) || !filter}
                {#if (data.degree.includes("bechelor") && bechelor) || (data.degree.includes("master") && master) || (data.degree.includes("doctor") && doctor) || (!bechelor && !master && !doctor)}
                  <Card {data} />
                {/if}
              {/if}
            {/if}
          {/each}
        {/if}
      </div>
      {/key}
    </div>
    <!-- Card section -->
  </div>

{/await}
