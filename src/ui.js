import {LevelSelector, findComponent} from './storage.js'

let projectsList = document.querySelector(".projects-list")
let updateSideBar = () => {
    console.log("updater running");
    
    projectsList.innerHTML = "";
    let projects = LevelSelector().project;
    for (let project of projects) {        
        let sections = LevelSelector(project.name).section

        projectsList.innerHTML += `
            <div class="project">
                <div class="project-header">
                    <button id="add-project-btn">add</button>
                    <button id="delete-project-btn">delete</button>
                </div>
                <div class="project-details">
                    <div class="project-title">
                        <h1 class="project-name">${project.name}</h1>
                        <button class="edit-btn">EDIT</button>
                    </div>    
                    <div class="sections">
                        <ul>
                            ${sections.map(section => `<li class="section">${section.name}</li> <button class="delete-section-btn">DELETE</button>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
                `
        
    }
    
}

//TODO: Create a update updateMainBody()
//          have a variable to track which section is selected
//          show the groups of the section in the main body
let selectedProjectAndSection = ["myRoutine", "morning"];
let updateMainBody = () => {
    
    let groups = LevelSelector(selectedProjectAndSection[0], selectedProjectAndSection[1]).group
    let body = document.querySelector(".groups-list")
    body.innerHTML = "";
    for (let group of groups) {
        body.innerHTML += `
            <div class="group">
                <h1 class="group-title">${group.name}</h1>
                <ul class="group-todos">
                    ${group.todos.map(item => `<li class="group-todo-item">${item.name}</li>`).join('')}        
                </ul>
            </div>
        `
    }
}



//buttons
let sideBar = document.querySelector(".sidebar")
sideBar.addEventListener('click', (e)=> {
    if (e.target.classList.contains("section")) {
        selectedProjectAndSection[0] = e.target.closest('.project').querySelector('.project-name').textContent;
        selectedProjectAndSection[1] = e.target.textContent;
        
        updateMainBody()
    };
    
})


//opened window
let body = document.querySelector("body")
let window = document.querySelector(".details-window")
let chosenGroup;

//TODO: finish this function to display group information into an opened window
let updateWindow= () => {
    let targetFamilyTree = LevelSelector(selectedProjectAndSection[0], selectedProjectAndSection[1], chosenGroup)
    let targetTodos = targetFamilyTree.todos
    let titlePlace = window.querySelector(".window-title")
    let todosPlace = window.querySelector(".window-todos")

    titlePlace.textContent = targetFamilyTree.group[0].name
    targetTodos.sort((a, b) => b.priority - a.priority);

    console.log(targetTodos);
    
    //render todos:
    todosPlace.innerHTML = ""
    for (let todo of targetTodos) {
        todosPlace.innerHTML += `
            <div class="window-todo-item" id="${todo.name}">
                <p class="todo-priority">${todo.priority}</p>
                <input type="checkbox" ${todo.checked ? 'checked' : ''}> <h2>${todo.name}</h2> 
                <div class="todo-item-info">
                    ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
                    ${todo.dueDate ? `<p class="todo-duedate">${todo.dueDate}</p>` : ''}
                </div>
                <button class="delete-todo-btn">DELETE</button>
            </div>
        `
    }
    
    
}


//open window || close window
body.addEventListener('click', (e)=> {
    if (e.target.classList.contains("group") || e.target.classList.contains("close-window-btn")) {
        window.classList.toggle("hide")
    }
        //TODO: use updateWindow to view info
        if (e.target.classList.contains("group")) {
            chosenGroup = e.target.querySelector(".group-title").textContent 
            updateWindow();
        }
        
})
















export{updateSideBar, updateMainBody}