const formInputDiv = document.getElementById("form");
const btnInput = document.getElementById("btn-input");
const result = document.getElementById("todo-list");
const formInput = formInputDiv.getElementsByTagName("form").item(0);
const dataNull = document.getElementById("data-null");
let data = [];
const cekData = window.localStorage.getItem("DATA");
const dataLocalstorage = JSON.parse(cekData);
if (cekData !== null) {
  data = dataLocalstorage;
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
  const dataRow = {
    text: e.target.todo.value,
    time: new Date().getTime(),
  };
  data.push(dataRow);
  window.localStorage.setItem(`DATA`, JSON.stringify(data));
  result.innerHTML = "";
  todoList();
  formInputDiv.classList.toggle("hide");
  e.currentTarget.reset();
});

function removeData(i) {
  const delData = dataLocalstorage.filter(
    (item) => item !== dataLocalstorage[i]
  );
  window.localStorage.clear("DATA");
  window.localStorage.setItem(`DATA`, JSON.stringify(delData));
  // console.log(delData);
  result.innerHTML = "";
  todoList();
}
function editData(i) {
  console.log(i);
}
function todoList() {
  data.forEach((e, i) => {
    const hours = new Date(e.time).getHours();
    const minute = new Date(e.time).getMinutes();
    const liTodo = document.createElement("li");
    const text = document.createElement("label");
    text.setAttribute("for", `checkbox-${i + 1}`);
    text.innerText = e.text;
    // const checkbox = document.createElement("input");
    // checkbox.setAttribute("type", "checkbox");
    // checkbox.setAttribute("id", `checkbox-${i + 1}`);
    // if (e.finis) {
    //   checkbox.checked = true;
    // }

    const btnDone = document.createElement("input");
    btnDone.setAttribute("type", "button");
    btnDone.setAttribute("value", "done");
    btnDone.onclick = () => {
      removeData(i);
    };
    const btnEdit = document.createElement("input");
    btnEdit.setAttribute("type", "button");
    btnEdit.setAttribute("value", "edit");
    btnEdit.onclick = () => {
      editData(i);
    };
    const span1 = document.createElement("span");
    span1.appendChild(btnDone);
    span1.appendChild(btnEdit);
    // span1.appendChild(checkbox);
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
todoList();
