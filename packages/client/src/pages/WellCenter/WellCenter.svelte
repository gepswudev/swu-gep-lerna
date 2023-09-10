<script>
    import { get } from "../../lib/API/methods";
    import getFile from "../../lib/getFile";
    import CounselorCard from "./CounselorCard.svelte";
    import Loading from "../../components/Loading.svelte"
    import Carousel from "svelte-carousel";
    import {IconMessage, IconUsers, IconHeartbeat, IconWorld, IconSchool, IconHeartHandshake} from "@tabler/icons-svelte";
    import EvaluateQr from "./evaluateQrcode1.png"
    import RegisQr from "./regisQrcode1.png"
    import FacebookIcon from "./facebook.svg"
    import ObjectiveBg from "./WellCenterObjBg.png"
    import Header from "./WellCenterHeader.png"
    import lang from "../../lib/lang";

    let personnelsData = get("personnels");
</script>

<div class="">
    {#await personnelsData}
        <Loading />
    {:then personnelData} 
        <!-- Header -->
        
        <img src={Header} alt="" class="relative lg:bg-cover object-fill scale-[2.5] scale-x-[3.5] md:scale-125 w-[250vw] overflow-hidden z-0">
        <!-- WELL CENTER ICON ON MOBILE -->
        <div class="z-50 flex flex-col items-center text-[12px] font-bold md:hidden ">
            <div class="flex justify-center items-center bg-[#7bd7ff] rounded-full w-[90px] h-[90px] mb-2">
                <IconHeartHandshake class="stroke-1 w-[15rem] h-[15rem]"/>
            </div>
            <p> {lang() === "th" ? "ศูนย์ให้คำปรึกษา" : "Consultation Center"}  </p>
            <p> {lang() === "th" ? "W.E.L.L CENTER" : "W.E.L.L CENTER"} </p>
        </div>

        <!-- Mobile Carousel -->
        <div class="flex lg:hidden"> 
            <Carousel>
                <div class="flex flex-col flex-wrap gap-7 justify-center items-center py-5">
                    <p class="text-[24px] text-neutral">
                        {lang() === "th" ? "วันจันทร์" : "Monday"}
                    </p>
                    {#each personnelData.data as data, i ("Monday" + i)}
                        {#if data.wellcenter.availableDate.includes("Monday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-center items-center py-5">
                    <p class="text-[24px] text-neutral">
                        {lang() === "th" ? "วันอังคาร" : "Tuesday"} 
                    </p>
                    {#each personnelData.data as data, i ("Tuesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Tuesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-center items-center py-5">
                    <p class="text-[24px] text-neutral"> 
                        {lang() === "th" ? "วันพุธ" : "Wednesday"} 
                    </p>
                    {#each personnelData.data as data, i ("Wednesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Wednesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-center items-center py-5">
                    <p class="text-[24px] text-neutral"> 
                        {lang() === "th" ? "วันพฤหัสบดี" : "Thursday"} 
                    </p>
                    {#each personnelData.data as data, i ("Thursday" + i)}
                        {#if data.wellcenter.availableDate.includes("Thursday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 justify-center items-center py-5">
                    <p class="text-[24px] text-neutral"> 
                        {lang() === "th" ? "วันศุกร์" : "Friday"} 
                    </p>
                    {#each personnelData.data as data, i ("Friday" + i)}
                        {#if data.wellcenter.availableDate.includes("Friday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
            </Carousel>  
        </div>
        
        <!-- PC Carousel -->
        <div class="hidden lg:flex w-full justify-center gap-8 mx-4 mr-8"> 
                <div class="flex flex-col flex-wrap gap-7 px-2 rounded-md justify-start items-center py-5 hover:bg-primary/5 hover:px-32 duration-500">
                    <p class="text-[24px] text-neutral">
                        {lang() === "th" ? "วันจันทร์" : "Monday"}
                    </p>
                    {#each personnelData.data as data, i ("Monday" + i)}
                        {#if data.wellcenter.availableDate.includes("Monday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 px-2 rounded-md justify-start items-center py-5 hover:bg-primary/5 hover:px-32 duration-500">
                    <p class="text-[24px] text-neutral">
                        {lang() === "th" ? "วันอังคาร" : "Tuesday"} 
                    </p>
                    {#each personnelData.data as data, i ("Tuesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Tuesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 px-2 rounded-md justify-start items-center py-5 hover:bg-primary/5 hover:px-32 duration-500">
                    <p class="text-[24px] text-neutral"> 
                        {lang() === "th" ? "วันพุธ" : "Wednesday"} 
                    </p>
                    {#each personnelData.data as data, i ("Wednesday" + i)}
                        {#if data.wellcenter.availableDate.includes("Wednesday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 px-2 rounded-md justify-start items-center py-5 hover:bg-primary/5 hover:px-32 duration-500">
                    <p class="text-[24px] text-neutral"> 
                        {lang() === "th" ? "วันพฤหัสบดี" : "Thursday"} 
                    </p>
                    {#each personnelData.data as data, i ("Thursday" + i)}
                        {#if data.wellcenter.availableDate.includes("Thursday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div>
                <div class="flex flex-col flex-wrap gap-7 px-2 rounded-md justify-start items-center py-5 hover:bg-primary/5 hover:px-32 duration-500">
                    <p class="text-[24px] text-neutral"> 
                        {lang() === "th" ? "วันศุกร์" : "Friday"} 
                    </p>
                    {#each personnelData.data as data, i ("Friday" + i)}
                        {#if data.wellcenter.availableDate.includes("Friday")}
                            <CounselorCard {data}/>
                        {/if}
                    {/each}
                </div> 
        </div>

        <!-- จุดประสงค์ -->
        <div class="flex flex-col items-center py-24 w-screen bg-gradient-to-b from-primary/5" > 
            <p class="text-[36px] my-8">
                {lang() === "th" ? "จุดประสงค์" : "Objective"}
            </p>
            
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center hover:bg-primary duration-1000">
                        <IconUsers size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        {lang() === "th" ? "เพื่อให้บริการแก่นิสิต คณาจารย์และบุคลากรภายในมศวและบุคคลทั่วไป" : 
                        "Provide service for students, professors, and staff within SWU and the general public."}
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center hover:bg-primary duration-1000">
                        <IconHeartbeat size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        {lang() === "th" ? "เพื่อช่วยให้ผู้รับบริการ สามารถแก้ไข ปัญหาเกี่ยวกับสุขภาพจิต สัมพันธภาพ ความเครียด" : 
                        "To help our service recipients solve problems related to mental health, relationships, stress, study, work, family, etc."}
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center hover:bg-primary duration-1000">
                        <IconWorld size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        {lang() === "th" ? "เพื่อให้บริการ และเป็นเครือข่ายภายใน มหาวิทยาลัยศรีนครินทรวิโรฒ" : 
                        "To provide services and internal networks within Srinakharinwirot University."}
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center hover:bg-primary duration-1000">
                        <IconSchool size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        {lang() === "th" ? "เพื่อส่งเสริมการแลกเปลี่ยนเรียนรู้ และ สร้างเครือข่ายการทํางาน ในวิชาชีพการให้การปรึกษา เชิงจิตวิทยาในประเทศไทย" : 
                        "To Encourage the exchange of knowledge and networking in the profession of psychological counseling in Thailand."}
                    </p>
                </div>
                <div class="flex flex-col w-[200px] h-fit justify-center items-center">
                    <div class="flex bg-gray w-[82px] h-[82px] rounded-3xl py-2 px-2 justify-center items-center hover:bg-primary duration-1000">
                        <IconMessage size=42/>
                    </div>
                    <p class="text-[16px] text-center pt-8">
                        {lang() === "th" ? "เพื่อเผยแพร่ความรู้เกี่ยวกับจิตวิทยาการปรึกษาและความรู้เกี่ยวกับทักษะในการนําเทคนิคต่าง ๆ ไปปฏิบัติงานให้เกิด ประสิทธิภาพมากขึ้น" : 
                        "To share knowledge about psychology, consultation, and knowledge skills in adapting techniques with work more efficiently."}
                    </p>
                </div>
            </div>
        </div>

        <!-- ขั้นตอน และ เอกสารสำคัญ -->
        <div class="flex flex-col py-24 w-screen justify-center text-neutral bg-gradient-to-t from-[#00A2E0] to-white">
            <div class="flex flex-col md:flex-row text-neutral justify-center items-center gap-32">
                <div class="flex flex-col justify-center">
                    <div class="flex w-full justify-center items-center">
                        <p class="text-[36px] text-neutral my-8">
                            {lang() === "th" ? "เริ่มรับคำปรึกษากับเรา" : "Let's consult with us!"}                              
                        </p>
                    </div>
                    <div class="flex flex-col border-dashed border-2 w-[360px] pl-7 py-7 gap-6 justify-center rounded-xl border-[#9747FF]">
                        <div class="flex items-center hover:bg-neutral/5 hover:py-4 hover:px-2 hover:rounded-xl duration-500">
                            <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 1 </div>
                            <p class="text-[16px] ml-6 hover:underline hover:scale-105  duration-700"> 
                                {lang() === "th" ? "อ่านสิทธิของผู้มาปรึกษา" : "Reviewing Advisor's Rights."}
                            </p>
                        </div>
                        <div class="flex items-center hover:bg-neutral/5 hover:py-4 hover:px-2 hover:rounded-xl duration-500">
                            <div class="flex items-center justify-center rounded-full min-w-[38px] w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 2 </div>
                            <p class="text-[16px] ml-6 hover:underline hover:scale-105  duration-700"> 
                                {lang() === "th" ? "ดูตารางวันเวลาที่สะดวกเข้ารับปรึกษา" : "Check a convenient schedule for consultation."}
                            </p>
                        </div>
                        <div class="flex items-center hover:bg-neutral/5 hover:py-4 hover:px-2 hover:rounded-xl duration-500">
                            <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 3 </div>
                            <p class="text-[16px] ml-6 hover:underline hover:scale-105  duration-700"> 
                                {lang() === "th" ? "สแกนลงทะเบียนเข้ารับปรึกษา" : "Scan qr code for consult."}
                            </p>
                        </div>
                        <div class="flex items-center hover:bg-neutral/5 hover:py-4 hover:px-2 hover:rounded-xl duration-500">
                            <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 4 </div>
                            <p class="text-[16px] ml-6 hover:underline hover:scale-105  duration-700"> 
                                {lang() === "th" ? "เข้ารับการปรึกษา" : "Receive Counseling."}
                            </p>
                        </div>
                        <div class="flex items-center hover:bg-neutral/5 hover:py-4 hover:px-2 hover:rounded-xl duration-500">
                            <div class="flex items-center justify-center rounded-full w-[38px] h-[38px] bg-white border-black border-2 text-[14px]"> 5 </div>
                            <p class="text-[16px] ml-6 hover:underline hover:scale-105  duration-700"> 
                                {lang() === "th" ? "สแกนแบบประเมินผลเข้ารับการปรึกษา" : "Scan for evaluated for consultation."} 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mt-0 md:mt-64">
                    <a href={getFile('WELLCENTER_CONSENT.pdf')} class="flex flex-row w-[360px] md:w-[595px] h-[120px] bg-info rounded-3xl justify-center items-center gap-12 md:gap-0 md:relative hover:scale-105 duration-500">
                        <div class="flex flex-col text-neutral justify-center items-center text-[8px] font-bold md:absolute left-3 md:left-8">
                            <IconHeartHandshake class="stroke-1 w-[64px] h-[64px] md:w-[72px] md:h-[72px]"/>
                            <p> {lang() === "th" ? "ศูนย์ให้คำปรึกษา" : "Consultation Center"}  </p>
                            <p> W.E.L.L Center </p>
                            <p> {lang() === "th" ? "มศว" : "SWU"} </p>
                        </div>
                        <div  class="flex flex-col text-center">
                            <p class="text-neutral text-[16px] md:text-[20px] font-bold">
                                {lang() === "th" ? "เอกสารสำคัญ" : "Important document"}
                            </p>
                            <p class="text-neutral text-[20px] md:text-[28px] font-bold"> 
                                {lang() === "th" ? "สิทธิของผู้มาปรึกษา" : "Counselee's Right"} 
                            </p>
                            <p class="text-neutral text-[16px] md:text-[20px] font-bold"> 
                                {lang() === "th" ? "โปรดอ่าน" : "Please Reviewing"}  
                            </p>
                        </div>
                    </a>
                    <div class="flex flex-col md:flex-row justify-between items-center mx-8 mt-8 text-[14px] gap-8">
                        <a href="https://web.facebook.com/W.E.L.L.Center.SWU/?locale=th_TH&_rdc=1&_rdr" class="flex flex-col items-center hover:scale-110 duration-500">
                            <img src={FacebookIcon} alt="" class="mb-4">
                            <p> {lang() === "th" ? "ศูนย์ให้คำปรึกษา" : "Consultation Center"}  </p>
                            <p> {lang() === "th" ? "W.E.L.L Center มศว" : "W.E.L.L Center SWU"} </p>
                        </a>
                        <div>
                            <a href="https://goo.gl/forms/1yc3zS2CFVndvoJt1" class="flex bg-[#FF7171] w-[180px] h-[180px] justify-center items-center rounded-xl hover:scale-110 duration-500">
                                <img src={RegisQr} alt="" class="w-[156px] h-[156px] ">
                            </a>
                            <a href="https://goo.gl/forms/1yc3zS2CFVndvoJt1" class="flex bg-[#FF7171] w-[180px] h-fit justify-center items-center rounded-full mt-4 hover:scale-110 duration-500">
                                <p class="text-[16px] text-base-100"> 
                                    {lang() === "th" ? "ลงทะเบียน Click" : "Register Click!"} 
                                </p>
                            </a>
                        </div>
                        <div>
                            <a href="https://goo.gl/forms/Qs69vJln1HmhFnqM2" class="flex bg-[#FFBE71] w-[180px] h-[180px] justify-center items-center rounded-xl hover:scale-110 duration-500">
                                <img src={EvaluateQr} alt="" class="w-[156px] h-[156px] ">
                            </a>
                            <a href="https://goo.gl/forms/Qs69vJln1HmhFnqM2" class="flex bg-[#FFBE71] w-[180px] h-fit justify-center items-center rounded-full mt-4 hover:scale-110 duration-500">
                                <p class="text-[16px] text-base-100"> 
                                    {lang() === "th" ? "ประเมิน Click" : "Evaluate Click!"} 
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/await}
</div>