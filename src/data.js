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
        ]
    },
    {
        level: "project",
        name: "gameProject",
        sections: []
    }
]



let AppStorage = [];
let selectedStorage = AppStorage //use this in case you wanna change it to local storage or whatever

export {AppStorage, selectedStorage}