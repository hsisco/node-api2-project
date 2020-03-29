const express = require('express');
const database = require('../data/db');
const router = express.Router();


router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  database.insert(req.body)
  .then(post => res.status(201).json(post))
  .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the post to the database", success: false, err }))
});


router.post('/:id/comments', (req, res) => {
  const { post_id } = req.params.id;
  const { text } = req.body;
  
  database.findById(post_id)
  .then(post => {
    if (!post) {
      res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
    } if (!text){
      res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
      let newComment = {text: text, post_id: post_id};
      
      database.insertComment(newComment)
      .then(newComment => {
        res.status(201).json(newComment);
        return newComment;
      })
      .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the comment to the database", success: false, err }))
    }
  })
});


router.get('/', (req, res)=> {
  database.find(req.body)
  .then(post => res.status(201).json(post))
  .catch(err => res.status(500).json({ errorMessage: "The posts information could not be retrieved.", success: false, err }))
});


router.get('/:id', (req, res) => {
  const { id } = req.params.id;

  database.findById(id)
  .then(post => {
    if(!post){
      res.status(404).json({ errorMessage: "The post with the specified ID does not exist.", success: false, err })
    } else {
      res.status(201).json(post)
    }
  })
  .catch(err => res.status(500).json({ errorMessage: "The post information could not be retrieved.", success: false, err })
  )
});


router.get('/:id/comments', (req, res)=> {
  const { id } = req.params.id;

  database.findPostComments(id)
  .then(post => {
    if(!post){
      res.status(404).json({ errorMessage: "The post with the specified ID does not exist.", success: false, err })
    } 
      if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }else {
      res.status(201).json(post)
    }
  })
  .catch(err => res.status(500).json({ errorMessage: "The comments information could not be retrieved.", success: false, err })
  )});


router.delete('/:id', (req, res) => {
  const { id } = req.params.id;

  database.findById(id)
  .then(post => {
    if(!post){
      res.status(404).json({ errorMessage: "The post with the specified ID does not exist.", success: false, err })
    } else {
      database.remove(id)
      .then(deleted => {
        res.status(201).json(deleted)
      })}
    })
  .catch(err => res.status(500).json({ errorMessage: "The post could not be removed", success: false, err })
  )
});


router.put('/:id', (req, res) => {
  const { id } = req.params.id;
  const { title, contents } = req.body;

  database.findById(id)
  .then(post => {
    if (!post){
      res.status(404).json({ errorMessage: "The post with the specified ID does not exist.", success: false, err })
    } if (!title || !contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
      res.status(200).json(post)
    }
  })
  .catch(err => res.status(500).json({ errorMessage: "The post information could not be retrieved.", success: false, err })
  )
});