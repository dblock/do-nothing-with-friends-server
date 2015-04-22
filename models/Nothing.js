var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NothingSchema = new Schema({
  uuid: { type: String, index: { unique: true }, required: true },
	started_at: { type: Date, index: true, required: true },
  ended_at: Date
});

var Nothing = mongoose.model('Nothing', NothingSchema);

module.exports = Nothing;
