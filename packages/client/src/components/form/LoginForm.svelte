<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { post } from "../../lib/API/method";
  import { user } from "../../store/user";
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Username is required")
        .max(16, "Username must be at most 16 characters"),
      password: yup
        .string()
        .required("Password is required")
    }),
    onSubmit: (values) => {
      post("users/login", values)
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            user.set({
              username: res.data.username,
              token: res.data.token,
              role: res.data.role,
              loginAt: new Date().toLocaleString(),
            });
          } else {
            alert(JSON.stringify(res.message));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
</script>

<form
  class="w-64 my-12 mx-auto p-4 space-y-4 bg-gray-100 border rounded shadow-md"
  on:submit|preventDefault={handleSubmit}
>
  <label for="username" class="font-bold">Username</label>
  <input
    id="username"
    name="username"
    type="text"
    on:change={handleChange}
    bind:value={$form.username}
    class="w-full p-2 border border-gray-300 rounded"
    placeholder="Enter your username"
  />
  {#if $errors.username}
    <p class="text-red-500">{$errors.username}</p>
  {/if}

  <label for="password" class="font-bold">Password</label>
  <input
    id="password"
    name="password"
    type="password"
    on:change={handleChange}
    bind:value={$form.password}
    class="w-full p-2 border border-gray-300 rounded"
    placeholder="Enter your password"
  />
  {#if $errors.password}
    <p class="text-red-500">{$errors.password}</p>
  {/if}
  <button
    type="submit"
    class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >Login</button
  ><label for="username" class="font-bold">Test account</label>
  <input
    type="text"
    class="w-full p-2 border border-gray-300 rounded"
    value="test1"
    readonly
  />
  <input
    type="text"
    class="w-full p-2 border border-gray-300 rounded"
    value="test1"
    readonly
  />
</form>