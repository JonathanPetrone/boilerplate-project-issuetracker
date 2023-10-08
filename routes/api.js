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

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  issues: [issueSchema],
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
      
      // list of all issues saved in a project

    })
    
    .post(async function (req, res){
      let project = req.params.project;

      const { issue_title, issue_text, created_on, updated_on, created_by, assigned_to, open, status_text } = req.body
      
      if (!issue_title || !issue_text || !created_by) {
        res.json({ error: "required field(s) missing"});
        return;
      }

      const issueObj = new Issue ({
        issue_title,
        issue_text,
        created_on: new Date(),
        updated_on,
        created_by, 
        assigned_to,
        open: true, 
        status_text
      });
      
      try {
        const projectdata = await Project.findOne({ name: project }).exec();
        if(!projectdata) {
          const newProject = new Project({ name: project});
          newProject.issues.push(issueObj);
          await newProject.save();
          res.json(issueObj);
        } else {
          projectdata.issues.push(issueObj);
          await projectdata.save();
          res.json(issueObj);
        }
      } catch (error) {
        console.error("Error saving new project:", error);
        res.status(500).json({ error: "An error occurred while saving the project" });
      }
    })
    
    .put(function (req, res){
      let project = req.params.project;

      // change a post based on id & project provided
      
    })
    
    .delete(async function (req, res){
      let project = req.params.project;

      const {_id} = req.body;

      console.log(_id);

      if (!_id){
        return res.status(404).json({ error: 'missing _id' }); 
      }

      res.json({
        status: "found issue",
        _id: _id
      });
      /* if (!findIssue) {
      return res.status(404).json({ error: 'could not delete', '_id': _id });
    } */

      // delete a post based on id & project provided
      
    });  
};
