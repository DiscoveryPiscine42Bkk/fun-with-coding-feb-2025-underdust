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
        document.getElementById("ft_list").prepend(todoDiv);
        saveTodos();
    }
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll("#ft_list .todo").forEach(todo => {
        todos.push(todo.textContent);
    });

    document.cookie = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/; max-age=31536000`;
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    const todoCookie = cookies.find(cookie => cookie.startsWith("todos="));

    if (todoCookie) {
        try {
            const todos = JSON.parse(decodeURIComponent(todoCookie.split("=")[1]));

            todos.reverse().forEach(todoText => {
                const todoDiv = createTodo(todoText);
                document.getElementById("ft_list").prepend(todoDiv);
            });
        } catch (error) {
            console.error("Error parsing cookie:", error);
        }
    }
}

document.getElementById("newButton").addEventListener("click", addTodo);
window.onload = loadTodos;