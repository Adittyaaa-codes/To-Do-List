document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const add = document.getElementById("add");
    const lists = document.getElementById("list");
    const taskHeader = document.getElementById("task-header");

    function saveData() {
        localStorage.setItem("data", list.innerHTML);
    }

    function updateTaskCount() {
        const total = lists.children.length;
        const completed = lists.querySelectorAll("input[type='checkbox']:checked").length;

        taskHeader.textContent = `Task Completed - ${completed}/${total}`;

        if (total === 0) {
            taskHeader.textContent = "Enter your tasks!!";
            taskHeader.style.textAlign = "center";
            taskHeader.style.color = "white";
            return;
        }

        const percentage = (completed / total) * 100;

        if (percentage < 50) {
            taskHeader.style.color = "red";
        } else if (completed === total) {
            taskHeader.style.color = "green";
        } else {
            taskHeader.style.color = "orange";
        }
        saveData();
    }

    updateTaskCount();

    function addTask() {
        if (input.value === "") {
            alert("You must write something to add!!");
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
        <div class="in-list">
        <div class="il-left">
        <input type="checkbox" name="" id="checkbox">${input.value} 
                        </div>
                        <div class="il-right">
                            <button class="il-button edit" ><i class="fa-solid fa-pen" style="color:green; font-size:15px; padding:5px; border-radius:50%;"></i></button>
                            <button class="il-button trash"><i class="fa-solid fa-trash-can" style="color:red; font-size:15px; padding:5px; border-radius:50%;"></i></button>
                        </div>
                    </div>`;

        lists.appendChild(li);
        input.value = "";

        const checkbox = li.querySelector("input[type='checkbox']");
        updateTaskCount();
        checkbox.addEventListener("change", () => {
            updateTaskCount();
        });


        const del = li.querySelector(".trash");
        const edit = li.querySelector(".edit");


        del.addEventListener("click", () => {
            li.remove();
            updateTaskCount();
        });


        edit.addEventListener("click", () => {
            li.innerHTML = `<input type="text" id="edit-input" value="${li.innerText.trim()}" />`;

            const inputBox = li.querySelector("#edit-input");

            inputBox.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    const newText = inputBox.value.trim();
                    li.innerHTML = `<div class="in-list">
        <div class="il-left">
        <input type="checkbox" name="" id="checkbox">${newText} 
                        </div>
                        <div class="il-right">
                        <button class="il-button trash"><i class="fa-solid fa-trash-can" style="color:red; font-size:15px; padding:5px; border-radius:50%;"></i></button>
                        </div>
                    </div>`;
                    updateTaskCount();
                    const del = li.querySelector(".trash");
                    del.addEventListener("click", () => {
                        li.remove();
                        updateTaskCount();
                    });
                }
            });
        });
        updateTaskCount();
        saveData();
    }



    add.addEventListener("click", () => {
        addTask();
    });
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });


    function loadData() {
        const data = localStorage.getItem("data");
        if (data) {
            lists.innerHTML = data;
            lists.querySelectorAll("li").forEach(li => {
                const checkbox = li.querySelector("input[type='checkbox']");
                checkbox.addEventListener("change", () => {
                    updateTaskCount();
                    saveData();
                });
            });
        }

    }
        function saveData() {
        localStorage.setItem("data", list.innerHTML);
    }

        updateTaskCount();
        loadData();
})
