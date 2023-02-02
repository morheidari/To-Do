// layout
// header
const header = document.createElement("div");
header.classList.add("header");
header.textContent = "To do list";
document.body.appendChild(header);

// creating the main element of the app in HTML
const main = document.createElement("div");
main.classList.add("main");
document.body.appendChild(main);

// creating the container element that shows the list of projects to user
const dashboard = document.createElement("div");
dashboard.classList.add("dashboard");
main.appendChild(dashboard);

// creating the container element that shows the list of todo's in selected project from list of projects
const selectedProject = document.createElement("div");
selectedProject.classList.add("sellected-project");
main.appendChild(selectedProject);

// elements
// project name element
const projectNameContainer = document.createElement("h1");
projectNameContainer.classList.add("project-name");
selectedProject.appendChild(projectNameContainer);
// list of to do's
const tasksContainer = document.createElement("div");
tasksContainer.classList.add("tasksContainer");
selectedProject.appendChild(tasksContainer);
// add task button
const addTask = document.createElement("button");
addTask.classList.add("add-task");
selectedProject.appendChild(addTask);
// default projects include inbox adn Today
const inbox = document.createElement("div");
inbox.classList.add("inbox");
inbox.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-inbox" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M4 13h3l3 3h4l3 -3h3"></path></svg>';
inbox.textContent = "inbox";
const today = document.createElement("div");
today.classList.add("inbox");
dashboard.appendChild(inbox);
dashboard.appendChild(today);
// projects ellement in list of projects
const projectsElement = document.createElement("div");
projectsElement.classList.add("projects-element");
dashboard.appendChild(projectsElement);
// add project button
const addProjectBtn = document.createElement("button");
addProjectBtn.classList.add("add-project-btn");
dashboard.appendChild(addProjectBtn);
