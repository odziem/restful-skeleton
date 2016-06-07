'use strict';

const request = require('supertest-as-promised');

const app = require('../index');

describe('Root API', () => {
  it('should not find non-existent endpoint', () => {
    return request(app).get('/api/foobar/')
      .expect(404);
  });
});
