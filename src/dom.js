import { format } from "date-fns";
import "./style.css";

// layout
// header
function addElement(typeOfElement, className, content) {
  const element = document.createElement(typeOfElement);
  element.classList.add(className);
  if (content) element.textContent = content;
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

const logo = addElement("div", "logo", "Todo List");
const todayDate = addElement(
  "div",
  "today-date",
  `${format(new Date(), "eeee dd/MMM/yyyy")}`
);
header.append(logo, todayDate);

const dashboard = addElement("div", "dashboard");
const display = addElement("div", "display");
main.append(dashboard, display);

const boxes = addElement("div", "boxes");
const projects = addElement("div", "projects");
const addBtn = addElement("button", "add-btn", "+");
dashboard.append(boxes, projects, addBtn);

const projectTitle = addElement("div", "project-title");
const todoBoxes = addElement("div", "todo-boxes");
display.append(projectTitle, todoBoxes);

const bInbox = addElement("div", "inbox", "inbox");
bInbox.innerHTML = "<span class='material-icons-outlined'>inbox</span>";
const bToday = addElement("div", "today", "today");
const bThisweek = addElement("div", "this-week", "this week");
const bImportant = addElement("div", "important", "important");
boxes.append(bInbox, bToday, bThisweek, bImportant);

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
