/*---------- SELECTORS ----------*/
const todoinput = document.querySelector(".input_el");
const todobtn = document.querySelector(".add_btn");
const list = document.querySelector("#list");
const filterOption = document.querySelector(".filter-todo");

/*---------- EVENT LISTENERS ----------*/
document.addEventListener("DOMContentLoaded", showTodo);
todobtn.addEventListener("click", addTodo);
list.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

/*---------- FUNCTION ----------*/

// CREATING ADDTODO TO ADD INPUT TO THE LIST:-
function addTodo(elem) {
  // prevent from refreshing:
  elem.preventDefault();

  //   create a todo div:
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("listItems");

  //   create li:
  const li = document.createElement("li");
  li.classList.add("todo_itm");
  li.innerText = todoinput.value;
  todoDiv.appendChild(li);

  // storing input.value in localstorage:
  saveTolocalstorage(todoinput.value);

  //   create a checked mark button which means completed:
  const completed_btn = document.createElement("button");
  completed_btn.innerHTML = '<i class="fa-solid fa-check"></i>';
  completed_btn.classList.add("completed_btn");
  todoDiv.appendChild(completed_btn);

  //   create a trash button which means delete:
  const trash_btn = document.createElement("button");
  trash_btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trash_btn.classList.add("trash_btn");
  todoDiv.appendChild(trash_btn);

  //   append the todoDiv to list:
  list.appendChild(todoDiv);

  //   clear the input field
  todoinput.value = "";
}

// CREATING DELETECHECK FOR DELETE AND CHECK BUTTON:-
function deletecheck(elem) {
  // The 'elem' object contains information about the click event.
  // and elem.target refers to the button element click event.
  const btn = elem.target;
  const arr = JSON.parse(localStorage.getItem("listing"));
  const res = btn.parentElement;
  // delete button:-
  if (btn.classList[0] === "trash_btn") {
    const deleteText = res.textContent;
    const idx = arr.findIndex((elem) => elem.text === deleteText);
    res.classList.add("fall");
    removeLocalstorage(idx);
    setTimeout(() => {
      res.remove();
    }, 400);
  }

  // check button:-
  if (btn.classList[0] === "completed_btn") {
    const checkedText = res.textContent;
    const idx = arr.findIndex((elem) => elem.text === checkedText);
    // res.classList.toggle("checked");
    if (res.classList.contains("checked")) {
      res.classList.remove("checked");
      arr[idx].status = "incompleted";
    } else {
      res.classList.add("checked");
      arr[idx].status = "completed";
    }
    localStorage.setItem("listing", JSON.stringify(arr));
  }
}

// CREATING FILTERTODO FOR OPTION:
function filterTodo(e) {
  const todos = list.childNodes;
  // console.log(todos);
  todos.forEach((elem) => {
    switch (e.target.value) {
      case "all": {
        elem.style.display = "flex";
        break;
      }
      case "completed": {
        if (elem.classList.contains("checked")) {
          elem.style.display = "flex";
        } else {
          elem.style.display = "none";
        }
        break;
      }
      case "uncompleted": {
        if (!elem.classList.contains("checked")) {
          elem.style.display = "flex";
        } else {
          elem.style.display = "none";
        }
        break;
      }
    }
  });
}

// CREATING A FUNCTION SAVETOLOCALSTORAGE TO SAVE TODOS IN LOCALSTORAGE:

function saveTolocalstorage(elem) {
  // check if there is already todos in the localstorage:
  let res;
  if (localStorage.getItem("listing") === null) {
    res = [];
  } else {
    // coverting string into array and storing it into res:
    res = JSON.parse(localStorage.getItem("listing"));
  }
  const obj = {
    text: elem,
    status: "incomplete",
  };
  res.push(obj);
  // converting res array into string and store it into localstorage:
  localStorage.setItem("listing", JSON.stringify(res));
}

function showTodo() {
  let res;
  if (localStorage.getItem("listing") === null) {
    res = [];
  } else {
    // coverting string into array and storing it into res:
    res = JSON.parse(localStorage.getItem("listing"));
  }
  // console.log(res);
  res.forEach((elem) => {
    //   create a todo div:
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("listItems");

    //   create li:
    const li = document.createElement("li");
    li.classList.add("todo_itm");
    li.innerText = elem.text;
    if (elem.status === "completed") {
      todoDiv.classList.add("checked");
    } else {
      todoDiv.classList.remove("checked");
    }
    console.log(elem.status);
    todoDiv.appendChild(li);

    //   create a checked mark button which means completed:
    const completed_btn = document.createElement("button");
    completed_btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completed_btn.classList.add("completed_btn");
    todoDiv.appendChild(completed_btn);

    //   create a trash button which means delete:
    const trash_btn = document.createElement("button");
    trash_btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trash_btn.classList.add("trash_btn");
    todoDiv.appendChild(trash_btn);

    //   append the todoDiv to list:
    list.appendChild(todoDiv);

    //   clear the input field
    todoinput.value = "";
  });
}

function removeLocalstorage(idx) {
  let res;
  if (localStorage.getItem("listing") === null) {
    res = [];
  } else {
    res = JSON.parse(localStorage.getItem("listing"));
  }
  if (idx > -1) {
    res.splice(idx, 1);
  }
  // console.log(res);
  localStorage.setItem("listing", JSON.stringify(res));
}
