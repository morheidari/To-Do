import { format } from "date-fns";
import "./style.css";
import inboxSVG from "./icons/inbox.svg";
import todaySVG from "./icons/today.svg";
import weekSVG from "./icons/week.svg";
import importantSVG from "./icons/important.svg";
import projectsSVG from "./icons/folder.svg";
import projectSVG from "./icons/project.svg";

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
const defaultProject = addElement(
  "div",
  "project",
  `<img src=${projectSVG}></img> default project`
);
projects.append(defaultProject);

// defining a function for displaying todos
function displayTodoBox(todo) {
  const todoBox = addElement("div", "todo-box");
  const deleteTodo = addElement("div", "delete-todo");
  const doneMark = addElement("input", "done-mark");
  doneMark.type = "checkbox";
  doneMark.checked = todo.completed;
  const title = addElement("div", "todo-title");
  title.textContent = todo.title;
  const detail = addElement("div", "todo-details");
  const date = addElement("div", "todo-date");
  date.textContent = format(todo.date, "eee dd,MMM");
  todoBox.append(deleteTodo, doneMark, title, detail, date);
  return todoBox;
}
