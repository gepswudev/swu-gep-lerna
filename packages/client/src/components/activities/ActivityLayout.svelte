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
  <div
    class="flex mx-auto my-32 w-[90rem]  text-neutral"
  >
    <div class="hidden md:flex flex-none w-64 flex-col">
      <div class="mt-4 ml-3 flex flex-row align-start items-start">
        <IconAdjustmentsHorizontal stroke="1" size="28" />
        <p class="ml-1 font-normal text-xl">คัดกรอง</p>
      </div>

      <!-- Filter Section -->
      
      <div class="form-control pb-8 justify-start text-start text-sm">
        <input
            bind:value={search}
            type="text"
            name="search"
            class="my-4 input input-bordered w-full h-8 focus:input-primary hover:input-primary"
            placeholder="ค้นหากิจกรรมที่นี่"
          />
        <div class="m-6 mt-1">
          <b>คัดกรอง</b>
          
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
              <span class="label-text mx-2">แนะนำ</span>
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
              <span class="label-text mx-2">ใหม่</span>
            </label>
          </div>
        </div>

        <div class="m-6 mt-1">
          <b>เรียบเรียง</b>
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
              <span class="label-text mx-2">ใหม่</span>
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
              <span class="label-text mx-2">เก่า</span>
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
              <span class="label-text mx-2">การเข้าชม</span>
            </label>
          </div>
        </div>

        <div class="m-6 mt-1">
          <b>ระดับการศึกษา</b>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                bind:checked={bechelor}
              />
              <span class="label-text mx-2">ระดับปริญญาตรี</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                bind:checked={master}
              />
              <span class="label-text mx-2">ระดับปริญญาโท</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer justify-normal">
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                bind:checked={doctor}
              />
              <span class="label-text mx-2">ระดับปริญญาเอก</span>
            </label>
          </div>
        </div>
      </div>
      <!-- Filter Section -->
    </div>
    <!-- Card section -->
    <div class="flex grow flex-col text-start h-[93vh] overflow-y-scroll">
      <h2 class="mt-2 ml-3 text-3xl font-semibold text-black">
        ประมวลผลภาพกิจกรรม
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {#if sortType}
          {@const sortedData = sorter(rawdata.data, sortType)}
          {#each sortedData as data, i (data._id)}
            {#if data.title.includes(search) || data.desc.includes(search) || !search}
              {#if data.tag.includes(filter) || data.badge.includes(filter) || !filter}
                {#if (bechelor && data.degree.includes("bechelor")) || (master && data.degree.includes("master")) || (doctor && data.degree.includes("doctor")) || (!bechelor && !master && !doctor)}
                  <Card {data} />
                {/if}
              {/if}
            {/if}
          {/each}
        {:else}
          {#each rawdata.data as data, i (data._id)}
            {#if data.title.includes(search) || data.desc.includes(search) || !search}
              {#if data.tag.includes(filter) || data.badge.includes(filter) || !filter}
                {#if (bechelor && data.degree.includes("bechelor")) || (master && data.degree.includes("master")) || (doctor && data.degree.includes("doctor")) || (!bechelor && !master && !doctor)}
                  <Card {data} />
                {/if}
              {/if}
            {/if}
          {/each}
        {/if}
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
