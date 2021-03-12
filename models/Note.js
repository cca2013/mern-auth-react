const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({

  title: String,
  
  body: String,
 

comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
],
 dateCreated: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Note', NoteSchema);
