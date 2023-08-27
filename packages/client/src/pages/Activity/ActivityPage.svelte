<script>
    import ActivityLayout from "../../components/activities/ActivityLayout.svelte";
  import lang from "../../lib/lang";
</script>

<div class="min-h-screen bg-base-100 mx-auto mb-0">
    <h3 class="my-12 text-center text-3xl font-bold text-primary drop-shadow-xl  shadow-neutral">{lang() === "th" ? "ประมวลผลภาพกิจกรรม" : "Activities"}</h3>
    <ActivityLayout title={false} sx={"mt-4"}/>
</div>