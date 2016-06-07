'use strict';

const request = require('supertest-as-promised');
const { expect } = require('chai');

const app = require('../index');

describe('Root API', () => {
  it('should not find non-existent endpoint', () => {
    return request(app).get('/api/foobar/')
      .expect(404);
  });
});

describe('Cars API', () => {
  describe('GET /cars', () => {
    it('should return the list of cars in the collection', () => {
      return request(app).get('/api/cars')
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an.array;
        });
    });
  });

  describe('POST /cars', () => {
    it('should add a car to the collection', () => {
      return request(app).post('/api/cars')
        .send({
          name: '458',
          brand: 'Ferrari',
          engineOperational: false
        })
        .expect(201)
        .expect((res) => {
          const { name, brand, engineOperational } = res.body;
          expect(name).to.equal('458');
          expect(brand).to.equal('Ferrari');
          expect(engineOperational).to.equal(false);
        });
    });

    it('should not add a car to the collection if name is missing', () => {
      return request(app).post('/api/cars')
        .send({
          brand: 'Ferrari',
          engineOperational: false
        })
        .expect(400);
    });

    it('should not add a car to the collection if brand is missing', () => {
      return request(app).post('/api/cars')
        .send({
          name: '458'
        })
        .expect(400);
    });
  });
});
