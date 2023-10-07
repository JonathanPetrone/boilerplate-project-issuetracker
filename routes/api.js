'use strict';
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const client = new MongoClient(process.env.DATABASE_URL)
const database = client.db("issuetracker")
const issues = database.collection("issues")

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_on: Date,
  updated_on: Date,
  created_by: { type: String, required: true },
  assigned_to: String,
  open: Boolean,
  status_text: String, 
});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

      res.json({"res": project})
      
      // list of all issues saved in a project

    })
    
    .post(async function (req, res){
      let project = req.params.project;

      const issue = {
        name: "my issue",
        number: 1
      }

      const insertURL = await issues.insertOne(issue)
      insertURL()
      res.json({ issue })

      // post a new entry of an issue

      // need connection to a database
      // need to define a schema 

      
    })
    
    .put(function (req, res){
      let project = req.params.project;

      // change a post based on id & project provided
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;

      // delete a post based on id & project provided
      
    });
    
};
