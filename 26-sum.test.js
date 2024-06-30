// 测试普通的
// const {sum} = require("./25-testsum.js");

// describe("test sums",()=>{
//     test("test sums",()=>{
//         expect(sum(1,2)).toBe(3);
//     })
// })

// 测试express
// app.test.js
const request = require('supertest');
const app = require('./24-express测试.js'); // 导入您的Express应用程序

describe('GET /api/users', () => {
  it('responds with JSON', (done) => {
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('responds with a message', (done) => {
    request(app)
      .get('/api/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const expectedMessage = { message: 'Get all users' };
        expect(res.body).toEqual(expectedMessage);
        done();
      });
  });
});



