let ls = localStorage.getItem("todo");
let todo = ls ? JSON.parse(ls) : [];

// for adding items
function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");

  todo.push({ text: text.value, status: false });
  localStorage.setItem("todo", JSON.stringify(todo));
  location.reload();
}

todo.map((data, index) => {
  document.getElementsByClassName("todo-items")[0].innerHTML += `
    <div class="todo-item">
    <div class="check">
        <div class="check-mark">

        </div>
    </div>
    <div class="todo-text">
        ${data["text"]}
    </div>
    </div>
    `;
});

// for marking done
let checkmarks = document.querySelectorAll(".check");
let todotext = document.querySelectorAll(".todo-text");

checkmarks.forEach((checkMark, i) => {
  checkMark.addEventListener("click", function () {
    markCompleted(i);
  });
});

function markCompleted(i) {
  todo[i].status = true;
  localStorage.setItem("todo", JSON.stringify(todo));
  location.reload();
}

let checkmark = document.getElementsByClassName("check-mark");

checkmarks.forEach((checkMark, i) => {
  if (todo[i].status == true) {
    checkmarks[i].classList.add("marked");
    checkmark[i].innerHTML = `<img src="assets/icon-check.svg" alt="img">`;
  }
});

todotext.forEach((ttext, i) => {
  if (todo[i].status == true) {
    todotext[i].classList.add("line");
  }
});

// for active button
let active = document.getElementById("remains");
active.addEventListener("click", function () {
  checkmarks.forEach((checkMark, i) => {
    if (todo[i].status == true) {
      todo[i].status = false;
    }
  });
  localStorage.setItem("todo", JSON.stringify(todo));
  location.reload();

  checkmarks.forEach((checkMark, i) => {
    if (todo[i].status == false) {
      checkmarks[i].classList.remove("marked");
    }
  });

  todotext.forEach((ttext, i) => {
    if (todo[i].status == false) {
      todotext[i].classList.remove("line");
    }
  });
});

// for completed button
let complete = document.getElementById("complete");
complete.addEventListener("click", function () {
  checkmarks.forEach((checkMark, i) => {
    if (todo[i].status == false) {
      todo[i].status = true;
    }
  });
  localStorage.setItem("todo", JSON.stringify(todo));
  location.reload();

  checkmarks.forEach((checkMark, i) => {
    if (todo[i].status == true) {
      checkmarks[i].classList.add("marked");
    }
  });

  todotext.forEach((ttext, i) => {
    if (todo[i].status == true) {
      todotext[i].classList.add("line");
    }
  });
});

// for clear completed button
let clearComplete = document.getElementById("cComlete");
clearComplete.addEventListener("click", function () {
  todo = todo.filter(findFalse);

  localStorage.setItem("todo", JSON.stringify(todo));
  location.reload();
});

function findFalse(val) {
  if (val.status == false) {
    return val;
  }
}

// for counting left items
let items = 0;
let count = document.getElementById("count");

checkmarks.forEach((checkMark, i) => {
  if (todo[i].status == false) {
    items++;
  }
});

count.innerHTML = `<span id="count">${items}</span>`;

// for theme changing
localStorage.setItem("theme", "true");
let theme = document.getElementsByClassName("theme");
let todo_items = document.getElementsByClassName("todo-items-wrapper");
let new_todo = document.getElementsByClassName("new-todo");

theme[0].addEventListener("click", function () {
  if (localStorage.getItem("theme") == "true") {
    theme[0].innerHTML = `<img src="assets/icon-moon.svg" alt="img">`;
    localStorage.setItem("theme", "false");
  } else {
    theme[0].innerHTML = `<img src="assets/icon-sun.svg" alt="img">`;
    localStorage.setItem("theme", "true");
  }

  document.body.classList.toggle("light");
  new_todo[0].classList.toggle("new-todo-light");
  todo_items[0].classList.toggle("todo-items-wrapper-light");
});
