Crawlr
=======
Find/Create bar crawls near you or anywhere!  

Questions?
==========
Contact us in slack!  

Team
-----
* `Product Owner` : Sam Donner  
* `Scrum Master` : Ryan Morrow  
* `Development Team Members` : Kevin Doddy, Kevin Maitski  

Requirements
-------------
MongoDB server  
node

Development
------------
Specifics in package.json

Installing Dependencies
------------------------
run mongoDB server  
  
From within the root directory:  
```javascript 
npm install  
npm start  
```

Development info:
------------------
```
Localhost port = 1337  
Mongo database = crawlr  
Passport configs in config directory  
[npm run test] -> Testing with mocha(test directory) and circleci(.circleci directory)  
[npm run client-watch] for constant webpack compiling  
index.jsx -> main component  
```
```
database/collections will generate when you input info to site  
for passport-facebook, edit the auth config and your own facebook dev api  
for google apis -> enable places, javascript maps, geocode, embed map, directions  
```

Contributing
-------------
Be the first!
