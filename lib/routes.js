var Nothing = require('./../models/Nothing');
var nothing = require('./nothing');

module.exports = {
  start: function (req, res) {
    nothing.start(req.body.uuid, new Date()).then(
      function (record) {
        return nothing.count().then(function (count) {
          res.status(201).json({ count: count });
        });
      },
      function (err) {
        res.json({ error: err.toString() });
      }
    );
  },

  stop: function (req, res) {
    nothing.stop(req.body.uuid, new Date()).then(
      function (record) {
        return nothing.count().then(function (count) {
          res.json({ count: count });
        });
      },
      function (err) {
        if (err.message === 'Not Found') {
          res.status(404).json({ error: 'Not Found' });
        } else {
          res.json({ error: err.toString() });
        }
      }
    );
  },

  count: function (req, res) {
    nothing.count().then(
      function (count) {
        res.json({ count: count });
      },
      function (err) {
        res.json({ error: err.toString() });
      }
    );
  }
};
