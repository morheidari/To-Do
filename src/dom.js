import { format, isToday, isSameWeek } from "date-fns";
import "./style.css";
import inboxSVG from "./icons/inbox.svg";
import todaySVG from "./icons/today.svg";
import weekSVG from "./icons/week.svg";
import importantSVG from "./icons/important.svg";
import projectsSVG from "./icons/folder.svg";
import projectSVG from "./icons/project.svg";
import removeSVG from "./icons/remove.svg";
import deleteSVG from "./icons/delete.svg";
import expMoreSVG from "./icons/exp more.svg";
import { Project, ToDo } from "./index.js";

const inbox = new Project("Inbox");

// layout
// header
function addElement(typeOfElement, className, content) {
  const element = document.createElement(typeOfElement);
  element.classList.add(className);
  if (content) element.innerHTML = content;
  return element;
}

// dividing app sections
const body = document.querySelector("body");
const app = addElement("div", "app");
body.append(app);

const header = addElement("div", "header");
const main = addElement("div", "main");
const footer = addElement("div", "footer", "©moreheidari");
app.append(header, main, footer);

const logo = addElement("div", "logo");
const todayDate = addElement(
  "div",
  "today-date",
  `${format(new Date(), "eeee dd/MMM/yyyy")}`
);
header.append(logo, todayDate);
const logoText = addElement("div", "logo-text", "Todo List");
const todoIcon = addElement("div", "todo-icon");
logo.append(logoText, todoIcon);

const dashboard = addElement("div", "dashboard");
const display = addElement("div", "display");
main.append(dashboard, display);

const boxes = addElement("div", "boxes");
const projectBox = addElement("div", "project-box");
const addBtn = addElement("button", "add-btn", "+");
dashboard.append(boxes, projectBox, addBtn);

const projectTitle = addElement("div", "project-title");
const todoBoxes = addElement("div", "todo-boxes");
display.append(projectTitle, todoBoxes);

const bInbox = addElement("div", "inbox", `<img src=${inboxSVG}></img> Inbox`);
const bToday = addElement("div", "today", `<img src=${todaySVG}></img> Today`);
const bThisweek = addElement(
  "div",
  "this-week",
  `<img src=${weekSVG}></img> This week`
);
const bImportant = addElement(
  "div",
  "important",
  `<img src=${importantSVG}></img> Important`
);
boxes.append(bInbox, bToday, bThisweek, bImportant);
const projectBoxTitle = addElement(
  "div",
  "project-box-title",
  `<img src=${projectsSVG}></img>Projects`
);
const projects = addElement("div", "projects");
projectBox.append(projectBoxTitle, projects);

const pop = addElement("div", "pop");
const todoForm = addElement("div", "todo-form");
const addForm = addElement("div", "add-form");
const projectForm = addElement("div", "project-form");
pop.append(todoForm, addForm, projectForm);
body.appendChild(pop);

