import {LevelSelector, findComponent} from './storage.js'
import { addComponent, editComponent, deleteComponent} from './dataManipulation.js';

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
                    <button id="add-section-btn" class="open-addWindow-btn" data-owner="section">add</button>
                    <button id="delete-project-btn" class="delete-btn" data-level="project" data-familyTree="${project.name}" data-deleteTarget="${project.name}">delete</button>
                </div>
                <div class="project-details">
                    <div class="project-title">
                        <h1 class="project-name">${project.name}</h1>
                        <button class="edit-btn">EDIT</button>
                    </div>    
                    <div class="sections">
                        <ul>
                            ${sections.map(section => `<li class="section">${section.name}</li> <button class="delete-section-btn delete-btn" data-level="section" data-familyTree="${project.name}, ${section.name}" data-deleteTarget="${section.name}">DELETE</button>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
                `
        
    }
    
}

//          have a variable to track which section is selected
let selectedProjectAndSection = ["myRoutine", "morning"];
let updateMainBody = () => {
    
    let body = document.querySelector(".groups-list")
    let addGroupBtn = document.querySelector("#add-group-btn")
    body.innerHTML = "";

    // If no active project/section is selected, early return
    addGroupBtn.disabled = false
    if (!selectedProjectAndSection[0] || !selectedProjectAndSection[1]) {
        if (addGroupBtn) addGroupBtn.disabled = true;
        return;
    }

    let targetData = LevelSelector(selectedProjectAndSection[0], selectedProjectAndSection[1]);

    // Safety check in case LevelSelector returns undefined
    if (!targetData || !targetData.group) {
        return;
    }
    
    let groups = LevelSelector(selectedProjectAndSection[0], selectedProjectAndSection[1]).group
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





//opened window
let body = document.querySelector("body")
let window = document.querySelector(".details-window")
let chosenGroup;

//update todos in opened window
let updateWindow= () => {
    let targetFamilyTree = LevelSelector(selectedProjectAndSection[0], selectedProjectAndSection[1], chosenGroup)
    let targetTodos = targetFamilyTree.todos
    let titlePlace = window.querySelector(".window-title")
    let todosPlace = window.querySelector(".window-todos")

    titlePlace.textContent = targetFamilyTree.group[0].name
    targetTodos.sort((a, b) => a.priority - b.priority);

    console.log(targetTodos);
    
    // Render todos:
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
                <button class="delete-todo-btn delete-btn" 
                        data-level="todos" 
                        data-familytree="${selectedProjectAndSection[0]}, ${selectedProjectAndSection[1]}, ${chosenGroup}" 
                        data-deletetarget="${todo.name}">DELETE</button>
            </div>
        `
    }

    // Render group delete button:
    let buttonsPlace = document.querySelector(".window-buttons")
    buttonsPlace.innerHTML = `
        <button class="delete-todo-btn delete-btn" 
                data-level="group" 
                data-familytree="${selectedProjectAndSection[0]}, ${selectedProjectAndSection[1]}" 
                data-deletetarget="${chosenGroup}">DELETE</button>
        <button id="add-todo-btn" class="open-addWindow-btn" data-owner="todo">ADD</button>
`
    
    
}




//form input
// take input  if that input is a todoItem then render form for todoItem
//     else render a window to take a name only
// after taking the data use addComponent() to add to storage





let renderAddWindow = (inputType)=> {
    let windowForm = document.querySelector('#input-form')
    windowForm.innerHTML = ''

    let windowTitle = addWindow.querySelector('.window-title')
    windowTitle.textContent = `Add a ${inputType}`

    if (inputType == 'todo') {
        //create forms
        windowForm.innerHTML = `
        <label for="priority-input">Priority</label>
        <input type="number" id="priority-input" name="priority" value=1>
        <label for="name-input">Name</label>
        <input type="text" id="name-input" name="name" placeholder="name" required>
        <label for="description-input">descriprion</label>
        <textarea type="text" id="description-input" rows="5" cols="50" name="description" placeholder="describe your todo"></textarea>
        <label for="dueDate-input">Due date</label>
        <input type="date" id="dueDate-input" name="date">
        <input type="submit" value="create" class="submit-form-btn">
        `
    }
    else {
        //create forms
        windowForm.innerHTML = `
            <label for="name-input">Name</label>
            <input type="text" id="name-input" placeholder="something" name="name" required>
            <input type="submit" value="create" class="submit-form-btn">
        `
    }
}

//event listeners
let addWindow = document.querySelector('.add-window')
let targetAddName;
let targetAddProject;

body.addEventListener('click', (e)=> {
    //update body from selected section
    if (e.target.classList.contains("section")) {
        selectedProjectAndSection[0] = e.target.closest('.project').querySelector('.project-name').textContent;
        selectedProjectAndSection[1] = e.target.textContent;
        
        updateMainBody()
    }
    

    
    // show / hide group window
    if (e.target.classList.contains("group")) {
        window.classList.toggle("hide")
        chosenGroup = e.target.querySelector(".group-title").textContent 
        updateWindow();
    }
    else if (e.target.classList.contains("close-window-btn")) {
        window.classList.toggle("hide")
    }


    //show / hide windows
    else if (e.target.classList.contains("open-addWindow-btn")) {
        targetAddName = e.target.dataset.owner
        if (targetAddName === "section") {
            targetAddProject = e.target.closest('.project').querySelector('.project-name').textContent;
        }

        addWindow.classList.toggle("hide")
        renderAddWindow(e.target.dataset.owner)
    }
    else if (e.target.classList.contains("close-addWindow-btn")) {
        addWindow.classList.toggle("hide")
    }

    //delete button
    
    if (e.target.classList.contains("delete-btn")) {
        console.log("delete button pressed");
        
        
        // Convert comma-separated string attribute to an array of trimmed strings
        let familyTree = e.target.dataset.familytree 
            ? e.target.dataset.familytree.split(',').map(s => s.trim()) 
            : [];
            console.log(familyTree);
        let level = e.target.dataset.level;
        let target = e.target.dataset.deletetarget;
        
        deleteComponent(familyTree, level, target);

        // If deleting the active project or section, reset selection
        if (level === "project" && target === selectedProjectAndSection[0]) {
            selectedProjectAndSection = ["", ""];
        } else if (level === "section" && target === selectedProjectAndSection[1] && familyTree[0] === selectedProjectAndSection[0]) {
            selectedProjectAndSection[1] = ""; 
        }

        // Close or refresh modal on group/todo deletion
        if (level === "group") {
            window.classList.add("hide");
        } else if (level === "todos") {
            updateWindow();
        }

        updateSideBar();
        updateMainBody();
    }

})

let form = document.querySelector('#input-form')

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const formData = new FormData(form)
    let data = Object.fromEntries(formData.entries())
    if (targetAddName == 'todo') {
        addComponent([selectedProjectAndSection[0], selectedProjectAndSection[1], chosenGroup],
                    "todos", data.name, data.description, data.dueDate, data.priority, false);
        updateWindow()
    }
    else {
        let familyTree = targetAddName === "section" ? [targetAddProject] : [selectedProjectAndSection[0], selectedProjectAndSection[1]];
        addComponent(familyTree,targetAddName, data.name);
        updateMainBody()
        updateSideBar()
    }
    addWindow.classList.toggle("hide")
})



// wire button to functions

    // delete buttons

    // edit buttons

















export{updateSideBar, updateMainBody}