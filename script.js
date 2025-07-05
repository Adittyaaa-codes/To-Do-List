document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("input");
    const add = document.getElementById("add");
    const lists = document.getElementById("list");
    const taskHeader = document.getElementById("task-header");

    function saveData() {
        localStorage.setItem("data", lists.innerHTML);
    }

    function updateTaskCount() {
        let total = lists.querySelectorAll("li").length;
        let completed = lists.querySelectorAll("input[type='checkbox']:checked").length;

        if (total === 0) {
            taskHeader.textContent = "Enter your tasks!!";
            taskHeader.style.textAlign = "center";
            taskHeader.style.color = "white";
        } else {
            taskHeader.textContent = "Task Completed - " + completed + "/" + total;
            let percent = (completed / total) * 100;
            if (percent < 50) {
                taskHeader.style.color = "red";
            } else if (percent === 100) {
                taskHeader.style.color = "green";
            } else {
                taskHeader.style.color = "orange";
            }
        }
    }

    function addTask() {
        let task = input.value.trim();
        if (task === "") {
            alert("You must write something to add!!");
            return;
        }

        let li = document.createElement("li");
        li.innerHTML = `
            <div class="in-list">
                <div class="il-left">
                    <input type="checkbox">
                    <span class="task-text">${task}</span>
                </div>
                <div class="il-right">
                    <button class="il-button edit">
                        <i class="fa-solid fa-pen" style="color:green; font-size:15px; padding:5px; border-radius:50%;"></i>
                    </button>
                    <button class="il-button trash">
                        <i class="fa-solid fa-trash-can" style="color:red; font-size:15px; padding:5px; border-radius:50%;"></i>
                    </button>
                </div>
            </div>
        `;

        let checkbox = li.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", function () {
            updateTaskCount();
            saveData();
        });

        let editBtn = li.querySelector(".edit");
        let trashBtn = li.querySelector(".trash");

        editBtn.addEventListener("click", function () {
            let span = li.querySelector(".task-text");
            let oldText = span.textContent;
            let inputEdit = document.createElement("input");
            inputEdit.type = "text";
            inputEdit.value = oldText;
            span.replaceWith(inputEdit);
            inputEdit.focus();

            inputEdit.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    let newText = inputEdit.value.trim();
                    if (newText !== "") {
                        let newSpan = document.createElement("span");
                        newSpan.className = "task-text";
                        newSpan.textContent = newText;
                        inputEdit.replaceWith(newSpan);
                        saveData();
                    }
                }
            });

            inputEdit.addEventListener("blur", function () {
                let newSpan = document.createElement("span");
                newSpan.className = "task-text";
                newSpan.textContent = inputEdit.value.trim() || oldText;
                inputEdit.replaceWith(newSpan);
                saveData();
            });
        });

        trashBtn.addEventListener("click", function () {
            li.remove();
            updateTaskCount();
            saveData();
        });

        lists.appendChild(li);
        input.value = "";
        updateTaskCount();
        saveData();
    }

    function loadData() {
        let data = localStorage.getItem("data");
        if (data) {
            lists.innerHTML = data;

            lists.querySelectorAll("li").forEach(function (li) {
                let checkbox = li.querySelector("input[type='checkbox']");
                let editBtn = li.querySelector(".edit");
                let trashBtn = li.querySelector(".trash");

                checkbox.addEventListener("change", function () {
                    updateTaskCount();
                    saveData();
                });

                editBtn.addEventListener("click", function () {
                    let span = li.querySelector(".task-text");
                    let oldText = span.textContent;
                    let inputEdit = document.createElement("input");
                    inputEdit.type = "text";
                    inputEdit.value = oldText;
                    span.replaceWith(inputEdit);
                    inputEdit.focus();

                    inputEdit.addEventListener("keypress", function (e) {
                        if (e.key === "Enter") {
                            let newText = inputEdit.value.trim();
                            if (newText !== "") {
                                let newSpan = document.createElement("span");
                                newSpan.className = "task-text";
                                newSpan.textContent = newText;
                                inputEdit.replaceWith(newSpan);
                                saveData();
                            }
                        }
                    });

                    inputEdit.addEventListener("blur", function () {
                        let newSpan = document.createElement("span");
                        newSpan.className = "task-text";
                        newSpan.textContent = inputEdit.value.trim() || oldText;
                        inputEdit.replaceWith(newSpan);
                        saveData();
                    });
                });

                trashBtn.addEventListener("click", function () {
                    li.remove();
                    updateTaskCount();
                    saveData();
                });
            });
        }
    }

    add.addEventListener("click", function () {
        addTask();
    });

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    loadData();
    updateTaskCount();
});
