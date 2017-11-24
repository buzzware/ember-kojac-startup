import Ember from 'ember';
import _ from 'lodash';
import bf from 'ember-kojac/utils/BuzzFunctions';
import Kojac from 'ember-kojac/utils/Kojac';
import KojacUtils from 'ember-kojac/utils/KojacUtils';
import KojacTypes from 'ember-kojac/utils/KojacTypes';
import EmberFramework from 'ember-kojac/utils/ember/EmberFramework';
import KojacEmberUtils from 'ember-kojac/utils/ember/KojacEmberUtils';

var descFor = function(aObject,aKey) {
	var value = aObject[aKey];
	var desc = (value !== null && typeof value === 'object' && value.isDescriptor) ? value : undefined;
	if (desc)
		return desc;
	// the old way
	var m = Ember.meta(aObject,false);
	return m && m.descs[aKey];
};

var kem = Ember.Object.extend({

  _cache: null,   // the cache this model is in, for binding relationships

//	set: function(k,v) {
//		var def = this.constructor.getDefinitions();
//		var t = (def && def[k]);
//		if (t)
//			v = Kojac.interpretValueAsType(v,t);
//		return this._super(k,v);
//	},
//
//	setProperties: function(values) {
//		values = Kojac.readTypedProperties({},values,this.constructor.getDefinitions());
//		return this._super(values);
//	},

	// copy the property from source to dest
	// this could be a static fn
	toJsonoCopyFn: function(aDest,aSource,aProperty,aOptions) {
		aDest[aProperty] = KojacUtils.toJsono(Ember.get(aSource,aProperty),aOptions);
	},

	// return array of names, or an object and all keys will be used
	// this could be a static fn
	toPropListFn: function(aSource,aOptions) {
		var p;
		if ((p = aSource) && aSource.constructor && aSource.constructor.proto && aSource.constructor.proto()) {
			return EmberFramework.instance().getModelPropertyNames(aSource);
		} else {
			return aSource;
		}
	},

	toJsono: function(aOptions) {
		return KojacUtils.toJsono(this,aOptions,this.toPropListFn,this.toJsonoCopyFn)
	}

});


// in create, set cache with defaults merged with given values
// getter - use cacheFor
// setter - set cache with converted value
// in extend, generate with Ember.computed().cacheable(true)

kem.reopenClass({

	extend: function() {
		var defs = arguments[0];
		var extender = {};

		var _type;
		var _value;
		if (defs) {
			var destType;
			var defaultValue;
			for (var p in defs) {
				var pValue = defs[p];
				destType = null;
				defaultValue = null;

				if (KojacTypes.FieldTypes.indexOf(pValue)>=0) { // pValue is field type
					destType = pValue;
					defaultValue = null;
				} else {
					var ft=KojacTypes.getPropertyValueType(pValue);
					if (ft && (KojacTypes.SimpleTypes.indexOf(ft)>=0)) {  // pValue is simple field value
						destType = ft;
						defaultValue = pValue;
					}
				}

				if (destType) {

					extender[p] = Ember.computed({
				    get(aKey) {
					    var d = descFor(this,aKey);
							var v;
					    v = Ember.cacheFor(this,aKey);
							if (typeof v != 'undefined') {
								return v;
					    } else {
						    return d && d._meta && d._meta.value;
					    }
					    return v;
				    },
				    set(aKey, aValue) {
					    var d = descFor(this,aKey);
							var v;
					    var t = d && d._meta && d._meta.type;
							if (t)
								v = KojacTypes.interpretValueAsType(aValue,t);
							else
								v = aValue;
							return v;
				    }
				  }).meta({
            kemp: true,     // Kojac Ember Model Property
            type: destType,
            value: defaultValue
          });


					//extender[p] = Ember.computed(function(aKey,aValue){
					//	// MyClass.metaForProperty('person');
					//	//var m = Ember.meta(this,false);
					//	//var d = m && m.descs[aKey];
					//	var d = descFor(this,aKey);
					//
					//
					//	var v;
					//
					//	if (arguments.length==2) { // set
					//		var t = d && d._meta && d._meta.type;
					//		if (t)
					//			v = KojacTypes.interpretValueAsType(aValue,t);
					//		else
					//			v = aValue;
					//		//cache[aKey] = v;
					//	} else {  // get
					//		v = Ember.cacheFor(this,aKey);
					//		if (typeof v != 'undefined') {
					//			return v;
					//    } else {
					//	    return d && d._meta && d._meta.value;
					//    }
					//	}
					//	return v;
					//}).meta({
					//	kemp: true,     // Kojac Ember Model Property
					//	type: destType,
					//	value: defaultValue
					//})


				} else {
					extender[p] = pValue;
				}
			}
		}
		var result = this._super(extender);
		return result;
	}
});


kem.belongsTo = function(aIdProperty,aResource) {
  return Ember.computed(aIdProperty, function(){
    var id = Ember.get(this,aIdProperty);
    if (!id)
      return null;
    var cache = Ember.get(this,'_cache');
    var key = KojacUtils.keyJoin(aResource,id);
    if (!key || !cache)
      return null;
    return Ember.get(cache,key);
  }).property('_cache',aIdProperty);
};

kem.numeratedCollection = function(aPrefix,aMaxCount,aCountProperty=null) {
  aCountProperty = aCountProperty || aPrefix+'Count';
  let props = _.concat(aCountProperty, bf.numerate(aPrefix, aMaxCount));
  return Ember.computed(...props, function () {
    let count = this.get(aCountProperty);
    if (!count)
      return [];
    return KojacEmberUtils.getNumerated(this, aPrefix, count);
  })
};




export default kem;
