const express = require('express');

const router = express.Router();

const Comment = require('../models/Comment');
const Note = require('../models/Note');
var id="hello"

//GET to dashboard
router.get('/add/:id', (req, res) => {
	 id=req.params.id;
	 console.log(id+"   : this is what i got from dashboard");
  res.render('comments/add',{ id: id });
});

router.post('/add',  async (req, res) => {
    try {
	   const comment = await Comment.create(req.body);
		id=req.body.noteId;
		comment._creator=id;
        await comment.save;
	   
	const note= await Note.findByIdAndUpdate(id,
    {$push: {comments: comment}});
   
        note.save;
		res.redirect('/dashboard');
	  //res.status(200).json({success:true, note});

	} catch (err) {
   res.status(400).json({success: false, message:err.message})
  }
});


router.get('/list/:id',  async (req, res) => {
 id=req.params.id;

try {
    const note = await Note.findById(id).populate("comments").lean();
    res.render('comments/list',note);
  } catch (err) {
    console.log(err);
  }
 
});


router.get('add/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).lean();
    res.render('comments/read', { note });
  } catch (err) {
    console.log(err);
  }
});
router.get('/edit/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).lean();
    res.render('comments/edit', { comment });
  } catch (err) {
    console.log(err);
  }
});
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { username: req.body.username, text: req.body.text },
    );
    res.redirect('/dashboard');
  } catch (er) {
    console.log(er);
  }
});

router.delete('/delete', async (req, res) => {
  try {
	  const commentId=req.body.commentId;
	  const noteId=req.body.noteId;
	  // const note = await Note.findById(req.body.noteId);
    await Comment.findOneAndRemove({ _id: commentId});
     res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;




	//var aaron = new Note({ title: 'Aaron', body: 100 });

	//aaron.save(function (err) {

  //var comment1 = new Comment({
    //  username: "A man who cooked Nintendo"
    //, _creator: aaron._id
  //});

  //comment1.save(function (err) {
  //});
//})
		
		
//Comment.findOne({ username: /Nintendo/i}).populate('_creator') // <--
//.exec(function (err, story) {

  //console.log('The creator is %s', story._creator.title);
  // prints "The creator is Aaron"
//})