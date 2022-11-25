const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const login = require('../models/login_model');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

router.post('/', 
  function(request, response) {
    if(request.body.username && request.body.passhash){
      const username = request.body.username;
      const passhash = request.body.passhash;
      console.log(username);
      console.log(passhash);

        login.checkpasshash(username, function(dbError, dbResult) {
          if(dbError){
            response.json(dbError);
          }
          else{
            if (dbResult.length > 0) {
              bcrypt.compare(passhash,dbResult[0].passhash, function(err,compareResult) {
                if(compareResult) {
                  console.log("succes");
                //   const token = generateAccessToken({ username: username });
                //   response.send(token);
                }
                else {
                    console.log("wrong passhash");
                    response.send(false);
                }			
              }
              );
            }
            else{
              console.log("user does not exists");
              response.send(false);
            }
          }
          }
        );
      }
    else{
      console.log("username or passhash missing");
      response.send(false);
    }
  }
  
);

// function generateAccessToken(username) {
//   dotenv.config();
//   return jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '18000s' });
// }

module.exports=router;