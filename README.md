# melhor_comunica-o_challenge_backend

### Install: 
 Run `npm install` to install all packages and dependecies from project;
 
### Create database:
on your own machine run or copy the content from databaseSettings.sql and run the commands to create the database and tables;


### Running the API application:

  you can use `ǹodemon app.js` or `ǹode app.js` I strongly recomend use nodemon, but you can choose.

## setup node to connect with Mysql
 inside the mobileRoutes.js, you can change the connection
 `{
        host:"localhost",
        user:"YourUserName",
        password:"YourPassWord",
        database: 'challenge_melhorcom'
    }`
    there u can set your mysql configuration;
  
### Request from insomnia and postman:

 use the url `http://localhost:8000`,
 
 `/devices` is used to show all devices 
  `GET` on devices will show all device stored in database, you can pass a device id or "codigo" to get a specific device `/device/:model?`;
  `POST` here you can Create new device, send in via insomnia using the form URL encoder option to set the body;
  `PUT` here u can update a device using the device code as a parameter, and send all informations except the device code.
  `DELETE` here u can delete a device using the device code as a parameter;
  
  

