<script>
  import { navigate } from "svelte-routing";
  import { IconPlus } from "@tabler/icons-svelte";
  import Card from "../../../components/admin/HorizonCard.svelte";
  import Skeleton from "../../../components/skeletons/HorizonCard_Skeleton.svelte";
  import AdminProtect from "../../../components/admin/adminProtect.svelte";
  import { get } from "../../../lib/API/methods";
  import Loading from "../../../components/Loading.svelte";

  let filtered = "";
  let activities = get("activities");
</script>

<AdminProtect>
  <h2 class="font-bold text-3xl text-center mt-12">
    Activities Management {#await activities}
    (Loding...)
    {:then data}
      <p >({data.data.length} {data.data.length > 1 ? "Activities" : "Activity"})</p>
    {/await}
  </h2>
  <div
    class="mt-12 px-24 flex flex-col md:flex-row w-full justify-center md:justify-start gap-4"
  >
    <input
      type="text"
      bind:value={filtered}
      class="input input-bordered focus:input-primary w-full grow"
      placeholder="Search "
    />
    <button
      class="btn btn-primary w-full max-w-md text-xl flex-none"
      on:click={() => navigate("/admin/activities/create", { replace: true })}
      ><IconPlus /> New</button
    >
  </div>

  <div
    class="mx-16 justify-center items-start my-24 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
  >
    {#await activities}
      <Skeleton load={4} />
    {:then data}
      {#each data.data as activity}
        {#if filtered === "" || activity.title
            .toLowerCase()
            .includes(filtered.toLowerCase()) || activity.desc
            .toLowerCase()
            .includes(filtered.toLowerCase())}
          {@const id = activity._id}
          <Card data={activity} {id} />
        {/if}
      {/each}
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
</AdminProtect>

<svelte:head>
    <title>กิจกรรมนิสิต | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="กิจกรรมนิสิต | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>