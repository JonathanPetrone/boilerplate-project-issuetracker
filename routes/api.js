'use strict';
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });


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

const Issue = mongoose.model('Issue', issueSchema);

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;

      res.json({"res": project})
      
      // list of all issues saved in a project

    })
    
    .post(async function (req, res){
      let project = req.params.project;

      const { issue_title, issue_text, created_on, updated_on, created_by, assigned_to, open, status_text } = req.body

      const issueObj = new Issue ({
        issue_title,
        issue_text,
        created_on: new Date(),
        updated_on,
        created_by, 
        assigned_to,
        open: true, 
        status_text
      })

      
      try {
      const insertIssue = await issueObj.save()
      res.json({
        issue_title: insertIssue.issue_title,
        issue_text: insertIssue.issue_text,
        created_on: new Date(),
        updated_on: insertIssue.updated_on,
        created_by: insertIssue.created_by,
        assigned_to: insertIssue.assigned_to,
        open: true, 
        status_text: insertIssue.status_text
      })
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
      
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
