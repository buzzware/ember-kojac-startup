import Ember from 'ember';
//import { module, test } from 'qunit';

import Kojac from 'ember-kojac/utils/Kojac';

//module('Unit | Utility | Kojac');

import {afterEach, beforeEach, describe, it} from 'mocha';
import {assert} from 'chai';

// Replace this with your real tests.
//test('it works', function(assert) {
//  let kojac = new Kojac();
//	kojac.bang();
//  assert.ok(kojac);
//});

describe('immutable',function(){

	it('Ember Object',function() {
		var obj = Ember.Object.create({foo: "bar"});
		assert.strictEqual(obj.get('foo'),'bar','can get');
		obj = Object.freeze(obj);
		assert.strictEqual(obj.get('foo'),'bar','can get immutable');
		assert.throws(
			function() {
				Ember.set(obj,'foo','me');
			},
			TypeError,
			"Cannot assign to read only property"
		);
		assert.strictEqual(obj.get('foo'),'bar','should not change');
	});


	it('defineProperty test',function() {

		function Sprite() {
			// Constructor code ...
		}

		Object.defineProperty(Sprite.prototype, "y", {
			set: function (val) {
				if (typeof val !== "number" || isNaN(val)) {
					throw "Sprite.y must be a valid number and not NaN";
				}
				this.__y = val;
			},
			get: function () {
				return this.__y;
			}
		})

		Sprite.prototype.y = 0;
		Sprite.prototype.x = 0;

	// Instantiate

		var sprite = new Sprite();
		sprite.x = "Hello, world!"; // Passed without complaints

		assert.throws(
			function() {
				sprite.y = sprite.somethingUndefined / 10; // Exception is thrown
			},
			"must be a valid number and not NaN"
		);
		sprite.y = 10;  // no problem
	});

});
