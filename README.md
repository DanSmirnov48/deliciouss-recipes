# Deliciouss Recipes
![GitHub top language](https://img.shields.io/github/languages/top/DanSmirnov48/deliciouss-recipes)
![GitHub repo size](https://img.shields.io/github/repo-size/DanSmirnov48/deliciouss-recipes)
![GitHub last commit](https://img.shields.io/github/last-commit/DanSmirnov48/deliciouss-recipes)
## Instalation

This app requires [node.js](https://nodejs.org/) v14+ to run. <br />
To run the site, open terminal and make sure it is in the project's directory <br />
Install the dependencies and start the server. <br />

```sh
npm i
node server
npm start
```
navigate to http://localhost:3000 to view the site <br />
navigate to http://localhost:8000/reivews to view the JSON reviews <br />

### API Note
application uses external API to fetch recepies & can only be called 150 times per day.
```sh
/src/utils.js
```
file contains 2 keys, if while running the app, an alert pops up saying API limit reached, comment out the current SPOONACULAR_API_KEY const and uncomment the other one, app will use the second key to call api!!!

<a href="https://ibb.co/mtj5vPW"><img src="https://i.ibb.co/K7PxN8v/carbon.png" alt="carbon" border="0"></a>

## Features

- Search numerous popular and easy to cook recipes
- Filter recipes by removing missing/undesired ingredients, add special diets e.g. Vegan
- View desired recipe full page with ingredients, instructions, prep/cook times, view it's nutritional value
- Rate and comment any recipe. View other users' rating and comments
- Save liked recipes by adding then to the menu. Storing the menu on Local Storage on urse's browser 
- Add ingredients of any recipe to a shopping list. Storing the shoppling list on Local Storage on urse's browser
- Search nutritional value of an ingredient
- Reviews are being saved to [json-server](https://www.npmjs.com/package/json-server)

## Design Changes
- Home screen did not recieve any design changes
- Search screen got added an aditional select menu for diets, user will be able to filter recipes based on their diets now too.
- Recipe page recived a number of changes compare to design docs. Minor UI chages like buttons and ingrediets got a new placement on the screen. A few elements got added to the UI. Rating section moved to the bottom and review section which was not on design dosc got added.
- Menu screen remaind the same, a button for each recipe to do to the details got added incase user needs a quick access to the full recipe page
- Ingredients recived a number of changes. A better UI now includes an option to manually add ingredients to the shopping list, an option to remove individual ingredients and a button to remove all

### Initail design frames can be found <a href="https://drive.google.com/file/d/1CyIyuuBeVRdjRwvGwIeExC_he9Q9LMlN/view?usp=sharing" target="_blank">here</a>
### A deployed application can be found <a href="https://deliciouss-recipes.herokuapp.com" target="_blank">here</a>
