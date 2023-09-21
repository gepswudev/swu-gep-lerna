<script>
  import PersonelProfile from "../../components/PersonnelProfile.svelte";
  import { get } from "../../lib/API/methods";
  import Loading from "../../components/Loading.svelte";
  import lang from "../../lib/lang";

  let personnelsData = get("personnels");
</script>

{#await personnelsData}
  <Loading />
{:then personnelData}
  <div class="ml-4 grid justify-center w-screen">
    <h2 class="text-xl md:text-[30px] font-bold drop-shadow-md text-primary">
      {lang() === "th" ? "บุคลากร" : "Personnels"}
    </h2>
    <p class="text-[16px] ml-12 pt-4">
      {lang() === "th"
        ? "อาจารย์ภาควิชาการแนะแนวและจิตวิทยาการศึกษา"
        : "Professors of the Guidance And Educational Psychology, Faculty of Education"}
    </p>
    <div class="ml-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-8">
      {#each personnelData.data as data}
        <PersonelProfile {data} />
      {/each}
    </div>
  </div>
{/await}

<svelte:head>
    <title>บุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว</title>
    <meta
      property="og:title"
      content="บุคคลากร | ภาควิชาการแนะแนวและจิตวิทยาการศึกษา - มศว"
    />
    <meta
      property="og:description"
      content="ภาควิชาการแนะแนวและจิตวิทยาการศึกษา คณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ"
    />
    <meta property="og:url" content={window.location} />
  </svelte:head>