const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
   suite('POST-method', function() {
        test("Create an issue with every field: POST request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .post("/api/issues/projects")
            .set("content-type", "application/json")
            .send({
                issue_title: "Issue title",
                issue_text: "Issue text",
                created_by: "Test user",
                assigned_to: "Sys Admin",
                status_text: "urgent"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                //deleteId = res.body._id;
                assert.equal(res.body.issue_title, "Issue title");
                assert.equal(res.body.issue_text, "Issue text");
                assert.equal(res.body.created_by, "Test user");
                assert.equal(res.body.assigned_to, "Sys Admin");
                assert.equal(res.body.status_text, "urgent");
                done();
            })
        })

        test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .post("/api/issues/projects")
            .set("content-type", "application/json")
            .send({
                issue_title: "Issue title",
                issue_text: "Issue text",
                created_by: "Test user"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                //deleteId = res.body._id;
                assert.equal(res.body.issue_title, "Issue title");
                assert.equal(res.body.issue_text, "Issue text");
                assert.equal(res.body.created_by, "Test user");
                done();
            })
        })

        test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .post("/api/issues/projects")
            .set("content-type", "application/json")
            .send({
                issue_text: "Issue text",
                created_by: "Test user"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                //deleteId = res.body._id;
                assert.equal(res.body.error, "required field(s) missing");
                done();
            })
        })
    })

    suite('GET-method', function() {
        test("View issues on a project: GET request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .get("/api/issues/projects")
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.isAtLeast(res.body.length, 1,  "required field(s) missing");
                done();
            })

        })

        test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done){
            const created_by = "Test user"
            const issue_text = "Issue text"
            
            chai
            .request(server)
            .get("/api/issues/projects")
            .query({
                issue_text: issue_text,
                created_by: created_by
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body[0].created_by, "Test user", `Expected first entry to be created by ${created_by}`);
                assert.equal(res.body[0].issue_text, "Issue text", `Expected first entry to have the text ${created_by}`);
                done();
            })
        })

        test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done){
            const created_by = "Test user"
            
            chai
            .request(server)
            .get("/api/issues/projects")
            .query({
                created_by: created_by
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body[0].created_by, "Test user", `Expected first entry to be created by Test user`);
                done();
            })
        })
    })

    suite('PUT-method', function() {
        test("Update one field on an issue: PUT request to /api/issues/{project}", function (done){
            const newIssueText = "Issue text has been updated"
            
            chai
            .request(server)
            .put("/api/issues/projects")
            .send({
                _id: "6522f86dc0ca09f397117acc",
                issue_text: newIssueText,
                open: false
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.result, "successfully updated");
                assert.equal(res.body._id, "6522f86dc0ca09f397117acc");
                done();
            })
        })

        test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .put("/api/issues/projects")
            .send({
                _id: "6522f86dc0ca09f397117acc",
                issue_text: "Issue text has been updated again",
                created_by: "Test user has been updated"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.result, "successfully updated");
                assert.equal(res.body._id, "6522f86dc0ca09f397117acc");
                done();
            })
        })

        test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .put("/api/issues/projects")
            .send({
                issue_text: "Issue text",
                created_by: "Test user"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "missing _id");
                done();
            })
        })

        test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .put("/api/issues/projects")
            .send({
                _id: "6522f86dc0ca09f397117acc"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "no update field(s) sent");
                done();
            })
        })

        test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .put("/api/issues/projects")
            .send({
                _id: "invalid_6522f86dc0ca09f397117acc",
                issue_text: "shouldn't work"
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "could not update");
                done();
            })
        })
    })

    suite('DELETE-method', function() {
        test("Delete an issue: DELETE request to /api/issues/{project}", function (done){
            
            chai
                .request(server)
                .post("/api/issues/projects")
                .set("content-type", "application/json")
                .send({
                    issue_title: "to be deleted",
                    issue_text: "delete me",
                    created_by: "DELETEmaster",
                })
                .then(function (res) {
                    // Assuming you have the ID of the newly created issue in the response body
                    const idOfNewIssue = res.body._id;

                    // Make the delete request with the ID
                    return chai
                    .request(server)
                    .delete("/api/issues/projects")
                    .send({
                        _id: idOfNewIssue,
                    });
                })
                .then(function (res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.result, "successfully deleted");
                    done();
                })
                .catch(function (err) {
                    console.error(err);
                    done(err);
                });
            })

        test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .delete("/api/issues/projects")
            .send({
                _id: "invalid_6522f86dc0ca09f397117acc",
            })
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "could not delete");
                done();
            })
        })

        test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done){
            chai
            .request(server)
            .delete("/api/issues/projects")
            .send({})
            .end(function (err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "missing _id");
                done();
            })
        })
    })
});

