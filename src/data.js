let temporaryData = [
    {
        level: "project",
        name: "myRoutine",
        sections: [
            {
                level: "section",
                name: "morning",
                groups: [
                    {
                        level: "group",
                        name: "food",
                        todos: [
                            {
                                level: "todoItem",
                                name: "feed the cat",
                                description: null,
                                dueDate: null,
                                priority: null,
                                notes: null,
                                checked: false,
                            },
                        ]
                    },
                ]
            },
            {
                level: "section",
                name: "night",
                groups: [
                    {
                        level: "group",
                        name: "sleep",
                        todos: [
                            {
                                level: "todoItem",
                                name: "prepare environment",
                                description: null,
                                dueDate: null,
                                priority: null,
                                notes: null,
                                checked: false,
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        level: "project",
        name: "gameProject",
        sections: [
            {
                level: "section",
                name: "graphics",
                groups: [
                    {
                        level: "group",
                        name: "lighting system",
                        todos: [
                            {
                                level: "todoItem",
                                name: "start coding",
                                description: null,
                                dueDate: null,
                                priority: null,
                                notes: null,
                                checked: false,
                            },
                        ]
                    },
                ]
            },
        ]
    }
]



let AppStorage = [];
let selectedStorage = temporaryData //use this in case you wanna change it to local storage or whatever

export {AppStorage, selectedStorage}