// defining a function for displaying todos
function displayTodoBox(todo) {
  const todoBox = addElement("div", "todo-box-total");
  const upperBox = addElement("div", "todo-box");
  const lowerBox = addElement("div", "todo-lower-box");
  const descriptionBox = addElement("div", "description-box");
  const priorityBox = addElement("div", "priority-box");
  priorityBox.textContent = ` ${todo.priority} priority`;
  // eslint-disable-next-line default-case
  switch (todo.priority) {
    case "low":
      priorityBox.style.color = "blue";
      break;
    case "medium":
      priorityBox.style.color = "green";
      break;
    case "high":
      priorityBox.style.color = "red";
      break;
  }
  lowerBox.append(priorityBox, descriptionBox);
  const descriptionBoxText = addElement(
    "textarea",
    "desc-textarea",
    todo.description
  );
  descriptionBox.innerHTML = `Description:`;
  descriptionBox.append(descriptionBoxText);
  const deleteTodo = addElement(
    "div",
    "delete-todo",
    `<img src=${removeSVG}></img>`
  );
  deleteTodo.addEventListener("click", () => {
    todo.project.removeToDo(todo);
    todoBoxes.removeChild(todoBox);
  });
  const doneMark = addElement("div", "checkbox");
  if (todo.completed) doneMark.classList.add("done");
  doneMark.addEventListener("click", (evn) => {
    evn.target.classList.toggle("done");
    todo.completion();
  });
  const title = addElement("div", "todo-title");
  title.textContent = todo.title;
  const date = addElement("div", "todo-date");
  date.innerHTML = `${format(todo.dueDate, "eee dd,MMM")}`;
  const detail = addElement(
    "div",
    "todo-details",
    `<img src=${expMoreSVG}></img>`
  );
  detail.addEventListener("click", () => {
    if (lowerBox.style.display === "flex") {
      detail.style.transform = "rotate(0deg)";
      todo.description = descriptionBoxText.value;
      lowerBox.style.display = "none";
    } else {
      detail.style.transform = "rotate(180deg)";
      lowerBox.style.display = "flex";
    }
  });
  const importantMark = addElement(
    "div",
    "important-mark",
    `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="800px" height="800px" viewBox="0 0 24 24" id="star_filled" data-name="star filled" xmlns="http://www.w3.org/2000/svg">
      <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none"/>
      <path id="Star" d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z" transform="translate(2 3)" stroke="#000000" stroke-miterlimit="10" stroke-width="1.5"/>
    </svg>`
  );
  if (todo.important) importantMark.classList.add("is-important");
  importantMark.addEventListener("click", () => {
    importantMark.classList.toggle("is-important");
    if (todo.important) todo.important = false;
    else todo.important = true;
  });
  todoBox.append(upperBox, lowerBox);
  upperBox.append(deleteTodo, doneMark, title, date, importantMark, detail);
  return todoBox;
}

pop.addEventListener("click", (e) => {
  if (e.target.className === "pop") {
    pop.style.display = "none";
    addForm.style.display = "none";
    todoForm.style.display = "none";
    projectForm.style.display = "none";
  }
});

function displayProject(project) {
  projectTitle.textContent = project.name;
  todoBoxes.innerHTML = "";
  project.listOfToDos.forEach((todo) =>
    todoBoxes.appendChild(displayTodoBox(todo))
  );
}

displayProject(inbox);
// Add button functionality
const addNewProject = addElement("div", "add-project", "Add new project");
const addTodoToProject = addElement(
  "div",
  "add-todo",
  "Add new todo to existing project"
);
addForm.append(addNewProject, addTodoToProject);

addBtn.addEventListener("click", () => {
  addForm.style.display = "flex";
  pop.style.display = "block";
});

const projectFormLable = addElement(
  "div",
  "project-form-label",
  "Project title:"
);
const newProjectTitle = addElement("input", "new-project-title");
const projectFormButtons = addElement(
  "button",
  "project-form-buttons",
  "Enter"
);
const projectFormError = addElement(
  "div",
  "project-form-error",
  "Please Enter Project Title!"
);
projectForm.append(
  projectFormError,
  projectFormLable,
  newProjectTitle,
  projectFormButtons
);

addNewProject.addEventListener("click", () => {
  projectForm.style.display = "flex";
  addForm.style.display = "none";
});

const listOfProjects = [];
listOfProjects.push(inbox);

