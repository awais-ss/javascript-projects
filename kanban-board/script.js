let addButtons = document.querySelectorAll(".add");

let array = getFromLocalStorage();

array.forEach(function (taskObj) {
  let targetId = taskObj.column + "-cards";

  let target = document.getElementById(targetId);

  logic(taskObj.task, target, taskObj.column, false, taskObj.id);
});

addButtons.forEach(function (e) {
  e.addEventListener("click", () => {
    let taskName = prompt("ENTER TASK NAME");

    let targetId = e.dataset.target + "-cards";

    let columnName = e.dataset.target;

    const target = document.getElementById(targetId);

    if (taskName === "") {
      alert("ENTER TASK FIRST");
    } else {
      logic(taskName, target, columnName);
    }
  });
});

//        FUNCTIONS

function deleteDiv(div) {
  div.remove();
}

function copytext(task) {
  navigator.clipboard.writeText(task);
}

function addToLocalStorage(content) {
  localStorage.setItem("KEY", JSON.stringify(content));
}

function getFromLocalStorage() {
  let saved = localStorage.getItem("KEY");

  return saved ? JSON.parse(saved) : [];
}

function logic(
  taskName,
  target,
  columnName,
  save = true,
  existingId = Date.now(),
) {
  let mainDiv = document.createElement("div");

  mainDiv.setAttribute("draggable", "true");

  let task = document.createElement("p");

  task.textContent = taskName;

  let deleteBtn = document.createElement("button");

  deleteBtn.textContent = "DELETE";

  let copyBtn = document.createElement("button");

  copyBtn.textContent = "COPY";

  mainDiv.append(task, deleteBtn, copyBtn);

  target.append(mainDiv);

  // store in localstorage

  let taskObj = {
    id: existingId,

    task: taskName,

    column: columnName,
  };

  if (save) {
    array.push(taskObj);

    addToLocalStorage(array);
  }

  deleteBtn.addEventListener("click", () => {
    deleteDiv(mainDiv);

    array = array.filter(function (obj) {
      return obj.id !== taskObj.id;
    });

    addToLocalStorage(array);
  });

  copyBtn.addEventListener("click", () => {
    copytext(taskName);

    copyBtn.textContent = "COPIED";

    setTimeout(() => {
      copyBtn.textContent = "COPY";
    }, 1200);
  });
}
