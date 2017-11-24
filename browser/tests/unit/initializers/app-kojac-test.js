import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import Ember from 'ember';
import { initialize } from 'browser/initializers/app-kojac';
import destroyApp from '../../helpers/destroy-app';

describe('Unit | Initializer | app kojac', function() {
  let application;

  beforeEach(function() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  });

  afterEach(function() {
    destroyApp(application);
  });

  // Replace this with your real tests.
  it('works', function() {
    initialize(application);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
