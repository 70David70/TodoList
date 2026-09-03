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
                            ${sections.map(section => `<li class="section">${section.name}</li>`).join('')}
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
    console.log(selectedProjectAndSection);
    
    let groups = LevelSelector(selectedProjectAndSection[0], selectedProjectAndSection[1]).group
    let body = document.querySelector(".content-area")
    body.innerHTML = "";
    for (let group of groups) {
        body.innerHTML += `
            <div class="group">
                <h1 class="group-title"> ${group.name}</h1>
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




















export{updateSideBar, updateMainBody}