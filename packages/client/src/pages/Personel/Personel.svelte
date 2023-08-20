<script>
    import PersonelProfile from "../../components/PersonelProfile.svelte";
    import { get } from "../../lib/API/methods";

    let personnelsData = get("personnels");
</script>

<svelte:head>
    <title>Personel</title>
    <meta property="og:title" content="SWU" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="" />
    <meta property="og:image" content="" />
</svelte:head>

<div class="min-h-full">
    <h2 class="text-xl md:text-3xl font-bold drop-shadow-md text-[#00A2E0] ml-12" >
        บุคลากร
    </h2>
    <p class="text-base ml-20">
        อาจารย์ภาควิชาการแนะแนวและจิตวิทยาการศึกษา
    </p>

    {#await personnelsData}
        <div />
    {:then personnelData} 
        {#each personnelData.data as data}
            <PersonelProfile {data}/>
        {/each}
    {/await}
</div>