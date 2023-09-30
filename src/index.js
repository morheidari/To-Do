import format from "date-fns/format";
import { displayProjectName, displayProject } from "./dom";

function ToDo(title, description, priority, dueDate, completed, important) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.dueDate = dueDate;
  this.completed = completed;
  this.completion = function () {
    if (this.completed === true) this.completed = false;
    else this.completed = true;
  };
  this.project = undefined;
  this.important = important;
}

function Project(name) {
  this.name = name;
  this.listOfToDos = [];
  this.removeToDo = (toDoItem) => {
    this.listOfToDos.splice(this.listOfToDos.indexOf(toDoItem), 1);
  };
  this.addToDoToList = (toDoItem) => {
    this.listOfToDos.push(toDoItem);
  };
}
const inbox = new Project("Inbox");

if (!localStorage.todos) localStorage.todos = JSON.stringify([inbox]);

const listOfProjects = [];

JSON.parse(localStorage.todos).forEach((p) => {
  const project = new Project(p.name);
  p.listOfToDos.forEach((todo) => {
    const newTodo = new ToDo(
      todo.title,
      todo.description,
      todo.priority,
      new Date(todo.dueDate),
      todo.completed,
      todo.important
    );
    newTodo.project = p.name;
    project.addToDoToList(newTodo);
  });
  listOfProjects.push(project);
});

displayProject(listOfProjects[0]);
listOfProjects.forEach((p, i) => {
  if (i > 0) displayProjectName(p);
});

function saveToStorage() {
  localStorage.todos = JSON.stringify(listOfProjects);
}

document.addEventListener("click", saveToStorage);
export { Project, ToDo, listOfProjects };
