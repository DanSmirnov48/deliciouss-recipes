To run the site, open terminal and make sure it is in the project's directory.
In the terminal type 'node server' & 'npm start', this will start the server and the application.
navigate to http://localhost:3000 to view the site
navigate to http://localhost:8000/reivews to view the JSON reviews

/src/utils.js stores the api keys and JSON server url
if running from localhost, url should be JSON_API = 'http://localhost:8000/api'
deployed version should use JSON_API = 'https://deliciouss-recipes.herokuapp.com/api'
UNCOMMENT THE RELEVANT OPTION AND COMMENT OUT THE ORHER ONE!!!

application uses external API to fetch recepies. 
api can only be called 150 times per day.
/src/utils.js contains 2 keys 
if while running the app, an alert pops us saying API limit reached, comment out the current SPOONACULAR_API_KEY const and uncomment the other one, app will use the second key to call api!!!

Design Changes
-Home screen did not recieve any design changes
-Search screen got added an aditional select menu for diets, user will be able to filter recipes based on   their diets now too.
-Recipe page recived a number of changes compare to design docs. Minor UI chages like buttons and ingrediets got a new placement on the screen. A few elements got added to the UI. Rating section moved to the bottom and review section which was not on design dosc got added.
-Menu screen remaind the same, a button for each recipe to do to the details got added incase user needs a quick access to the full recipe page
-Ingredients recived a number of changes. A better UI now includes an option to manually add ingredients to the shopping list, an option to remove individual ingredients and a button to remove all

Design docs did not include Nutrition page, a finished application does not include this page and can be navigated to by clicking 'Nutrition' on the nav bar

Menu and Shopping list are stored in Local storage on users browser
Reviews and Rating is stored on JSON server and are visible to all users.


A deployed application can be viewd at - https://deliciouss-recipes.herokuapp.com