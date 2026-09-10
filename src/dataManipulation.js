import { LevelSelector } from "./storage.js";
import { selectedStorage } from "./data.js";

let addComponent = (familyTree = [], level, name, description = "",
                     dueDate = "", priority = 1, checked = false)=> {
    //example use: addComponent(["myRoutine", "morning", "food"], "todos", "whatever", "", "", number, bool)

        if (!level || !name) {
        throw new Error("please assign level and name to function: Add")
    }
    

    let storageLevel;
    if (level == "todoItem") storageLevel = "todos"
    else storageLevel = level
    let selectedLevel = LevelSelector(...familyTree)[storageLevel]; //works
    if (!selectedLevel) throw new Error("Invalid storage address assigned for function: addcomponent")

    if (storageLevel == "todos") {
        let itemToAdd = {
            level: level, name: name, description: description, dueDate: dueDate,
            priority: priority, checked: checked,
        }
        selectedLevel.push(itemToAdd)
    }
    else {
        let itemToAdd = {level: level, name: name,}
        selectedLevel.push(itemToAdd)
    }
    let addedItem = selectedLevel.find(obj => obj.name == name)
    
    if (level == "project") addedItem.sections = []
    else if (level == "section") addedItem.groups = []
    else if (level == "group") addedItem.todos = []

    
    console.log("updated storage:");
    console.log(selectedStorage);

}

let deleteComponent = (familyTree = [], level, name)=> {
    //example use deleteComponent(["myRoutine", "morning", "food"], "todos", "feed the cat")

        if (!level || !name) {
        throw new Error("please assign level and name to function: deleteComponent")
    }
    

    //get the index of the item to be deleted
    //delete it with splice(index, 1)
    let selectedLevel = LevelSelector(...familyTree)[level]; //works
    if (!selectedLevel) throw new Error("Invalid storage address assigned for function: deletecomponent")

    
    let itemIndex = selectedLevel.findIndex(obj => obj.name == name)
    selectedLevel.splice(itemIndex, 1)
    

    
    console.log("updated storage level:");
    console.log(selectedLevel);

}



let editComponent = (familyTree = [], name, levelOfTarget)=> {
    //example use: editComponent(["myRoutine", "morning", "food"], todoItem, "feed the cat").editName("new name")

        if (!name) {
        throw new Error("please assign a name of the target to be edited in function: editComponent")
    }


    let target = findComponent(name, levelOfTarget, familyTree);   

    let editName = (newName)=> {
        target.name = newName;
    }
    let editDescription = (newDescription)=> {
        if (target.level == "todoItem") target.description = newDescription
    }
    let editDueDate = (newDueDate)=> {
        if (target.level == "todoItem") target.dueDate = newDueDate
    }
    let editPriority = (newPriority)=> {
        if (target.level == "todoItem") target.priority = newPriority
    }
    let editChecked = (newChecked)=> {
        if (target.level == "todoItem") target.checked = newChecked
    }


    return {
        "editName": editName,
        "editDescription": editDescription,
        "editDueDate": editDueDate,
        "editPriority": editPriority,
        "editChecked": editChecked}
}

export {addComponent, deleteComponent, editComponent}