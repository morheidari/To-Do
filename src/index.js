import { displayProject } from "./dom";

function ToDo(title, description, priority, dueDate, completed) {
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.dueDate = dueDate;
  this.completed = completed;
  this.completion = function () {
    if (this.completed === true) this.completed = false;
    else this.completed = true;
  };
}

function Project(name) {
  this.name = name;
  this.listOfToDos = [];
  this.removeToDo = (toDoItem) => {
    this.listOfToDos.splice(this.listOfToDos.indexOf(toDoItem), 1);
  };
  this.addToDoToList = (toDoItem) => {
    this.listOfToDos.push(toDoItem);
    toDoItem.project = this;
  };
}

const inbox = new Project("project one");
inbox.addToDoToList(
  new ToDo("todo_one", "just an example!", "low", new Date(), true)
);
inbox.addToDoToList(
  new ToDo("todo_two", "another example!", "high", new Date(), false)
);

displayProject(inbox);

export { Project };
