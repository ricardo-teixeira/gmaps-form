(function () {
  'use strict';

  let $form;
  let jsdom = require('jsdom');
  let dom = new jsdom.JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
  global.document = dom.window.document;
  let expect = require('chai').expect;
  let updateForm = require('../modules/updateForm');

  describe('Testing update form values', function () {

    before(function () {
      $form = document.createElement('form');
    });

    it('Should return an object', function () {
      expect(updateForm($form, data)).to.be.an('object');
    });

    it('Should return an merged object', function () {
      let data = {
        country: 'Brasil',
        state: 'São Paulo',
        city: 'Campinas'
      };

      let result = updateForm($form, data);

      expect(result).to.be.equal(data);
    });
  });

}());