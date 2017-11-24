import Ember from 'ember';

import Kojac from 'ember-kojac/utils/Kojac';
import KojacTypes from 'ember-kojac/utils/KojacTypes';
import KojacUtils from 'ember-kojac/utils/KojacUtils';
import KojacCore from 'ember-kojac/utils/KojacCore';
import KojacObjectFactory from 'ember-kojac/utils/KojacObjectFactory';
import KojacLocalStorageRemoteProvider from 'ember-kojac/utils/KojacLocalStorageRemoteProvider';
import KojacEmberCache from 'ember-kojac/utils/ember/KojacEmberCache';
import EmberFramework from 'ember-kojac/utils/ember/EmberFramework';

import AppCache from '../models/AppCache';

import Person from '../models/Person';

export function initialize(application) {

  var framework = new EmberFramework();
  var factory = new KojacObjectFactory({
    defaultClass: Ember.Object,
    framework: framework
  });
  var localStore = new KojacLocalStorageRemoteProvider();
  factory.register([
    [/^Person(__|$)/,Person]
  ]);
  let kojac = new KojacCore({
    cache: AppCache.create(), //Ember.Object.create(),//
    apiVersion: 3,
    remoteProvider: localStore,
    objectFactory: factory,
    framework: framework
  });
  application.register('Kojac:main', kojac, { instantiate: false });
  application.register('KojacCache:main', kojac.cache, { instantiate: false });
  application.inject('controller', 'kojac', 'Kojac:main');
  application.inject('controller', 'cache', 'KojacCache:main');
}

export default {
  name: 'app-kojac',
  initialize
};
