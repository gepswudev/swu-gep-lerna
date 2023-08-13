<script>
  import lang from "../../lib/lang";
  import getImg from "../../lib/getImg";
  import { get } from "../../lib/API/methods";
  import { navigate } from "svelte-routing";
  import swa from "../../lib/popalert";

  export let data;

  let display = lang() || "th";

  const viewActivityHandler = () => {
    if(!data.href) return;
    get("activities/view/" + data._id).then((res) => {
      console.log(res);
      if(data.href){
        const redirect = window.open(data.href, "_blank");
        try{
          redirect.focus();
        }catch(e){
          swa({
            icon: "error",
            title: "Pop-up blocked by browser!",
            text: "Please allow Pop-up and try again!",
          });
        }
      }
    });
  };
</script>

{#if display === "th"}
  <button
    class="p-8 flex flex-col hover:shadow-2xl hover:rounded-xl bg-transparent text-start justify-between"
    on:click={viewActivityHandler}
  >
    <img
      src={getImg(data.img)}
      alt={data.title + "_IMG"}
      class="h-[19.5rem] rounded-lg"
    />
    <p class="my-2 text-neutral">
      
      {(data.desc === "" ? data.title : data.desc).substring(0, 80)}
    </p>
    <div class="flex flex-row justify-between">
      <p class="text-neutral text-sm">
        {new Date(data.createAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {#if data.href}
      <p class="text-neutral text-sm">{data.view} ผู้เข้าชม</p>
      {/if}
    </div>
  </button>
{:else}
  <button
    class="p-8 flex flex-col hover:shadow-2xl hover:rounded-xl bg-transparent text-start justify-between"
    on:click={viewActivityHandler}
  >
    <img
      src={getImg(data.img)}
      alt={data.title + "_IMG"}
      class="h-[19.5rem] rounded-lg"
    />
    <p class="my-2 text-neutral">
      {(data.desc === "" ? data.title : data.desc).substring(0, 80)}
    </p>
    <div class="flex flex-row justify-between">
      <p class="text-neutral text-sm">
        {new Date(data.createAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {#if data.href}
      <p class="text-neutral text-sm">
        {data.view > 1 ? data.view + " views" : data.view + " view"}
      </p>
      {/if}
    </div>
  </button>
{/if}
