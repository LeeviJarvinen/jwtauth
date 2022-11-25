const db = require('../database');

const login={
  checkpasshash: function(username, callback) {
      return db.query('SELECT passhash FROM usertable WHERE username = ?',[username], callback); 
    }
};
          
module.exports = login;