<script>
  import { navigate } from "svelte-routing";
  import { post } from "../../../../lib/API/methods";
  import swa from "../../../../lib/popalert";
  export let sx = "";
  let form;
  let submitButton;
  let err = { file: ""};
  let validated = false;
  const fileSize = 500000000;

  //form validation function
  const formValidate = () => {
    const formData = new FormData(form);
    const file = formData.get("fileupload");


    err = { ...err, file:""};

    //check file can't be empty and must be file and size must be less than 10MB
    if (file.size > fileSize) {
      err = {
        ...err,
        file: `Image size must be less than ${fileSize / 500000000} MB`,
      };
    }
    
    //check is filename is english
    const format = /^[A-Za-z0-9_.,()\-\s]*$/;

     if (!format.test(file.name)) {
       err = {
         ...err,
         file: "File name must contain only English characters, digits, underscores, commas, parentheses, dashes, periods, and whitespaces., Please rename file follow the rules and try again",
       };
     }

    //check file name
    if (file.name === "") {
      err = { ...err, file: "File is required" };
    }

    //check if form is validated
    validated = Object.values(err).every((e) => e === "");

    //disable submit button if form is not validated
    submitButton.disabled = !validated;
  };

  //submit form function
  const handlerSubmit = () => {
    //get form data
    const formData = new FormData(form);
    const fileupload = formData.get("fileupload");
    //change button while creating
    submitButton.innerHTML = "Uploading...";
    submitButton.disabled = true;

    //send data to server
     post("filesys", {fileupload}, {
       "Content-Type": "multipart/form-data",
       Authorization: "Bearer " + localStorage.getItem("token"),
     })
       .then((res) => {

         swa({
           icon: res.status,
           title: res.status,
           text: res.message,
           timer: 3000,
         },() => {
           submitButton.innerHTML = "Upload";
           submitButton.disabled = false;
           location.reload();
         });
       })
       .catch((err) => {
         console.log(err);
       });
  };
</script>

<form
  class={"flex flex-rows items-baseline w-full gap-2" + sx}
  accept-charset="UTF-8"
  bind:this={form}
  on:submit|preventDefault={handlerSubmit}
  on:change={formValidate}
>
  
  <div class="mb-4 flex grow flex-row">
    <input
      class="file-input file-input-bordered file-input-primary w-full"
      type="file"
      name="fileupload"
      id="fileupload"
      required
    />
    
  </div>

  <div class="mt-2">
    <button
      bind:this={submitButton}
      type="submit"
      disabled
      class="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 disabled:btn-loading"
      >Upload</button
    >
  </div>
  
</form>
{#if err.file}
      <p class="text-red-500">&nbsp; &nbsp;*{err.file}</p>
    {/if}