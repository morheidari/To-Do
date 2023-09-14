import { format } from "date-fns";
import "./style.css";
import inboxSVG from "./icons/inbox.svg";
import todaySVG from "./icons/today.svg";
import weekSVG from "./icons/week.svg";
import importantSVG from "./icons/important.svg";
import projectsSVG from "./icons/folder.svg";
import projectSVG from "./icons/project.svg";
import removeSVG from "./icons/remove.svg";
import infoSVG from "./icons/info.svg";
import { Project } from "./index.js";

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
const info = addElement("div", "info");
const todoForm = addElement("div", "todo-form");
const addForm = addElement("div", "add-form");
const projectForm = addElement("div", "project-form");
pop.append(info, todoForm, addForm, projectForm);
body.appendChild(pop);

// defining a function for displaying todos
function displayTodoBox(todo) {
  const todoBox = addElement("div", "todo-box-total");
  const upperBox = addElement("div", "todo-box");
  const lowerBox = addElement("div", "priority-box");
  lowerBox.textContent = ` ${todo.priority} priority`;
  // eslint-disable-next-line default-case
  switch (todo.priority) {
    case "low":
      lowerBox.style.color = "blue";
      break;
    case "medium":
      lowerBox.style.color = "green";
      break;
    case "high":
      lowerBox.style.color = "red";
      break;
  }
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
    `<img src=${infoSVG}></img>`
  );
  detail.addEventListener("click", () => {
    info.textContent = todo.description;
    pop.style.display = "block";
    info.style.display = "flex";
  });
  todoBox.append(upperBox, lowerBox);
  upperBox.append(deleteTodo, doneMark, title, date, detail);
  return todoBox;
}

pop.addEventListener("click", (e) => {
  if (e.target.className === "pop") {
    pop.style.display = "none";
    info.style.display = "none";
    addForm.style.display = "none";
    todoForm.style.display = "none";
    projectForm.style.display = "none";
  }
});

function addProjectToList(project) {
  const defaultProject = addElement(
    "div",
    "project",
    `<img src=${projectSVG}></img> ${project.name}`
  );
  projects.append(defaultProject);
}

function displayProject(project) {
  projectTitle.textContent = project.name;
  project.listOfToDos.forEach((todo) =>
    todoBoxes.appendChild(displayTodoBox(todo))
  );
}
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
projectForm.append(projectFormLable, newProjectTitle, projectFormButtons);

addNewProject.addEventListener("click", () => {
  projectForm.style.display = "flex";
  addForm.style.display = "none";
});

const listOfProjects = [];

projectFormButtons.addEventListener("click", () => {
  listOfProjects.push(new Project(newProjectTitle.value));
  const projectElement = addElement(
    "div",
    "project-element",
    `<img src=${projectSVG}></img> ${newProjectTitle.value}`
  );
  projects.appendChild(projectElement);
  newProjectTitle.value = "";
  projectForm.style.display = "none";
  pop.style.display = "none";
});

export { displayProject, addProjectToList };
