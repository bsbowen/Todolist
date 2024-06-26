
        document.addEventListener('DOMContentLoaded', (event) => {
            loadTodos();
        });

        document.getElementById('addTodoButton').addEventListener('click', function() {
            const todoInput = document.getElementById('todoInput');
            const todoText = todoInput.value.trim();
            if (todoText !== '') {
                addTodoItem(todoText);
                saveTodoItem(todoText);
                todoInput.value = '';
            }
        });

        function addTodoItem(todoText) {
            const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
            const newRow = todoTable.insertRow();
            const itemCell = newRow.insertCell(0);
            const actionCell = newRow.insertCell(1);
            itemCell.textContent = todoText;
            itemCell.addEventListener('click', function() {
                itemCell.classList.add('crossed-out');
                setTimeout(() => {
                    removeTodoItem(newRow.rowIndex - 1);
                }, 1000);
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', function() {
                removeTodoItem(newRow.rowIndex - 1);
            });
            actionCell.appendChild(deleteButton);
        }

        function saveTodoItem(todoText) {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.push(todoText);
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function loadTodos() {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.forEach(todoText => addTodoItem(todoText));
        }

        function removeTodoItem(index) {
            const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
            todoTable.deleteRow(index);
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
        }