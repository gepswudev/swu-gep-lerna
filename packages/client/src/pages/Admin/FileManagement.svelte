<script>
  import FileUpload from "../../components/form/admin/File/create.svelte";
  import File from "../../components//form/admin/File/file.svelte";
  import { get } from "../../lib/API/methods";
  import { navigate } from "svelte-routing";
  import { user } from "../../store/user";

  const files = get("getfile");
  let searchTerm = "";
  function searchData(dataArray, searchTerm) {
    // Filter the dataArray based on the search term
    const filteredData = dataArray.filter((item) => {
      // Convert name and searchTerm to lowercase for case-insensitive search
      const itemName = item.name.toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();

      // Check if the name includes the search term
      return itemName.includes(lowerSearchTerm);
    });

    return filteredData;
  }
</script>

{#key $user}
  {#if $user !== null}
    {#if $user?.role === "admin"}
      {#await files}
        <div class="m-24 justify-center">
          <h1 class="my-4 text-4xl font-bold text-center">File Management</h1>
          <FileUpload />

          <div class="mockup-window border bg-base-100">
            <div class="flex justify-center px-4 py-16 bg-base-200">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th />
                    <th>File</th>
                    <th>Copy</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-base-200">
                    <th>0</th>
                    <td>Loading file...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      {:then filedata}
        <div class="m-24 justify-center">
          <h1 class="my-4 text-4xl font-bold text-center">File Management</h1>
          <FileUpload />
          <div class="mockup-window border border-primary bg-base-100">
            <div
              class="flex flex-col justify-center px-4 py-16 pt-8 bg-base-200"
            >
              <input
                bind:value={searchTerm}
                type="text"
                placeholder="Search file here (You can search by File Name, File type, Created Date, Modified Date)"
                class="input input-bordered w-full mb-12"
              />
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th />
                    <th>File</th>
                    <th>Type</th>
                    <th>Upload At</th>
                    <th>Usage</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {#each filedata.data as data, index (index)}
                    {#if data.name.includes(searchTerm) || data.ext.includes(searchTerm) || data.modified.includes(searchTerm) || data.created.includes(searchTerm)}
                      <File {data} {index} />
                    {/if}
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      {/await}
    {:else}
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col text-center">
          <div class="max-w-xl">
            <h1 class="text-5xl font-bold">You are not admin!</h1>
            <button
              class="btn btn-primary mt-12"
              on:click={() => navigate("/login")}>Login</button
            >
          </div>
        </div>
      </div>
    {/if}
  {:else}
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col text-center">
        <div class="max-w-xl">
          <h1 class="text-5xl font-bold">Checking your access!</h1>
          <p class="py-6">Please wait...</p>
          <!-- Loding animation -->
          <div
            class="loading ease-linear rounded-full border-8 border-t-8 border-primary bg-primary h-32 w-32"
          />

          <br />
          <button
            class="btn btn-primary mt-12"
            on:click={() => navigate("/login")}>Login</button
          >
          <p class="text-md m-2">Not logged in?</p>
        </div>
      </div>
    </div>
  {/if}
{/key}
