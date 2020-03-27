
let Order=require('../model/order');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../api/orders');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Order', () => {
   
/*
  * Test the /GET route
  */
  describe('/GET order', () => {
      it('it should GET all the orders', (done) => {
        chai.request(server)
            .get('/orders')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  //res.body.length.should.be.eql(0);
              done();
            });
      });
  });

//   describe('/GET/:id book', () => {
//     it('it should GET a book by the given id', (done) => {
//        let newbook={

//         title: "india2020", 
//         author: "apj",
//         numberPages: 250,
//         publisher:"sapna" 
//        }
       
//       let book = new Book(newbook);
//         book.save((err, book) => {
//             chai.request(server)
//           .get('/book/' + book.id)
//           .send(book)
//           .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.should.have.property('title');
//                 res.body.should.have.property('author');
//                 res.body.should.have.property('numberPages');
//                 res.body.should.have.property('publisher');
//                 res.body.should.have.property('_id').eql(book.id);
//             done();
//           });
//         });

//     });
// });

// describe('/POST order', () => {
//   it('it should  POST a order', (done) => {
//       let book = {
//         title: "indsasia2020", 
//         author: "apjaaaass",
//         numberPages: 250,
//         publisher:"sapna" 
//       }
//     chai.request(server)
//         .post('/order')
//         .send(customer)
//         .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('object');
//               res.body.should.have.property('title');
//                 res.body.should.have.property('author');
//                 res.body.should.have.property('numberPages');
//                 res.body.should.have.property('publisher');
//             // res.body.should.have.property('errors');
//               //res.body.errors.pages.should.have.property('kind').eql('required');
//           done();
//         });
//   });

// });


});