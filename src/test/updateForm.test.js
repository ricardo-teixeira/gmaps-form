(function () {
  'use strict';

  var $form;
  var jsdom = require('jsdom');
  var dom = new jsdom.JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
  global.document = dom.window.document;
  var expect = require('chai').expect;
  var updateForm = require('../modules/updateForm');

  describe('Testing update form values', function () {

    before(function () {
      $form = document.createElement('form');
    });

    it('Should return an object', function () {
      expect(updateForm($form, data)).to.be.an('object');
    });

    it('Should return an merged object', function () {
      var data = {
        country: 'Brasil',
        state: 'São Paulo',
        city: 'Campinas'
      };

      var result = updateForm($form, data);

      expect(result).to.be.equal(data);
    });
  });

}());