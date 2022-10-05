const {Thought, User} = require('../models')

module.exports = {
  //get all thoughts
  getAllThoughts(req, res){
    Thought.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },
  
  //get a single thought
  getSingleThought(req, res){
    Thought.findOne({ _id: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },
  
  //create new thought
  async postNewThought(req, res){
    const newThought = await new Thought(req.body);
    newThought.save();
    if (newThought) {
      let updateUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      )
      res.status(200).json(updateUser);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  
  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { thoughtText: req.body.thoughtText ? req.body.thoughtText : Thought.thoughtText },
      { new: true },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Updated: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      }
    );
  },
  
  //delete a thought
  deleteThought(req, res) {
    console.log(req.params.id)
    Thought.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    });
  },
  
  // create a reaction
  async postNewReaction(req, res){
    const newReaction = await req.body;
    if (newReaction) {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      )
      res.status(200).json(updateThought);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },
  
  // remove a reaction
  deleteReaction(req, res){
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body._id } } },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Deleted: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ message: 'something went wrong' });
        }
      });
  },
};