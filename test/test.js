'use strict';
//Setup
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
//expect syntax in module
const expect = chai.expect;

const { DATABASE_URL, PORT } = require('../config');
const { TEST_DATABASE_URL } = require('../config');
const Asset = require('../models/asset');
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

//insert data into mongo
function seedAssetData() {
  console.info('seeding AssetData');
  const seedData = [];

  for (let i = 1; i <= 10; i++) {
    seedData.push(generateAssetData());
  }
  return Asset.insertMany(seedData);
}

//insert data into mongo
function generateAssetName() {
  const assetName = ['SP 500','Cash','Real Estate','Total Bond','Dividend Yield'];
  return assetName[Math.floor(Math.random() * assetName.length)];
}

function generateCurrentValue() {
  const currentValue = [10, 100, 9999, 120120, 1000000];
  return currentValue[Math.floor(Math.random() * currentValue.length)];
}

function generateTargetPercentage() {
  const target = [10, 20, 50, 100];
  return target[Math.floor(Math.random() * target.length)];
}
//Generate objects representing a Asset
//for seed data or req.body data
function generateAssetData() {
  return {
    name: generateAssetName(),
    value: generateCurrentValue(),
    target: generateTargetPercentage()
  };
}

//delete entire database
//ensure data does not stick around for next one
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//hook functions to return a promise
// before and after functions
describe('API resource', function() {
  
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedAssetData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  //GET
  describe('GET ENDPOINT', function() {
    it('should return current portfolio assets', function() {
      //general response
      let res;
      return chai.request(app)
        .get('/asset/get/demo@demo.com')
        //_res a local variable
        .then(function(_res) {
          //change the value of global variable
          console.log(_res);
          res = _res;
          //available to use futher down
          expect(res).to.have.status(200);
/*          expect(res.body).to.have.length.of.at.least(1);*/
          return Asset.count();
        })
/*        .then(function(count) {
        });*/
    });

    it('should return assets with the right values', function() {
      let resAsset;
      return chai.request(app)
      .get('/asset/get/demo@demo.com')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
/*        expect(res.body).to.have.length.of.at.least(1);*/
        });
    });
  });
});  