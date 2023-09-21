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
  <button
    class={"p-4 md:p-8 flex flex-col max-w-md hover:shadow-2xl hover:rounded-xl bg-transparent text-start justify-between" + " " + sx}
    on:click={viewActivityHandler}
  >
    <img
      src={getImg(data.img)}
      alt={data.title + "_IMG"}
      class="w-full rounded-lg object-cover"
      loading="lazy"
    />
    <p class="md:hidden my-2 text-neutral">
      {(data.desc === "" ? data.title : data.desc).substring(0, 40)}
    </p>
    <p class="hidden md:block my-2 text-neutral">
      {(data.desc === "" ? data.title : data.desc).substring(0, 80)}
    </p>
    <div class="hidden md:flex flex-row justify-between gap-32">
      <p class="text-neutral text-sm">
        {new Date(data.createAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {#if data.href && data.views}
        <p class="text-neutral text-sm">
          {data.views >= 1 ? data.views + " ผู้เข้าชม" : "ไม่มีผู้เช้าชม"}
        </p>
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
      class="w-full rounded-lg object-cover"
      loading="lazy"
    />
    {#if data.engDesc && data.engDesc !== "" && data.engDesc !== " " || data.engTitle && data.engTitle !== "" && data.engTitle !== " "}
    <p class="md:hidden my-2 text-neutral">
      {(data.engDesc === "" ? data.engTitle : data.engDesc).substring(0, 30)}
    </p>
    <p class="hidden md:block my-2 text-neutral">
      {(data.engDesc === "" ? data.engTitle : data.engDesc).substring(0, 80)}
    </p>
    {:else}
    <p class="md:hidden my-2 text-neutral">
      {(data.desc === "" ? data.title : data.desc).substring(0, 30)}
    </p>
    <p class="hidden md:block my-2 text-neutral">
      {(data.desc === "" ? data.title : data.desc).substring(0, 80)}
    </p>
    {/if}
    <div class="flex flex-row justify-between">
      <p class="text-neutral text-sm">
        {new Date(data.createAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {#if data.href && data.views}
        <p class="text-neutral text-sm">
          {data.views > 1 ? data.views + " views" : data.views + " view"}
        </p>
      {/if}
    </div>
  </button>
{/if}

