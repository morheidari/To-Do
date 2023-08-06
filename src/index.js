function ToDo(title, description, priority, dueDate, completed) {
  return {
    title,
    description,
    priority,
    dueDate,
    completed,
    completion: () => {
      if (this.completed === true) this.completed = false;
      else this.completed = true;
    },
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
  };
}

const inbox = new Project("project one");
inbox.addToDoToList(
  ToDo("todo_one", "just an example", "low", new Date(), false)
);
