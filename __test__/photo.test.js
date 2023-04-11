const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {Photo} = require('../models');
const req = require("express/lib/request");

//create photo with authentication
describe("POST /photos", () => {
    afterAll(async () => {
      // destroy data users
      try {
        await User.destroy({ where: {} });
        await Photo.destroy({where:{}})
      } catch (error) {
        console.log(error);
      }
    });
  
    beforeAll(async () => {
      try {
        const result = await User.create({
          username: "krisna",
          email: "krisna@mail.com",
          password: "12345",
        });
      } catch (error) {
        console.log(error);
      }
    });
    //success response
    it("Should response 201", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "krisna@mail.com",
          password: "12345",
        })
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
  
          const token = res.body.token;
          request(app)
            .post("/photos")
            .set("token", token)
            .send({
              title: "test",
              caption : "test",
              image_url: "https://www.google.com/",
            })
            .expect(201)
            .end((err, res) => {
              if (err) done(err);
  
              expect(res.body).toHaveProperty("id");
              expect(res.body).toHaveProperty("title");
              expect(res.body).toHaveProperty("caption");
              expect(res.body).toHaveProperty("image_url");
              done();
            });
        });
    });
  
    //error responese without token
    it("Should response 401", (done) => {
      request(app)
        .post("/photos")
        .send({
          title: "test",
          caption : "test",
          image_url: "https://www.google.com/",
        })
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
  
          done();
        });
    });
  });


// API get all photos
describe("GET /photos", () => {
    afterAll(async () => {
      // destroy data users
      try {
        await User.destroy({ where: {} });
        await Photo.destroy({where:{}})
      } catch (error) {
        console.log(error);
      }
    });
  
    beforeAll(async () => {
      try {
        const result = await User.create({
          username: "krisna",
          email: "krisna@mail.com",
          password: "12345",
        });

        const photo = await Photo.create({
          title: "test",
          caption : "test",
          image_url: "https://www.google.com/",
          UserId: result.id
        })
      } catch (error) {
        console.log(error);
      }
    });
    //success response
    it("Should response 200", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "krisna@mail.com",
          password: "12345",
        })
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
  
          const token = res.body.token;
          request(app)
            .get("/photos")
            .set("token", token)
            .expect(200)
            .end((err, res) => {
              if (err) done(err);
  
              expect(res.body).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    caption: expect.any(String),
                    image_url: expect.any(String),
                    UserId: expect.any(Number),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                  }),
                ])
              );
              done();
            });
        });
    });

    //error responese without token
    it("Should response 401", (done) => {
      request(app)
        .get("/photos")
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
  
          done();
        });
    });
  });

  // API get photo by id
describe("GET /photos/:id", () => {
    afterAll(async () => {
      // destroy data users
      try {
        await User.destroy({ where: {} });
        await Photo.destroy({where:{}})
      } catch (error) {
        console.log(error);
      }
    });
    beforeAll(async () => {
      try {
        const result = await User.create({
          id: 1,
          username: "krisna",
          email: "krisna@mail.com",
          password: "12345",
        });
        const photo = await Photo.create({
          id: 1,
          title: "test",
          caption : "test",
          image_url: "https://www.google.com/",
          UserId: result.id
        })
      } catch (error) { console.log(error); }
    });
    //success response
    it("Should response 200", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "krisna@mail.com",
          password: "12345",
        })
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          const token = res.body.token;
          request(app)
            .get("/photos/1")
            .set("token", token)
            .expect(200)
            .end((err, res) => {
              if (err) done(err);
              expect(res.body).toEqual(
                expect.objectContaining({
                  id: expect.any(Number),
                  title: expect.any(String),
                  caption: expect.any(String),
                  image_url: expect.any(String),
                  UserId: expect.any(Number),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                })
              );
              done();
            });
        });
    });

    //error responese without token
    it("Should response 401", (done) => {
      request(app)
        .get("/photos/1")
        .expect(401)
        .end((err, res) => {
          if (err) done(err);
  
          done();
        });
    });
  });