const write_task = document.querySelector(".add-task");
const add = document.querySelector(".add");
const clear = document.querySelector(".clear");
const dashboard = document.querySelector(".dashboard");

// array banao to store in local storage
let tasks = [];

// save fun
function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

// get fun
function loadTasks() {
  let saved = localStorage.getItem("todo-tasks");
  tasks = saved ? JSON.parse(saved) : [];

  tasks.forEach(function (task) {
    createTaskDiv(task);
  });
}

function createTaskDiv(task) {
  let div_ele = document.createElement("div");
  let text = document.createElement("p");
  let check_box = document.createElement("input");
  check_box.type = "checkbox";
  text.textContent = task.text;

  let edit_btn = document.createElement("button");
  edit_btn.textContent = "EDIT";
  let delete_btn = document.createElement("button");
  delete_btn.textContent = "DELETE";
  let copy_btn = document.createElement("button");
  copy_btn.textContent = "COPY";

  div_ele.append(check_box, text, edit_btn, delete_btn, copy_btn);
  dashboard.append(div_ele);

  // delete button
  delete_btn.addEventListener("click", () => {
    div_ele.remove();

    // NAYA: array se bhi is task ki entry hataani hai
    // warna reload pe wapas aa jayega (ghost task)
    tasks = tasks.filter((t) => t.id !== task.id);
    saveTasks();
  });

  // copy btn
  copy_btn.addEventListener("click", () => {
    navigator.clipboard.writeText(text.textContent);
    copy_btn.textContent = "COPIED";
    setTimeout(() => {
      copy_btn.textContent = "COPY";
    }, 1000);
  });

  // edit btn — abhi isay chhu nahi rahe, jaisa tha waisa hi hai
  edit_btn.addEventListener("click", () => {
    if (edit_btn.textContent === "EDIT") {
      write_task.value = text.textContent;
      text.textContent = "";
      edit_btn.textContent = "DONE";
      add.disabled = true;
      write_task.focus();
    } else {
      text.textContent = write_task.value;
      edit_btn.textContent = "EDIT";
      write_task.value = "";
      add.disabled = false;
    }
  });
}

// ADD TODO IN A DASHBOARD
add.addEventListener("click", () => {
  if (write_task.value === "") {
    write_task.focus();
    write_task.placeholder = "ENTER TASK FIRST";
    setTimeout(() => {
      write_task.placeholder = "ADD TASK";
    }, 1500);
  } else {
    let newTask = {
      id: Date.now(),
      text: write_task.value,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    createTaskDiv(newTask);

    write_task.value = "";
    write_task.focus();
  }
});

// clear btn
clear.addEventListener("click", () => {
  write_task.focus();
  write_task.value = "";
  dashboard.innerHTML = "";
  add.disabled = false;

  // NAYA: array aur localStorage bhi khaali karo
  // warna reload pe "clear" kiye hue tasks wapas aa jayenge
  tasks = [];
  saveTasks();
});

loadTasks();
