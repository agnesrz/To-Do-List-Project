const Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  
  add(todo) {
   if (!(todo instanceof Todo)) {
     throw new TypeError('Can only add todo objects');
   }
   
    this.todos.push(todo);
  }
   
  size() {
    return this.todos.length;   
  }
  
  first() {
    return this.todos[0];
  }
  
  last() {
    return this.todos[this.size - 1];
  }
  
  itemAt(index) {
    this._validateIndex(index);
    
    return this.todos[index];
  }
  
  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new RangeError(`Invalid index: ${index}`);
    }
  }
  
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }
  
  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }
  
  isDone() {
    return this.todos.every(todo => todo.isDone());
  }
  
  pop() {
    return this.todos.pop();
  }
  
  shift() {
    return this.todos.shift();
  }
  
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }
  
  toString() {
    console.log(`---- ${this.title} ----`);
    
    this.todos.forEach(todo => console.log(String(todo)));
  }
  
  forEach(callback) {
    this.todos.forEach(callback);
  }
  
  filter(callback) {
    let filtered = new TodoList(this.title);
    
    this.forEach(todo => {
      if (callback(todo)) {
        filtered.add(todo);
      }
    });
    
    return filtered;
  }
  
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }
  
  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone()); 
  }
  
  markDone(title) {
    let doneTodo = this.findByTitle(title);
    
    if (doneTodo) {
      doneTodo.markDone();
    }
  }
  
  markAllDone() {
    this.forEach(todo => todo.markDone());
  }
  
  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }
  
  toArray() {
    return this.todos.slice();
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

// console.log(list.findByTitle('Clean room'));
// console.log(list.findByTitle('Eat something'));
// console.log(list.allDone());
// console.log(list.allNotDone());
// list.markDone('Clean room');
// list.markDone('Eat');
// list.markDone();
// list.markAllDone();
// list.markAllUndone();
let listAsArr = list.toArray();
console.log(list);
console.log(listAsArr);
console.log(listAsArr === list.todos);
console.log(list.first() === listAsArr[0]);