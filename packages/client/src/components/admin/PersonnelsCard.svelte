<script>
  export let data;
  export let index;
  export let admin = false;

  const editHandler = () => {
    console.log('edit');
  }

  const deleteHandler = () => {
    console.log('delete');
  }
</script>

<div class="card card-side bg-base-100 shadow-xl">
  <figure><img src="https://fakeimg.pl/270x270" alt="Movie" /></figure>
  <div class="card-body">
    <h2 class="card-title">{data.name}</h2>
    <p>Position: {data.position}</p>
    {#if data.email}
    <p>Email: {data?.email}</p>
    {/if}
    {#if data.wellcenter.status}
      <div class="collapse join-item collapse-arrow border border-base-300">
        <input type="radio" name={`my-accordion-1`} checked="checked" />
        <div class="collapse-title text-xl font-medium">Well Center</div>
        <div class="collapse-content">
          <p>Position: {data.wellcenter?.position}</p>
          <p>Date: {data.wellcenter?.availableDate}</p>
          <p>Time: {data.wellcenter?.availableTime}</p>
        </div>
      </div>
    {/if}
    {#if admin}
      <div class="card-actions justify-end">
        <button class="btn btn-primary" on:click={editHandler}>Edit</button>
        <button class="btn btn-error" on:click={deleteHandler}>Delete</button>
      </div>
    {/if}
  </div>
</div>
