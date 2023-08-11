<script>
    import getImg from "../../lib/getImg";
    export let data;
</script>

<div class="p-8 flex flex-col hover:shadow-2xl hover:rounded-xl bg-transparent text-start justify-normal">
    <img src={getImg(data.img)} alt={data.title+"_IMG"} class="h-[19.5rem] rounded-lg"/>
    <p class="my-2 text-neutral">{(data.desc === "" ? data.title : data.desc).substring(0, 80)}</p>
  </div>
  