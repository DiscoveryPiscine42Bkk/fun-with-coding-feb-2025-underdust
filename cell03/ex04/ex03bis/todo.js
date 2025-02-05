function createTodo(text) {
    const $todoDiv = $('<div>').addClass('todo').text(text);

    $todoDiv.on('click', function () {
        if (confirm("Are you sure you want to delete this to-do?")) {
            $(this).remove();
            saveTodos();
        }
    });

    return $todoDiv;
}

function addTodo() {
    const todoText = prompt("Enter a new to-do:");
    if (todoText && todoText.trim() !== "") {
        const $todoDiv = createTodo(todoText.trim());
        $('#ft_list').prepend($todoDiv);
        saveTodos();
    }
}

function saveTodos() {
    const todos = [];
    $('#ft_list .todo').each(function () {
        todos.push($(this).text());
    });
    document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=31536000`;
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    const todoCookie = cookies.find(cookie => cookie.startsWith("todos="));
    if (todoCookie) {
        const todos = JSON.parse(todoCookie.split("=")[1]);
        todos.forEach(todoText => {
            const $todoDiv = createTodo(todoText);
            $('#ft_list').append($todoDiv);
        });
    }
}

$(document).ready(function () {
    $('#newButton').on('click', addTodo);
    loadTodos();
});