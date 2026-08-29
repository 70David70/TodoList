import { AppStorage, selectedStorage } from './data.js';
import { LevelSelector, findComponent } from './storage.js';
import { addComponent, deleteComponent, editComponent } from './dataManipulation.js';


addComponent([], "project", "first project")
addComponent(["first project"], "section", "teams")
addComponent(["first project", "teams"], "group", "marketing todos")
addComponent(["first project", "teams"], "group", "development todos")
deleteComponent([], "project", "first project")

