# FlowQuestJS

FlowQuest is an interactive flowchart and questionnaire JavaScript library all in one. It combines questions posed to users with an intelligent system of funneling to the necessary ends. To utilize it, all you need to provide is a schema JSON file that contains your questions, possible answers, and where you would like the user to be funneled to upon the particular answers.

#### FlowQuestJS Question Flow

![FlowQuestJS Flow](http://www.aspiremedia.net/wp-content/uploads/2015/11/FlowQuest-JS-Flow.png)


## How It Works

FlowQuest takes a specific question and answer flow provided via a JSON file, and creates a unique customized questionaire. With the initial question being analogous to a root of a tree, subsequent questions are branched off specific answers. In the color demo below (included in repo) the user's selection of "yellow" as his favorite color hue, leads him to a question about the specific shade of yellow he prefers. The answer leads him to the name of the specific color he prefers.

#### Question 1:

![](http://www.aspiremedia.net/wp-content/uploads/2015/11/flowquest-color-1-e1448894342689.png)

#### Question 2:

![](http://www.aspiremedia.net/wp-content/uploads/2015/11/flowquest-color-2-e1448894426257.png)

#### Answer:

![](http://www.aspiremedia.net/wp-content/uploads/2015/11/flowquest-color-3-e1448894469132.png)

This is a simple example containing only two questions. FlowQuest is built in a way to allow for highest levels of flexibility and extend to as many questions as one would want. All you need is a properly formatted JSON file that FlowQuest recognizes.
