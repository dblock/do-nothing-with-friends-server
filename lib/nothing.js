var Nothing = require('../models/Nothing');
var Q = require('q');

var nothing = {

  start: function (uuid, ts) {
    return Nothing.update({ uuid: uuid }, { $set: { uuid: uuid, started_at: ts, ended_at: null } }, { upsert: true });
  },

  stop: function (uuid, ts) {
    return Nothing.where({ uuid: uuid }).findOne().then(function(record) {
      var deferred = Q.defer();
      if (record) {
        record.ended_at = ts;
        Q.when(record.save(), deferred.resolve);
      } else {
        deferred.reject(new Error('Not Found'));
      }
      return deferred.promise;
    });
  },

  count: function() {
    return Nothing.count({ ended_at: null });
  }
};

module.exports = nothing;
