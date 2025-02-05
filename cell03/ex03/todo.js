function createTodo(text) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.textContent = text;

    todoDiv.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this to-do?")) {
            this.remove();
            saveTodos();
        }
    });

    return todoDiv;
}

function addTodo() {
    const todoText = prompt("Enter a new to-do:");
    if (todoText && todoText.trim() !== "") {
        const todoDiv = createTodo(todoText.trim());
        const ftList = document.getElementById("ft_list");
        ftList.prepend(todoDiv);
        saveTodos();
    }
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll("#ft_list .todo").forEach(todo => {
        todos.push(todo.textContent);
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=31536000`;
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    const todoCookie = cookies.find(cookie => cookie.startsWith("todos="));
    if (todoCookie) {
        const todos = JSON.parse(todoCookie.split("=")[1]);
        todos.forEach(todoText => {
            const todoDiv = createTodo(todoText);
            document.getElementById("ft_list").appendChild(todoDiv);
        });
    }
}

document.getElementById("newButton").addEventListener("click", addTodo);
window.onload = loadTodos;