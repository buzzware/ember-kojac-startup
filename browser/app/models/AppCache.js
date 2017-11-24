import Ember from 'ember';
import KojacEmberCache from 'ember-kojac/utils/ember/KojacEmberCache';

export default KojacEmberCache.extend({
  persons: KojacEmberCache.collectResource('Person'),
  assessments: KojacEmberCache.collectResource('Assessment'),
  rubrics: KojacEmberCache.collectResource('Rubric'),

  rubricScores: KojacEmberCache.collectResource('RubricScore'),

  assessment: Ember.computed.alias('assessments.firstObject'),
  rubric: Ember.computed.alias('rubrics.firstObject')

});
