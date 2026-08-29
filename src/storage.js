import { selectedStorage } from "./data.js";

let LevelSelector = (projectName, sectionName, groupName)=> {  //selects a level from the hierarchy in the storage 
    //example use: let morningFood = LevelSelector("myRoutine", "morning", "food").todos
    let projectLevel = selectedStorage;
    
    let sectionLevel;
    if (projectName) {
        sectionLevel = projectLevel.find(obj => obj.name === `${projectName}`).sections;
    }

    let groupLevel;
    if (sectionName) {
        groupLevel = sectionLevel.find(obj => obj.name === `${sectionName}`).groups;
    }
    let todosLevel;
    if (groupName) {
        todosLevel = todosLevel = groupLevel.find(obj => obj.name === `${groupName}`).todos
    }
    

    return {project: projectLevel, section: sectionLevel, group: groupLevel, todos: todosLevel}
}


let findComponent = (targetName, levelOfTarget, familyTree = []) => {
    //example usd: findComponent("feed the cat", "todos", ["myRoutine", "morning", "food"]);   
    let selectedLevel = LevelSelector(...familyTree)[levelOfTarget]
        if (!selectedLevel) throw new Error(`${targetName} from this family tree: ${familyTree} doesn't exist`);

    let component = selectedLevel.find(obj => obj.name === `${targetName}`); 
        if (!component) throw new Error(`${targetName} doesn't exist`);
    return component
}

export {LevelSelector, findComponent}