projectFormButtons.addEventListener("click", () => {
  if (newProjectTitle.value !== "") {
    projectFormError.style.display = "none";
    const p = new Project(newProjectTitle.value);
    listOfProjects.push(p);
    const projectElement = addElement("div", "project-element");
    const projectNameElement = addElement(
      "div",
      "project-name-element",
      `<img src=${projectSVG}></img> ${newProjectTitle.value}`
    );
    const deleteProjectElement = addElement(
      "div",
      "delete-project",
      `<div class'delete-project'><img src=${deleteSVG}></img></div> `
    );
    projectElement.append(projectNameElement, deleteProjectElement);
    projects.appendChild(projectElement);
    projectNameElement.addEventListener("click", () => {
      displayProject(p);
    });
    newProjectTitle.value = "";
    projectForm.style.display = "none";
    pop.style.display = "none";
    deleteProjectElement.addEventListener("click", () => {
      projects.removeChild(projectElement);
      listOfProjects.splice(listOfProjects.indexOf(p), 1);
      displayProject(inbox);
    });
  } else {
    projectFormError.style.display = "flex";
  }
});
// todo form elements
function createTodoForm() {
  todoForm.innerHTML = "";
  const enterName = addElement("div", "todo-name-div");
  const nameLabel = addElement("label", "todo-label", "Todo: ");
  const nameInput = addElement("input", "todo-name-input");
  enterName.append(nameLabel, nameInput);
  const enterpriority = addElement("div", "priority-div");
  const priorityLabel = addElement("label", "priority-label", "Priority: ");
  const prioritySelect = addElement(
    "select",
    "priority-select",
    "<option value='high'>high</option><option value='meduim'>medium</option><option value='low'>low</option>"
  );
  enterpriority.append(priorityLabel, prioritySelect);
  const entertodoDate = addElement("div", "todo-date-div");
  const dateLabel = addElement("label", "date-label", "Date: ");
  const dateError = addElement("div", "date-error", "Please Enter date!");
  const dateInput = addElement("input", "date-input");
  dateInput.type = "date";
  entertodoDate.append(dateError, dateLabel, dateInput);
  const selectProject = addElement("div", "select-project");
  const projectLabel = addElement("label", "project-label", "Project: ");
  const projectSelect = addElement("select", "project-select");
  listOfProjects.forEach((pro, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.text = pro.name;
    projectSelect.appendChild(option);
  });
  selectProject.append(projectLabel, projectSelect);
  const writeDescription = addElement("div", "write-desc");
  const descLable = addElement("label", "description-label", "Description: ");
  const descText = addElement("textarea", "description-text");
  writeDescription.append(descLable, descText);
  const formBtns = addElement("div", "form-btns");
  const confirmBtn = addElement("div", "confirm-btn", "Confirm");
  const cancelBtn = addElement("div", "cancel-btn", "Cancel");
  formBtns.append(confirmBtn, cancelBtn);
  todoForm.append(
    selectProject,
    enterName,
    enterpriority,
    entertodoDate,
    writeDescription,
    formBtns
  );
  confirmBtn.addEventListener("click", () => {
    if (dateInput.value !== "") {
      dateError.style.display = "none";
      const newTodo = new ToDo(
        nameInput.value,
        descText.value,
        prioritySelect.value,
        new Date(dateInput.value),
        false,
        false
      );
      newTodo.project = listOfProjects[projectSelect.value];
      listOfProjects[projectSelect.value].addToDoToList(newTodo);
      displayProject(listOfProjects[projectSelect.value]);
      nameInput.value = "";
      descText.value = "";
      pop.style.display = "none";
      todoForm.style.display = "none";
    } else {
      dateError.style.display = "flex";
    }
  });

  cancelBtn.addEventListener("click", () => {
    nameInput.value = "";
    descText.value = "";
    pop.style.display = "none";
    todoForm.style.display = "none";
  });
}

addTodoToProject.addEventListener("click", () => {
  createTodoForm();
  addForm.style.display = "none";
  todoForm.style.display = "flex";
  pop.style.display = "block";
});

const today = new Project("Today");

const week = new Project("This week");

const importantProjects = new Project("Important");

bInbox.addEventListener("click", () => {
  displayProject(inbox);
});

bToday.addEventListener("click", () => {
  today.listOfToDos = [];
  listOfProjects.forEach((prj) => {
    prj.listOfToDos.forEach((t) => {
      if (isToday(t.dueDate)) {
        today.addToDoToList(t);
      }
    });
  });
  displayProject(today);
});

bThisweek.addEventListener("click", () => {
  week.listOfToDos = [];
  listOfProjects.forEach((prj) => {
    prj.listOfToDos.forEach((t) => {
      if (isSameWeek(t.dueDate, new Date(), { weekStartsOn: 6 })) {
        week.addToDoToList(t);
      }
    });
  });
  displayProject(week);
});

bImportant.addEventListener("click", () => {
  importantProjects.listOfToDos = [];
  listOfProjects.forEach((prj) => {
    prj.listOfToDos.forEach((t) => {
      if (t.important) {
        importantProjects.addToDoToList(t);
      }
    });
  });
  displayProject(importantProjects);
});
