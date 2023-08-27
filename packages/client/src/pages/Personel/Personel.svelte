<script>
    import PersonelProfile from "../../components/PersonelProfile.svelte";
    import { get } from "../../lib/API/methods";
    import Loading from "../../components/Loading.svelte"

    let personnelsData = get("personnels");
</script>

<div class="grid justify-center w-screen">
    <h2 class="text-xl md:text-[30px] font-bold drop-shadow-md text-primary" >
        บุคลากร
    </h2>
    <p class="text-[16px] ml-12 pt-4">
        อาจารย์ภาควิชาการแนะแนวและจิตวิทยาการศึกษา
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-8">
        {#await personnelsData}
            <Loading />
        {:then personnelData} 
            {#each personnelData.data as data}
                <PersonelProfile {data}/>
            {/each}
        {/await}
    </div>
</div>