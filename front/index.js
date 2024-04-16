import { createCustomElement } from "./lib/dom.js";
import { fetchData } from "./lib/fetch.js";
import { TodoList } from "./component/TodoList.js";
// appel api

const routeAllTodo = "/todo-list";

try {
  const todoListTab = await fetchData({ route: routeAllTodo });
  //   console.log(todoListTab);
  const todoList = document.querySelector("#todolist");
  //   console.log(todoList);
  const list = new TodoList(todoListTab);
  list.appendTo(todoList);
} catch (error) {
  const alertFetch = createCustomElement({
    tag: "div",
    attributes: {
      class: "alert alert-danger m-2",
      role: "alert",
    },
  });
  alertFetch.innerText = "Impossible de charger la ToDo liste";
  document.body.prepend(alertFetch);
}
