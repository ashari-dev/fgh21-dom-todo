const formInputDiv = document.getElementById("form");
const btnInput = document.getElementById("btn-input");
const result = document.getElementById("todo-list");
const formInput = formInputDiv.getElementsByTagName("form").item(0);
const dataNull = document.getElementById("data-null");
const data = [
  { text: "Tugas Todolist", time: new Date().getTime(), finis: true },
  { text: "Tugas Form", time: new Date().getTime(), finis: true },
];
if (data[0]) {
} else {
  dataNull.classList.toggle("hide");
}

btnInput.addEventListener("click", () => {
  formInputDiv.classList.toggle("hide");
});
formInput.addEventListener("click", (e) => {
  e.stopPropagation();
});
formInputDiv.addEventListener("click", () => {
  formInputDiv.classList.toggle("hide");
});

formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  data.push({
    text: e.target.todo.value,
    time: new Date().getTime(),
    finis: false,
  });
  result.innerHTML = "";
  todoList();
  formInputDiv.classList.toggle("hide");
  e.currentTarget.reset();
});

todoList();
function todoList() {
  data.forEach((e, i) => {
    const hours = new Date(e.time).getHours();
    const minute = new Date(e.time).getMinutes();
    const liTodo = document.createElement("li");
    const text = document.createElement("label");
    text.setAttribute("for", `checkbox-${i + 1}`);
    text.innerText = e.text;
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `checkbox-${i + 1}`);
    if (e.finis) {
      checkbox.checked = true;
    }
    const span1 = document.createElement("span");
    span1.appendChild(checkbox);
    span1.appendChild(text);
    const span2 = document.createElement("span");
    span2.innerText = `${hours < 12 ? hours : hours - 12} : ${minute} ${
      hours < 12 ? "AM" : "PM"
    }`;
    liTodo.appendChild(span1);
    liTodo.appendChild(span2);
    result.appendChild(liTodo);
  });
}
