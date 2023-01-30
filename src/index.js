function ToDo(title, description, priority, dueDate, completed) {
  return {
    title,
    description,
    priority,
    dueDate,
    completed,
    do_UnDo: () => {
      if (this.completed === true) this.completed = false;
      else this.completed = true;
    },
  };
}

function Project(name) {
  return {
    name,
    listOfToDos: [],
    addToDoToList: (toDoItem) => {
      this.listOfToDos.push(toDoItem);
    },
    removeToDo: (toDoItem) => {
      this.listOfToDos.splice(this.listOfToDos.indexOf(toDoItem), 1);
    },
  };
}

const inbox = Project("today");
