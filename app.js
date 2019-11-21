// Classes //

class Task {
    constructor(id, title, date, time) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
    }
}

class UI {
    static displayTasks() {
        const tasks = Store.getTasks();
        tasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const list = document.getElementById('todos-list');
        const stickyNote = document.createElement('div');

        stickyNote.id = task.id;
        stickyNote.className = 'note-bg';
        stickyNote.innerHTML = `
        <div class="task-text">${task.title}</div>
        <div class="date-text">${task.date}</div>
        <div class="time-text">${task.time}</div>
        <div>
          <a href="#" class="btn btn-danger btn-sm delete">X</a>
        </div>`;

        list.appendChild(stickyNote);
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.getElementById('todos-form');
        container.insertBefore(div, form);

        setTimeout(() =>
            document.querySelector('.alert')
                .remove(), 3000);
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
    }

    static deleteTask(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }
}

class Store {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = []
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks
    }

    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(taskId) {
        console.log(taskId);
        const tasks = Store.getTasks();
        tasks.forEach((task, index) => {
            if(task.id === taskId) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

}

// Events //

// Document did mount:
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// On Form submit:
document.getElementById('todos-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        const id = ID();
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!title || !date || !time) {
            UI.showAlert('Please fill all fields', 'danger');
        } else {
            const task = new Task(id, title, date, time);

            UI.addTaskToList(task);

            Store.addTask(task);

            UI.showAlert('Task Added', 'success');

            UI.clearFields();
        }
    });

document.getElementById('todos-list')
    .addEventListener('click', (e) => {

        UI.deleteTask(e.target);

        Store.removeTask(e.target.parentElement.parentElement.id);

    });
