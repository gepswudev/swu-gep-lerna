<script>
  import getFile from "../../lib/getFile";
  import lang from "../../lib/lang";

    
</script>

{#if lang() === "th"}
<main class="mx-auto px-16 py-6">
  <h2
    class="text-3xl text-primary font-bold [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]"
  >
    หลักสูตรสาขาจิตวิทยาและแนะแนว
  </h2>
  <p class="ml-12 mt-4 text-xl">
    ความกว้างขวางและความลุ่มลึกของการศึกษาด้านศักยภาพมนุษย์นำไปสู่เป้าหมาย ของการพัฒนามนุษย์และสังคมอย่างสมบูรณ์
  </p>
  <div class="w-full my-4 flex flex-col items-center justify-center">
    <div class="ml-16 md:ml-0 flex flex-col gap-10">
        <div class="text-lg">
          <p class="text-red-500 underline py-2">ระดับปริญญาตรี</p>
          <div class="pl-4">
            <p class="pt-1">ภาษาไทย : การศึกษาบัณฑิต (กศ.บ) <span class="text-primary">(จิตวิทยาและการแนะแนว)</span></p>
            <p class="pt-1">English : Bacherlor of Education (B.Ed.) (Guidance Psychology)</p>
          </div>
        </div>
    
        <div class="text-lg">
            <p class="text-red-500 underline py-2">ระดับปริญญาโท</p>
            <div class="pl-4">
              <p class="pt-1">ภาษาไทย : การศึกษามหาบัณฑิต (กศ.ม.) <span class="text-primary">(จิตวิทยาการแนะแนว)</span></p>
              <p class="pt-1">English : Master of Education (M.Ed.) (Educational Psychology and Guidance)</p>
            </div>
          </div>
    
          <div class="text-lg">
            <p class="text-red-500 underline py-2">ระดับปริญญาเอก</p>
            <div class="pl-4">
              <p class="pt-1">ภาษาไทย : การศึกษาดุษฎีบัณฑิต (กศ.ด.) <span class="text-primary">(จิตวิทยาการแนะแนว)</span></p>
              <p class="pt-1">English : Doctor of Education (Ed.D.) (Educational Psychology and Guidance)</p>
            </div>
          </div>
      </div>
  </div>
</main>
{:else}
<main class="mx-auto px-16 py-6">
    <h2
      class="text-3xl text-primary font-bold [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]"
    >
    Department of guidance and education psychology
    </h2>
    <p class="ml-12 mt-4 text-xl">
    The breadth and depth of human potential education leads to the goal of comprehensive human and social development.
    </p>
    <div class="w-full my-4 flex flex-col items-center justify-center">
      <div class="ml-16 md:ml-0 flex flex-col gap-10">
          <div class="text-lg">
            <p class="text-red-500 underline py-2">Bachelor's degree</p>
            <div class="pl-4 flex flex-col">
              <a href="/" class="pt-1" >ภาษาไทย : การศึกษาบัณฑิต (กศ.บ) <span class="text-primary">(จิตวิทยาและการแนะแนว)</span></a>
              <a href="/" class="pt-1" >English : Bacherlor of Education (B.Ed.) (Guidance Psychology)</a>
            </div>
          </div>
      
          <div class="text-lg">
              <p class="text-red-500 underline py-2">Master's degree</p>
              <div class="pl-4 flex flex-col">
                <a href={getFile('M-Ed_THA.pdf')} class="pt-1 hover:text-primary hover:underline" title="Click to download pdf file.">ภาษาไทย : การศึกษามหาบัณฑิต (กศ.ม.) <span class="text-primary">(จิตวิทยาการแนะแนว)</span></a>
                <a href={getFile('M-Ed_ENG.pdf')} class="pt-1 hover:text-primary hover:underline" title="Click to download pdf file.">English : Master of Education (M.Ed.) (Educational Psychology and Guidance)</a>
              </div>
            </div>
      
            <div class="text-lg">
              <p class="text-red-500 underline py-2">Doctoral degree</p>
              <div class="pl-4 flex flex-col">
                <a href={getFile('Ed-D_THA.pdf')} class="pt-1 hover:text-primary hover:underline" title="Click to download pdf file.">ภาษาไทย : การศึกษาดุษฎีบัณฑิต (กศ.ด.) <span class="text-primary">(จิตวิทยาการแนะแนว)</span></a>
                <a href={getFile('Ed-D_ENG.pdf')} class="pt-1 hover:text-primary hover:underline" title="Click to download pdf file.">English : Doctor of Education (Ed.D.) (Educational Psychology and Guidance)</a>
              </div>
            </div>
        </div>
    </div>
  </main>
{/if}