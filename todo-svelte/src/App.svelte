<script>
  import { onMount } from "svelte";

  import todoApi from "./todo/todo.api";
  import todoStore from "./todo/todo.store";

  let edit = {};
  let name = "";
  let isLoading = false;

  $: todos = $todoStore.todos;

  $: console.log(todos);

  const onDone = (id, status) => {
    isLoading = true;
    todoApi
      .change(id, { is_done: status })
      .then(() => {
        edit = {};
        loadTodos();
      })
      .catch(console.error)
      .finally(() => (isLoading = false));
  };

  const onSave = () => {
    isLoading = true;
    todoApi
      .change(edit.id, { name: edit.name })
      .then(() => {
        edit = {};
        loadTodos();
      })
      .catch(console.error)
      .finally(() => (isLoading = false));
  };

  const onSubmit = () => {
    isLoading = true;
    todoApi
      .create({ name })
      .then(() => {
        name = "";
        loadTodos();
      })
      .catch(console.error)
      .finally(() => (isLoading = false));
  };

  const loadTodos = () => {
    isLoading = true;
    todoApi
      .fetch()
      .then((response) => response.data)
      .then((response) => todoStore.setTodos(response.data))
      .catch(console.error)
      .finally(() => (isLoading = false));
  };

  onMount(() => {
    loadTodos();
  });
</script>

<div class="container">
  <form action="" class="mb-3" on:submit|preventDefault={onSubmit}>
    <div class="form-group mb-2">
      <label for="" />
      <input type="text" name="name" bind:value={name} class="form-control" />
    </div>
    <button class="btn btn-primary w-100" disabled={isLoading}> Add </button>
  </form>
  {#each todos as todo}
    <div
      class="card mb-3"
      on:click={() => {
        edit = todo;
      }}
    >
      <div class="card-body d-flex align-items-center">
        <div class="pe-2">
          <input
            type="checkbox"
            checked={todo.is_done}
            on:click={() => onDone(todo.id, !todo.is_done)}
          />
        </div>
        <div class="flex-grow-1">
          {#if edit.id === todo.id}
            <input
              type="text"
              on:blur={onSave}
              bind:value={edit.name}
              class="form-control"
            />
          {:else}
            {todo.name}
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>
