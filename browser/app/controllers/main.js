import _ from 'lodash';
import Ember from 'ember';
import Person from '../models/Person';

export default Ember.Controller.extend({
  async init() {
    await this.get('kojac').read('Person').request();
    this.set('currentPersonId',this.get('cache.persons.firstObject.id'));
  },

  currentPersonId: null,
  currentPerson: Ember.computed('cache.persons[]','currentPersonId',function(){
    let pid = this.get('currentPersonId');
    let persons = this.get('cache.persons');
    return _.find(persons,function(p){
      return p.get('id')==pid;
    }) || null;
  }).readOnly(),

  actions: {

  }

});
