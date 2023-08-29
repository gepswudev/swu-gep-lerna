<script>
  import lang from "../../lib/lang";
  import getImg from "../../lib/getImg";
  import { get } from "../../lib/API/methods";
  import swa from "../../lib/popalert";

  export let data;
  export let sx = "";

  let display = lang() || "th";

  const viewActivityHandler = () => {
    if (!data.href) return;
    get("activities/view/" + data._id).then((res) => {

      if (data.href) {
        const redirect = window.open(data.href, "_blank");
        try {
          redirect.focus();
        } catch (e) {
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
<button class={"btn btn-ghost w-48 h-full mx-0 "+" "+sx}>
  <img src={getImg(data.img)} alt={`${data.title} Image preview`} class="w-48 h-32 object-cover rounded-xl">
  <p class="text-neutral text-start my-2 font-normal text-">{(data.desc === "" ? data.title : data.desc).substring(0, 40)}</p>

</button>
{:else}
{#if data.engDesc === "" || data.engDesc === null || data.engDesc === undefined || data.engTitle === "" || data.engTitle === null || data.engTitle === undefined}
<button class={"btn btn-ghost w-48 h-full mx-0 "+" "+sx}>
  <img src={getImg(data.img)} alt={`${data.title} Image preview`} class="w-48 h-32 object-cover rounded-xl">
  <p class="text-neutral text-start my-2 font-normal text-">{(data.desc === "" ? data.ttitle : data.engDesc).substring(0, 40)}</p>

</button>
{:else}
<button class={"btn btn-ghost w-48 h-full mx-0 "+" "+sx}>
  <img src={getImg(data.img)} alt={`${data.engTitle} Image preview`} class="w-48 h-32 object-cover rounded-xl">
  <p class="text-neutral text-start my-2 font-normal text-">{(data.engDesc === "" ? data.engTitle : data.engDesc).substring(0, 40)}</p>

</button>
{/if}
{/if}
