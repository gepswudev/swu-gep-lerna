<script>
    import { get } from "../../lib/API/methods";
    import CounselorCard from "./CounselorCard.svelte";
    import Loading from "../../components/Loading.svelte"
    import Carousel from "svelte-carousel";
    import {IconMessage, IconUsers, IconHeartbeat, IconWorld, IconSchool} from "@tabler/icons-svelte";

    let personnelsData = get("personnels");
</script>

<div>
    {#await personnelsData}
        <Loading />
    {:then personnelData} 
        <!-- Mobile Carousel -->
        <div class="flex lg:hidden"> 
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
        
        <!-- PC Carousel -->
        <div class="hidden lg:flex w-full justify-between pr-8 pl-8"> 
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p class="text-[24px] text-neutral"> วันจันทร์ </p>
                    {#each personnelData.data as data, i ("Monday" + i)}
                        {#if data.wellcenter.availableDate.includes("Monday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p class="text-[24px] text-neutral"> วันอังคาร </p>
                    {#each personnelData.data as data, i ("Tuesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Tuesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p class="text-[24px] text-neutral"> วันพุธ </p>
                    {#each personnelData.data as data, i ("Wednesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Wednesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p class="text-[24px] text-neutral"> วันพฤหัสบดี </p>
                    {#each personnelData.data as data, i ("Thursday" + i)}
                        {#if data.wellcenter.availableDate.includes("Thursday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-start items-center py-5">
                    <p class="text-[24px] text-neutral"> วันศุกร์ </p>
                    {#each personnelData.data as data, i ("Friday" + i)}
                        {#if data.wellcenter.availableDate.includes("Friday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div> 
        </div>

        <!-- จุดประสงค์ -->
        <div class="flex flex-col items-center"> 
            <p class="text-[36px] my-8"> จุดประสงค์ </p>
            <div class="grid grid-cols-2 lg:grid-cols-5 gap-12">
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center">
                        <IconUsers size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        เพื่อให้บริการแก่นิสิต คณาจารย์และ บุคลากรภายใน
                        มศว.และบุคคลทั่วไป
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center">
                        <IconHeartbeat size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        เพื่อช่วยให้ผู้รับบริการ
                        สามารถแก้ไข ปัญหาเกี่ยวกับสุขภาพจิต สัมพันธภาพ ความเครียด 
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center">
                        <IconWorld size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        เพื่อให้บริการ และเป็นเครือข่ายภายใน มหาวิทยาลัยศรีนครินทรวิโรฒ
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center">
                        <IconSchool size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        เพื่อส่งเสริมการแลกเปลี่ยนเรียนรู้
                        และ สร้างเครือข่ายการทํางาน
                        ในวิชาชีพการให้การปรึกษา
                        เชิงจิตวิทยาในประเทศไทย
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center">
                        <IconMessage size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        เพื่อเผยแพร่ความรู้เกี่ยวกับ
                        จิตวิทยาการปรึกษาและ
                        ความรู้เกี่ยวกับทักษะในการ 
                        นําเทคนิคต่าง ๆ ไปปฏิบัติงาน
                        ให้เกิด ประสิทธิภาพมากขึ้น
                    </p>
                </div>
            </div>
        </div>

        <!-- ขั้นตอน และ เอกสารสำคัญ -->
        <p class="text-[36px] text-neutral"> เริ่มรับคำปรึกษากับเรา </p>
        <div class="flex flex-row text-neutral">
            <div class="flex flex-col border-dashed border-2 w-[360px] pl-7 gap-6 py-7 rounded-xl">
                <div class="flex items-center">
                    <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 1 </div>
                    <p class="text-[16px] ml-6"> อ่านสิทธิของผู้มาปรึกษา  </p>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 2 </div>
                    <p class="text-[16px] ml-6"> ดูตารางวันเวลาที่สะดวกเข้ารับปรึกษา </p>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 3 </div>
                    <p class="text-[16px] ml-6"> Scan ลงทะเบียนเข้ารับปรึกษา </p>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 4 </div>
                    <p class="text-[16px] ml-6"> เข้ารับการปรึกษา </p>
                </div>
                <div class="flex items-center">
                    <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 5 </div>
                    <p class="text-[16px] ml-6"> Scan แบบประเมินผลเข้ารับการปรึกษา </p>
                </div>
            </div>
            <div>
                <div class="w-[595px] h-[120px] bg-info rounded-3xl">
                    <p class="text-neutral"> เอกสารสำคัญ </p>
                    <p class="text-neutral"> สิทธิของผู้มาปรึกษา </p>
                    <p class="text-neutral"> โปรดอ่าน </p>
                </div>
                <div></div>
            </div>
        </div>
    {/await}
</div>