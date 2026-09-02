import {LevelSelector, findComponent} from './storage.js'
//get project level
    // for every project make a new project div and add it's name as it's title
    //get the section level of that project
        //for every section add its section div

let projectsList = document.querySelector(".projects-list")
let updateSideBar = () => {
    console.log("updater running");
    
    projectsList.innerHTML = "";
    let projects = LevelSelector().project;
    for (let project of projects) {
        
        let sections = LevelSelector(project.name).section

        //TODO: put all the info in corresponding divs
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
export{updateSideBar}