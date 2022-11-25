const db = require("../database");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const user = {
        getById: function(id, callback) {
          return db.query('select * from usertable where id=?', [id], callback);
        },
        getAll: function(callback) {
          return db.query('select * from usertable', callback);
        },
        add: function(usertable, callback) {
          bcrypt.hash(usertable.passhash, saltRounds, function(err, hash) {
          return db.query(
            'insert into usertable (username, passhash) values(?,?)',
            [usertable.username, hash],
            callback
          );
          });
        },
        delete: function(id, callback) {
          return db.query('delete from usertable where id=?', [id], callback);
        },
        update: function(id, usertable, callback) {
          bcrypt.hash(usertable.passhash, saltRounds, function(err, hash) {
          return db.query(
            'update usertable set username=?, passhash=?',
            [usertable.username, hash],
            callback
          );
          });
        }
      };
      module.exports = user; 