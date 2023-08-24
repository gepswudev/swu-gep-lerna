<script>
    import { get } from "../../lib/API/methods";
    import CounselorCard from "./CounselorCard.svelte";
    import Loading from "../../components/Loading.svelte"
    import Carousel from "svelte-carousel";

    let personnelsData = get("personnels");
</script>

<div>
    {#await personnelsData}
        <Loading />
    {:then personnelData} 
        <!-- Mobile -->
        <div class="flex md:hidden"> 
            <Carousel>
                <div class="flex flex-wrap gap-7 justify-center items-center py-5">
                    {#each personnelData.data as data, i ("Monday" + i)}
                        {#if data.wellcenter.availableDate.includes("Monday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-wrap gap-7 justify-center items-center py-5">
                    {#each personnelData.data as data, i ("Tuesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Tuesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-wrap gap-7 justify-center items-center py-5">
                    {#each personnelData.data as data, i ("Wednesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Wednesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-wrap gap-7 justify-center items-center py-5">
                    {#each personnelData.data as data, i ("Thursday" + i)}
                        {#if data.wellcenter.availableDate.includes("Thursday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-wrap gap-7 justify-center items-center py-5">
                    {#each personnelData.data as data, i ("Friday" + i)}
                        {#if data.wellcenter.availableDate.includes("Friday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
            </Carousel>  
        </div>
        <!-- PC -->
        <div class="hiddem md:flex w-full justify-between px-40"> 
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p> วันจันทร์ </p>
                    {#each personnelData.data as data, i ("Monday" + i)}
                        {#if data.wellcenter.availableDate.includes("Monday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p> วันอังคาร </p>
                    {#each personnelData.data as data, i ("Tuesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Tuesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p> วันพุธ </p>
                    {#each personnelData.data as data, i ("Wednesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Wednesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p> วันพฤหัสบดี </p>
                    {#each personnelData.data as data, i ("Thursday" + i)}
                        {#if data.wellcenter.availableDate.includes("Thursday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p> วันศุกร์ </p>
                    {#each personnelData.data as data, i ("Friday" + i)}
                        {#if data.wellcenter.availableDate.includes("Friday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div> 
        </div>
    {/await}
</div>