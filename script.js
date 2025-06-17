document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const addBtn = document.querySelector(".add");
    const list = document.getElementById("list");
    const taskHeader = document.getElementById("task-header");

    function updateTaskCount() {
        const total = list.children.length;
        const completed = list.querySelectorAll("input[type='checkbox']:checked").length;
        taskHeader.textContent = `Task Completed - ${completed}/${total}`;
    }

    function saveData() {
        localStorage.setItem("data", list.innerHTML);
    }

    function addTask(text = "") {
        const taskText = text || input.value.trim();
        if (taskText === ""){
            alert("You must write something!!");
            return;
        }

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            updateTaskCount();
            saveData();
        });

        const span = document.createElement("span");
        span.textContent = " " + taskText;

        li.addEventListener("dblclick", () => {
            li.remove();
            updateTaskCount();
            saveData();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        list.appendChild(li);

        input.value = "";
        updateTaskCount();
        saveData();
    }

    function loadData() {
        const data = localStorage.getItem("data");
        if (data) {
            list.innerHTML = data;
            list.querySelectorAll("li").forEach(li => {
                const checkbox = li.querySelector("input[type='checkbox']");
                checkbox.addEventListener("change", () => {
                    updateTaskCount();
                    saveData();
                });
                li.addEventListener("dblclick", () => {
                    li.remove();
                    updateTaskCount();
                    saveData();
                });
            });
        }
        updateTaskCount();
    }

    addBtn.addEventListener("click", () => addTask());
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    loadData();
});
