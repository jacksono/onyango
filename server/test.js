/* eslint-disable */
const request = require('supertest');
const app = require('./app')
const User = require('../db/models/user');
const db = require('../db')

setup = () => {
  db.sync({ force: true }).then(() => {
    Product.create({
      title: "test",
      category: ['Athletics', 'Clothes'],
      current_price: 21,
      description: 'Lion look',
      availability: false,
      inventory: 100,
      promo_id: 1,
    })
    .then(() => {
      console.log("Added Test Product");
      Review.create({ rating: 1, review_text: 'awful', product_id: 1 })
        .then(() => {
          console.log("Added Test Review");
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  })
};

teardown = () => {

  Review.destroy(
    { where: {} },
  ).then(() => {
    console.log("Deleted all Reviews");
    Product.destroy(
      { where: {} },
    ).then(() => {
      console.log("Deleted all users");
    })
    .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}


describe('Test the routes', () => {
  test('GET request on root path', () => {
      return request(app).get("/api/").then(response => {
        expect(response.statusCode).toBe(200)
      })
  });

  test('POST request on /users', () => {
      return request(app).post("/api/users").send({title:"title1", name: "name1"}).then(response => {
        expect(response.statusCode).toBe(201)
      })
  });

  test('PATCH request on /users/', () => {
      return request(app).patch("/api/users/1").send({title:"title2", name: "name2"}).then(response => {
        expect(response.statusCode).toBe(200)
      })
  });

  test('DELETE request on /users', () => {
      return request(app).delete("/api/users/1").then(response => {
        expect(response.statusCode).toBe(200)
      })
  });
})
