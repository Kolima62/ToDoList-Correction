import { createCustomElement } from "../lib/dom.js";

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} isCompleted
 */
export class TodoList {
  /**
   * @type {Todo[]}
   */
  #todos = [];

  /**
   * @type {HTMLUListElement}
   */
  #listElement;

  /**
   *
   * @param {Todo[]} todos
   */
  constructor(todos) {
    this.#todos = todos;
  }

  /**
   *
   * @param {HTMLUListElement} element
   */
  appendTo(element) {
    element.innerHTML = `<form id = "form-1" class="d-flex pb-4">
        <input
          class="form-control"
          type="text"
          placeholder="Acheter des patates..."
          name="title"
          data-com.bitwarden.browser.user-edited="yes"
        />
        <button class="btn btn-primary">Ajouter</button>
      </form>
      <main>
        <div class="btn-group mb-4" role="group">
          <button
            type="button"
            class="btn btn-outline-primary active"
            data-filter="all"
          >
            Toutes
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            data-filter="todo"
          >
            A faire
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            data-filter="done"
          >
            Faites
          </button>
        </div>

        <ul class="list-group"></ul>
      </main>`;
    this.#listElement = document.querySelector(".list-group");
    for (let todo of this.#todos) {
      const t = new TodoListItem(todo);
      this.#listElement.append(t.element);
    }
    const form = document.querySelector("#form-1");
    form.addEventListener("submit", (e) => this.#onSubmit(e));
    const buttonFilterList = document.querySelectorAll(".btn-group button");
    buttonFilterList.forEach((buttonFilter) => {
      buttonFilter.addEventListener("click", (e) => this.#toggleFilter(e));
    });
  }

  #toggleFilter(e) {
    e.preventDefault();
    const currentButton = e.currentTarget;
    currentButton.parentElement
      .querySelector(".active")
      .classList.remove("active");
    currentButton.classList.add("active");
    const filter = currentButton.getAttribute("data-filter");
    switch (filter) {
      case "todo":
        this.#listElement.classList.add("hide-completed");
        this.#listElement.classList.remove("hide-todo");
        break;
      case "done":
        this.#listElement.classList.remove("hide-completed");
        this.#listElement.classList.add("hide-todo");
        break;
      default:
        this.#listElement.classList.remove("hide-completed");
        this.#listElement.classList.remove("hide-todo");
        break;
    }
  }

  #onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const content = data.get("title").trim();
    if (content === "") return;
    const newTodo = {
      id: Date.now(),
      content,
      isCompleted: false,
    };
    // console.log(newTodo);
    const lastTodo = new TodoListItem(newTodo);
    this.#listElement.prepend(lastTodo.element);
    this.#todos = [...this.#todos, newTodo];
    form.reset();
  }
}

class TodoListItem {
  /**
   * @type {HTMLElement}
   */
  #todo;

  /**
   * @type {HTMLElement}
   */
  #element;

  /**
   *
   * @param {Todo} todo
   */

  //   contructeur des li
  constructor(todo) {
    this.#todo = todo;
    const id = `todo-${todo.id}`;
    const li = createCustomElement({
      tag: "li",
      attributes: {
        class: `todo list-group-item d-flex align-items-center",
        ${todo.isCompleted ? "is-completed" : ""}`,
      },
    });
    this.#element = li;
    const checkbox = createCustomElement({
      tag: "input",
      attributes: {
        class: "form-check-input",
        type: "checkbox",
        checked: todo.isCompleted ? "" : null,
        id,
      },
    });
    const label = createCustomElement({
      tag: "label",
      attributes: {
        class: "ms-2 form-check-label",
        for: id,
      },
    });
    label.innerText = todo.content;
    const button = createCustomElement({
      tag: "button",
      attributes: {
        class: "ms-auto btn btn-danger btn-sm",
      },
    });
    button.innerHTML = "<i class ='bi-trash'></i>";
    li.append(checkbox, label, button);
    checkbox.addEventListener("change", (e) =>
      this.#toggleCheckbox(e.currentTarget)
    );
    button.addEventListener("click", (e) => this.#remove(e));
  }

  #remove(e) {
    e.preventDefault();
    this.#element.remove();
  }

  /**
   *
   * @param {HTMLInputElement} checkbox
   */
  #toggleCheckbox(checkbox) {
    if (checkbox.checked) {
      this.#element.classList.add("is-completed");
    } else {
      this.#element.classList.remove("is-completed");
    }
  }
  /**
   * @return {HTMLElement}
   */
  get element() {
    return this.#element;
  }
}
