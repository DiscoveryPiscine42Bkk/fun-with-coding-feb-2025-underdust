$(document).ready(function () {
    function createTodo(text) {
        const todoDiv = $("<div>").addClass("todo").text(text);

        todoDiv.on("click", function () {
            if (confirm("Are you sure you want to delete this to-do?")) {
                $(this).remove();
                saveTodos();
            }
        });

        return todoDiv;
    }

    function addTodo() {
        const todoText = prompt("Enter a new to-do:");
        if (todoText && todoText.trim() !== "") {
            const todoDiv = createTodo(todoText.trim());
            $("#ft_list").prepend(todoDiv);
            saveTodos();
        }
    }

    function saveTodos() {
        const todos = [];
        $("#ft_list .todo").each(function () {
            todos.push($(this).text());
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
                    $("#ft_list").prepend(todoDiv);
                });
            } catch (error) {
                console.error("Error parsing cookie:", error);
            }
        }
    }

    $("#newButton").on("click", addTodo);
    loadTodos();
});