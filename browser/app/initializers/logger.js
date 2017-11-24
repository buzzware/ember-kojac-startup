import Ember from 'ember';

export function initialize(application) {
  let logger = Ember.Logger;
  application.register('logger:main', logger, { instantiate: false });

  application.inject('route', 'logger', 'logger:main');
  application.inject('controller', 'logger', 'logger:main');
}

export default {
  name: 'logger',
  initialize
};
