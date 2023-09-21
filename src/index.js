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

export { Project, ToDo };
