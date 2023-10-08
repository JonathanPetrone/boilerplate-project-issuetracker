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
            /*chai
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
            }) */
            assert.fail();
        })

        test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })
    })

    suite('PUT-method', function() {
        test("Update one field on an issue: PUT request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })
    })

    suite('DELETE-method', function() {
        test("Delete an issue: DELETE request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })

        test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done){
            /*chai
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
            }) */
            assert.fail();
        })
    })
});

