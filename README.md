# FlowQuestJS

FlowQuest is an interactive flowchart and questionnaire JavaScript library all in one. It combines questions posed to users with an intelligent system of funneling to the necessary ends. To utilize it, all you need to provide is a schema JSON file that contains your questions, possible answers, and where you would like the user to be funneled to upon the particular answers.

#### FlowQuestJS Question Flow

![FlowQuestJS Flow](http://www.aspiremedia.net/wp-content/uploads/2015/11/FlowQuest-JS-Flow.png)


## How It Works

FlowQuest takes a specific question and answer flow provided via a JSON file, and creates a unique customized questionnaire. With the initial question being analogous to a root of a tree, subsequent questions are branched off specific answers. In the color demo below (included in repo) the user's selection of "yellow" as his favorite color hue, leads him to a question about the specific shade of yellow he prefers. The answer leads him to the name of the specific color he prefers.

#### Question 1:

![](http://www.aspiremedia.net/wp-content/uploads/2015/11/flowquest-color-1-e1448894342689.png)

#### Question 2:

![](http://www.aspiremedia.net/wp-content/uploads/2015/11/flowquest-color-2-e1448894426257.png)

#### Answer:

![](http://www.aspiremedia.net/wp-content/uploads/2015/11/flowquest-color-3-e1448894469132.png)

This is a simple example containing only two questions. FlowQuest is built in a way to allow for the highest levels of flexibility and extend to as many questions as one would want. All you need is a properly formatted configuration (JSON) file that FlowQuest recognizes.

## Configuration

FlowQuest expects a specifically formatted JSON file, which at a minimum needs the DOM container where FlowQuest will be used in, the set of questions to be asked, and the set of answers to be provided. Here's a sample configuration file used in the color demo mentioned above:

```JSON
{
    "containerID": "flowquest_container",
    "questions": {
        "1": {
            "question": "What is your favorite color hue?",
            "options": {
                "red": {
                    "label": "Red",
                    "val": "red",
                    "classes": "hue-red",
                    "nextQ": 2
                },
                "green": {
                    "label": "Green",
                    "val": "green",
                    "classes": "hue-green",
                    "nextQ": 3
                },
                "blue": {
                    "label": "Blue",
                    "val": "blue",
                    "classes": "hue-blue",
                    "nextQ": 4
                },
                "yellow": {
                    "label": "Yellow",
                    "val": "yellow",
                    "classes": "hue-yellow",
                    "nextQ": 5
                }
            }
        },
        "2": {
            "question": "What's your favorite shade of red?",
            "options": {
                "red-venetian": {
                    "label": "1",
                    "val": "red-venetian",
                    "classes": "red-venetian",
                    "nextQ": null
                },
                "red-folly": {
                    "label": "2",
                    "val": "red-folly",
                    "classes": "red-folly",
                    "nextQ": null
                },
                "red-scarlet": {
                    "label": "3",
                    "val": "red-scarlet",
                    "classes": "red-scarlet",
                    "nextQ": null
                },
                "red-burgundy": {
                    "label": "4",
                    "val": "red-burgundy",
                    "classes": "red-burgundy",
                    "nextQ": null
                },
                "red-firebrick": {
                    "label": "5",
                    "val": "red-firebrick",
                    "classes": "red-firebrick",
                    "nextQ": null
                },
                "red-dark": {
                    "label": "6",
                    "val": "red-dark",
                    "classes": "red-dark",
                    "nextQ": null
                },
                "red-orange": {
                    "label": "7",
                    "val": "red-orange",
                    "classes": "red-orange",
                    "nextQ": null
                }
            }
        },
        "3": {
            "question": "What's your favorite shade of green?",
            "options": {
                "green-lawn": {
                    "label": "1",
                    "val": "green-lawn",
                    "classes": "green-lawn",
                    "nextQ": null
                },
                "green-brunswick": {
                    "label": "2",
                    "val": "green-brunswick",
                    "classes": "green-brunswick",
                    "nextQ": null
                },
                "green-shamrock": {
                    "label": "3",
                    "val": "green-shamrock",
                    "classes": "green-shamrock",
                    "nextQ": null
                },
                "green-spring": {
                    "label": "4",
                    "val": "green-spring",
                    "classes": "green-spring",
                    "nextQ": null
                },
                "green-teal": {
                    "label": "5",
                    "val": "green-teal",
                    "classes": "green-teal",
                    "nextQ": null
                },
                "green-pantone": {
                    "label": "6",
                    "val": "green-pantone",
                    "classes": "green-pantone",
                    "nextQ": null
                },
                "green-turquoise": {
                    "label": "7",
                    "val": "green-turquoise",
                    "classes": "green-turquoise",
                    "nextQ": null
                }
            }
        },
        "4": {
            "question": "What's your favorite shade of blue?",
            "options": {
                "blue-royal": {
                    "label": "1",
                    "val": "blue-royal",
                    "classes": "blue-royal",
                    "nextQ": null
                },
                "blue-midnight": {
                    "label": "2",
                    "val": "blue-midnight",
                    "classes": "blue-midnight",
                    "nextQ": null
                },
                "blue-ultramarine": {
                    "label": "3",
                    "val": "blue-ultramarine",
                    "classes": "blue-ultramarine",
                    "nextQ": null
                },
                "blue-denim": {
                    "label": "4",
                    "val": "blue-denim",
                    "classes": "blue-denim",
                    "nextQ": null
                },
                "blue-baby": {
                    "label": "5",
                    "val": "blue-baby",
                    "classes": "blue-baby",
                    "nextQ": null
                },
                "blue-dark": {
                    "label": "6",
                    "val": "blue-dark",
                    "classes": "blue-dark",
                    "nextQ": null
                },
                "blue-cobalt": {
                    "label": "7",
                    "val": "blue-cobalt",
                    "classes": "blue-cobalt",
                    "nextQ": null
                }
            }
        },
        "5": {
            "question": "What's your favorite shade of yellow?",
            "options": {
                "yellow-bus": {
                    "label": "1",
                    "val": "yellow-bus",
                    "classes": "yellow-bus",
                    "nextQ": null
                },
                "yellow-sunglow": {
                    "label": "2",
                    "val": "yellow-sunglow",
                    "classes": "yellow-sunglow",
                    "nextQ": null
                },
                "yellow-rose": {
                    "label": "3",
                    "val": "yellow-rose",
                    "classes": "yellow-rose",
                    "nextQ": null
                },
                "yellow-canary": {
                    "label": "4",
                    "val": "yellow-canary",
                    "classes": "yellow-canary",
                    "nextQ": null
                },
                "yellow-cyber": {
                    "label": "5",
                    "val": "yellow-cyber",
                    "classes": "yellow-cyber",
                    "nextQ": null
                },
                "yellow-jasmine": {
                    "label": "6",
                    "val": "yellow-jasmine",
                    "classes": "yellow-jasmine",
                    "nextQ": null
                },
                "yellow-pantone": {
                    "label": "7",
                    "val": "yellow-pantone",
                    "classes": "yellow-pantone",
                    "nextQ": null
                }
            }
        }
    },
    "answers": {
        "patterns": {
            "red|red-venetian|": {
                "position": "Venetian Red",
                "content": "Your favorite color is Venetian Red."
            },
            "red|red-folly|": {
                "position": "Folly Red",
                "content": "Your favorite color is Folly Red."
            },
            "red|red-scarlet|": {
                "position": "Scarlet Red",
                "content": "Your favorite color is Scarlet Red."
            },
            "red|red-burgundy|": {
                "position": "Burgundy Red",
                "content": "Your favorite color is Burgundy Red."
            },
            "red|red-firebrick|": {
                "position": "Firebrick Red",
                "content": "Your favorite color is Firebrick Red."
            },
            "red|red-dark|": {
                "position": "Dark Red",
                "content": "Your favorite color is Dark Red."
            },
            "red|red-orange|": {
                "position": "Orange Red",
                "content": "Your favorite color is Orange Red."
            },
            "green|green-lawn|": {
                "position": "Lawn Green",
                "content": "Your favorite color is Lawn Green."
            },
            "green|green-brunswick|": {
                "position": "Brunswick Green",
                "content": "Your favorite color is Brunswick Green."
            },
            "green|green-shamrock|": {
                "position": "Shamrock Green",
                "content": "Your favorite color is Shamrock Green."
            },
            "green|green-spring|": {
                "position": "Spring Green",
                "content": "Your favorite color is Spring Green."
            },
            "green|green-teal|": {
                "position": "Teal Green",
                "content": "Your favorite color is Teal Green."
            },
            "green|green-pantone|": {
                "position": "Pantone Green",
                "content": "Your favorite color is Pantone Green."
            },
            "green|green-turquoise|": {
                "position": "Turquoise Green",
                "content": "Your favorite color is Turquoise Green."
            },
            "blue|blue-royal|": {
                "position": "Royal Blue",
                "content": "Your favorite color is Royal Blue."
            },
            "blue|blue-midnight|": {
                "position": "Midnight Blue",
                "content": "Your favorite color is Midnight Blue."
            },
            "blue|blue-ultramarine|": {
                "position": "Ultramarine Blue",
                "content": "Your favorite color is Ultramarine Blue."
            },
            "blue|blue-denim|": {
                "position": "Denim Blue",
                "content": "Your favorite color is Denim Blue."
            },
            "blue|blue-baby|": {
                "position": "Baby Blue",
                "content": "Your favorite color is Baby Blue."
            },
            "blue|blue-dark|": {
                "position": "Dark Blue",
                "content": "Your favorite color is Dark Blue."
            },
            "blue|blue-cobalt|": {
                "position": "Cobalt Blue",
                "content": "Your favorite color is Cobalt Blue."
            },
            "yellow|yellow-bus|": {
                "position": "School Bus Yellow",
                "content": "Your favorite color is School Bus Yellow."
            },
            "yellow|yellow-sunglow|": {
                "position": "Sunglow Yellow",
                "content": "Your favorite color is Sunglow Yellow."
            },
            "yellow|yellow-rose|": {
                "position": "Rose Yellow",
                "content": "Your favorite color is Rose Yellow."
            },
            "yellow|yellow-canary|": {
                "position": "Canary Yellow",
                "content": "Your favorite color is Canary Yellow."
            },
            "yellow|yellow-cyber|": {
                "position": "Cyber Yellow",
                "content": "Your favorite color is Cyber Yellow."
            },
            "yellow|yellow-jasmine|": {
                "position": "Jasmine Yellow",
                "content": "Your favorite color is Jasmine Yellow."
            },
            "yellow|yellow-pantone|": {
                "position": "Pantone Yellow",
                "content": "Your favorite color is Pantone Yellow.",
                "classes": "yellow-pantone"
            }
        }
    }
}
```

### Attributes

**containerID** (*required*) - the DOM element in which FlowQuest will be used.

**questions** (*required*) - the object of questions with each having its unique ID.

**answers** (*required*) - the object of answer patterns to be matched with the set of questions.

**classes** (*optional*) - both the questions and answer patterns may include this property with the list of classes to be assigned to question or answer elements to customize how you'd like those elements to look/function. In the color demo, this was used to add the specific color of the question and answer elements.
