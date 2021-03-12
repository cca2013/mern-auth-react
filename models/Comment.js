const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
 _creator : { type: Schema.ObjectId, ref: 'Note' },
	 note: {	    type: Schema.Types.ObjectId,	    ref: 'Note',	  },
	 
	username: String,
    text: String,
   createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Comment', commentSchema);