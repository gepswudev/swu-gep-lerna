<script>
    import { get } from "../../lib/API/methods";
    import CounselorCard from "./CounselorCard.svelte";
    import Loading from "../../components/Loading.svelte"
    import Carousel from "svelte-carousel";
    import {IconMessage, IconUsers, IconHeartbeat, IconWorld, IconSchool, IconHeartHandshake} from "@tabler/icons-svelte";
    import EvaluateQr from "./evaluateQrcode1.png"
    import RegisQr from "./regisQrcode1.png"
    import FacebookIcon from "./facebook.svg"
    import ObjectiveBg from "./WellCenterObjBg.png"
    import Header from "./WellCenterHeader.png"

    let personnelsData = get("personnels");
</script>

<div>
    {#await personnelsData}
        <Loading />
    {:then personnelData} 
        <img src={Header} alt="" class="bg-cover">

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
        <div class="flex flex-col items-center bg-cover bg-center w-full py-24" style="background-image: url({ObjectiveBg});"> 
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
        <div class="flex flex-col py-24 w-screen justify-center text-neutral bg-gradient-to-t from-[#00A2E0] to-white">
            <div class="flex flex-row text-neutral justify-center gap-32">
                <div class="flex flex-col justify-center">
                    <div class="flex w-full justify-center items-center">
                        <p class="text-[36px] text-neutral my-8"> เริ่มรับคำปรึกษากับเรา </p>
                    </div>
                    <div class="flex flex-col border-dashed border-2 w-[360px] pl-7 py-7 gap-6 justify-center rounded-xl border-[#9747FF]">
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
                </div>
                <div class="mt-64">
                    <div class="flex flex-row w-[595px] h-[120px] bg-info rounded-3xl justify-center items-center relative">
                        <div class="flex flex-col text-neutral justify-center items-center text-[8px] font-bold absolute left-8">
                            <IconHeartHandshake size=72 class="stroke-1"/>
                            <p> ศูนย์ให้คำปรึกษา </p>
                            <p> W.E.L.L. Center </p>
                            <p> มศว </p>
                        </div>
                        <div class="flex flex-col text-center ">
                            <p class="text-neutral text-[20px] font-bold"> เอกสารสำคัญ </p>
                            <p class="text-neutral text-[28px] font-bold"> สิทธิของผู้มาปรึกษา </p>
                            <p class="text-neutral text-[20px] font-bold"> โปรดอ่าน </p>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-center mx-8 mt-8">
                        <div class="flex flex-col items-center">
                            <img src={FacebookIcon} alt="" class="mb-4">
                            <p> ศูนย์ให้คำปรึกษา </p>
                            <p> W.E.L.L. Center มศว </p>
                        </div>
                        <div>
                            <div class="flex bg-[#FF7171] w-[180px] h-[180px] justify-center items-center rounded-xl">
                                <img src={RegisQr} alt="" class="w-[156px] h-[156px] ">
                            </div>
                            <div class="flex bg-[#FF7171] w-[180px] h-fit justify-center items-center rounded-full mt-4">
                                <p class="text-[16px] text-base-100"> ลงทะเบียน Click </p>
                            </div>
                        </div>
                        <div>
                            <div class="flex bg-[#FFBE71] w-[180px] h-[180px] justify-center items-center rounded-xl">
                                <img src={EvaluateQr} alt="" class="w-[156px] h-[156px] ">
                            </div>
                            <div class="flex bg-[#FFBE71] w-[180px] h-fit justify-center items-center rounded-full mt-4">
                                <p class="text-[16px] text-base-100"> ประเมิน Click </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/await}
</div>