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
  
    .get(async function (req, res){
      let project = req.params.project;

      const {
        _id,
        open,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      } = req.query

      try {
      const data = await Project.aggregate([
        { $match: {name: project} },
        { $unwind: "$issues"},
        _id != undefined 
          ? { $match: {"issues._id": ObjectId(_id) }}
          : { $match: {} },
        open != undefined 
          ? { $match: {"issues.open": true }}
          : { $match: {} },
        issue_title != undefined 
          ? { $match: {"issues.issue_title": issue_title }}
          : { $match: {} },
        issue_text != undefined 
          ? { $match: {"issues.issue_text": issue_text }}
          : { $match: {} },
        created_by != undefined 
          ? { $match: {"issues.created_by": created_by }}
          : { $match: {} },
        assigned_to != undefined 
          ? { $match: {"issues.assigned_to": assigned_to }}
          : { $match: {} },
          status_text != undefined 
          ? { $match: {"issues.status_text": status_text }}
          : { $match: {} } 
        ]);

        let mappedData = data.map((item) => item.issues);
        res.json(mappedData)

        } catch (error) {
          res.json([]);
        }
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
      const issueId = req.params.id;
      const {_id} = req.body;
      console.log(_id);

      if (!_id){
        return res.status(404).json({ error: 'missing _id' }); 
      }

      try {
        const findProject = await Project.findOne({ name: project }).exec();
        if (!findProject) {
          return res.status(404).json({ error: 'Project not found' });
        } else {
          console.log("project found")
          //console.log(findProject)
        }

        // Locate the specific document within the array
        const issueToDelete = findProject.issues.find(issue => issue._id.toString() === _id);

        if (!issueToDelete) {
          return res.status(404).json({ error: 'Issue not found' });
        }

        // Remove the document from the array
        findProject.issues.pull({ _id: issueToDelete._id });

        // Save the parent document to apply the changes
        await findProject.save();

        res.send({ message: 'Issue deleted successfully'});

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the document' });
      }
      /* if (!findIssue) {
      return res.status(404).json({ error: 'could not delete', '_id': _id });
    } */

      // delete a post based on id & project provided
      
    });  
};
