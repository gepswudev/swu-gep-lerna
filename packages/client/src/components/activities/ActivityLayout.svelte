<script>
  import Card from "./ActivityCard.svelte";
  import { get } from "../../lib/API/methods";
  import { IconAdjustmentsHorizontal } from "@tabler/icons-svelte";

  let filter = "";
  let postShow = 6;
  const showMore = () => {
    postShow += 6;
  };

  $: console.log(filter);
  let activityData = get("activities");
</script>

{#await activityData}
  <div />
{:then rawdata}
  <div class="mx-48 flex w-[80rem] text-neutral">
    <div class="flex flex-none w-64 flex-col">
      <div class="mt-4 ml-3 flex flex-row align-start items-start">
        <IconAdjustmentsHorizontal stroke="1" size="28" />
        <p class="ml-1 font-normal text-xl">คัดกรอง</p>
      </div>

      <!-- Filter Section -->
      <div class="form-control py-8 justify-start text-start text-sm">
        <div class="m-6 mt-1">
          <b>แนะนำ</b>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="radio"
                name="radio-10"
                class="radio radio-primary"
                bind:group={filter}
                value="แนะนำ"
              />
              <span class="label-text mx-2">แนะนำ</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="radio"
                name="radio-10"
                class="radio radio-primary"
                bind:group={filter}
                value="ใหม่"
              />
              <span class="label-text mx-2">ใหม่</span>
            </label>
          </div>
        </div>
        <div class="m-6 mt-1">
          <b>topic1</b>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="radio"
                name="radio-10"
                class="radio radio-primary"
                bind:group={filter}
              />
              <span class="label-text mx-2">Filter</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="radio"
                name="radio-10"
                class="radio radio-primary"
                bind:group={filter}
              />
              <span class="label-text mx-2">Filter</span>
            </label>
          </div>
        </div>
        <div class="m-6 mt-1">
          <b>topic2</b>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="radio"
                name="radio-10"
                class="radio radio-primary"
                bind:group={filter}
              />
              <span class="label-text mx-2">Filter</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="radio"
                name="radio-10"
                class="radio radio-primary"
                bind:group={filter}
              />
              <span class="label-text mx-2">Filter</span>
            </label>
          </div>
        </div>
      </div>
      <!-- Filter Section -->
    </div>
    <!-- Card section -->
    <div class="flex grow flex-col text-start">
      <h2 class="mt-2 ml-3 text-3xl font-semibold text-black">
        ประมวลผลภาพกิจกรรม
      </h2>
      <div class="grid grid-cols-3 grid-rows-2">
        {#each rawdata.data as data, i (data._id)}
          {#if i < postShow}
            {#if data.tag.includes(filter) || data.badge.includes(filter) || !filter}
              <Card {data} />
            {/if}
          {/if}
        {/each}
      </div>
      <button class="self-end btn btn-ghost" on:click={showMore}
        >Show more ...</button
      >
    </div>
    <!-- Card section -->
  </div>
{/await}
