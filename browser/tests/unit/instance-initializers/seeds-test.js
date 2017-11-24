import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import Ember from 'ember';
import { initialize } from 'browser/instance-initializers/seeds';
import destroyApp from '../../helpers/destroy-app';

describe('Unit | Instance Initializer | seeds', function() {
  let application, appInstance;

  beforeEach(function() {
    Ember.run(function() {
      application = Ember.Application.create();
      appInstance = application.buildInstance();
    });
  });

  afterEach(function() {
    Ember.run(appInstance, 'destroy');
    destroyApp(application);
  });

  // Replace this with your real tests.
  it('works', function() {
    initialize(appInstance);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
