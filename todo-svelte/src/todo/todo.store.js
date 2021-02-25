import { writable } from "svelte/store";

const createStore = () => {
  const { set, update, subscribe } = writable({
    todos: [],
  });

  const setTodos = (todos) =>
    update((p) => ({
      ...p,
      todos,
    }));

  return {
    setTodos,
    subscribe,
    set,
    update,
  };
};

export default createStore();
