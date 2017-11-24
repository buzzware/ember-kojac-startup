import KojacTypes from 'ember-kojac/utils/KojacTypes';
import KojacEmberModel from 'ember-kojac/utils/ember/KojacEmberModel';

export default KojacEmberModel.extend({
  id: KojacTypes.Int,
  first_name: String
});
