// layout
// header
const header = document.createElement("div");
header.classList.add("header");
document.body.appendChild(header);

// creating the main element of the app in HTML
const main = document.createElement("div");
main.classList.add("main");
document.body.appendChild(main);

// creating the container element that shows the list of projects to user
const projectsList = document.createElement("div");
projectsList.classList.add("project-list");
main.appendChild(projectsList);

// creating the container element that shows the list of todo's in selected project from list of projects
const toDoList = document.createElement("div");
toDoList.classList.add("todo-list");
main.appendChild(toDoList);

// elements
//
