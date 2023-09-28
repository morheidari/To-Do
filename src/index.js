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
if (!localStorage.projectsName) localStorage.projectsName = "";
if (!localStorage.projectstodos) localStorage.projectstodos = "";

const inbox = new Project("Inbox");
const listOfProjects = [inbox];
if (localStorage.projectstodos.slice(2, -2)) {
  listOfProjects.shift();
  const todosList = localStorage.projectstodos
    .slice(1, -1)
    .match(/\[\[.*\]\](?=,)|\[\[.*\]\]$/g);
  const projectsNameList = localStorage.projectsName.slice(1, -1).split(", ");
  projectsNameList.forEach((pName, i) => {
    const p = new Project(pName);
    if (todosList && todosList[i]) {
      const psTodos = todosList[i].slice(2, -2).split("], [");
      psTodos.forEach((t) => {
        const todoInfo = t.split(", ");
        while (todoInfo.length < 6) todoInfo.unshift("");
        const todoTitle = todoInfo[0];
        const todoDesc = todoInfo[1];
        const todoPriority = todoInfo[2];
        const todoDate = todoInfo[3];
        const todoDone = eval(todoInfo[4]);
        const todoImportant = eval(todoInfo[5]);
        const newTodo = new ToDo(
          todoTitle,
          todoDesc,
          todoPriority,
          new Date(todoDate),
          todoDone,
          todoImportant
        );
        newTodo.project = p;
        p.addToDoToList(newTodo);
      });
    }
    listOfProjects.push(p);
  });
}

displayProject(listOfProjects[0]);
listOfProjects.forEach((p, i) => {
  if (i > 0) displayProjectName(p);
});

function saveToStorage() {
  localStorage.projectsName = "";
  localStorage.projectstodos = "";
  let projectsName = "[]";
  let projectstodos = "[]";

  listOfProjects.forEach((project) => {
    let todos = "[]";
    project.listOfToDos.forEach((todo) => {
      todos = `${todos.slice(0, -1)}, [${todo.title}, ${todo.description}, ${
        todo.priority
      }, ${format(todo.dueDate, "yyyy/MM/dd")}, ${todo.completed}, ${
        todo.important
      }]]`;
    });
    projectsName = `${projectsName.slice(0, -1)}, ${project.name}]`;
    projectstodos = `${projectstodos.slice(0, -1)}, ${todos}]`;
    projectsName = projectsName.replace(/\[,\s/g, "[");
    projectstodos = projectstodos.replace(/\[,\s/g, "[");
  });

  localStorage.projectsName = projectsName;
  localStorage.projectstodos = projectstodos;
}

document.addEventListener("click", saveToStorage);
export { Project, ToDo, listOfProjects };
