import {afterEach, beforeEach, describe, it} from 'mocha';
import {assert,expect} from 'chai';

import Ember from 'ember';

import Kojac from 'ember-kojac/utils/Kojac';
import KojacCore from 'ember-kojac/utils/KojacCore';
import KojacTypes from 'ember-kojac/utils/KojacTypes';
import KojacObjectFactory from 'ember-kojac/utils/KojacObjectFactory';
import KojacRemoteProvider from 'ember-kojac/utils/KojacRemoteProvider';


import EmberFramework from 'ember-kojac/utils/ember/EmberFramework';
import KojacEmberModel from 'ember-kojac/utils/ember/KojacEmberModel';

import StandardException from 'ember-kojac/utils/standard_exceptions/StandardExceptions';
//import {declareException} from 'ember-kojac/utils/standard_exceptions/StandardExceptions';
import {ValidationFailed} from 'ember-kojac/utils/standard_exceptions/Application';

describe("StandardException", function() {

	it('extends error with defaults and can be created',function() {
		var e = new StandardException();
		expect(e.constructor).to.equal(StandardException);
		expect(e.message).to.equal(StandardException.MESSAGE);
		expect(e.status).to.equal(StandardException.STATUS);
		expect(e.inner).to.equal(null);
		expect(e.name).to.equal('StandardException');
		expect(e.human_name).to.equal('Standard Exception');
		expect(StandardException.name).to.equal('StandardException');
	});

	it('can be thrown and matcher sees it as a StandardException',function() {
		expect(function () {
			throw new StandardException();
		}).to.throw(StandardException);
	});
	it('can be thrown and caught and contains backtrace',function(){
		try {
			throw new StandardException();
		} catch(e) {
			expect(e.constructor).to.equal(StandardException);
			expect(e.message).to.equal(StandardException.MESSAGE);
			var s = e.stack;
			expect(s).to.be.a('string');
			expect(s.length).to.be.above(100);
		}
	});

	it('can be created with values',function() {
		var e = new StandardException('failed',499,new Error('bang'));
		expect(e.constructor).to.equal(StandardException);
		expect(e.status).to.equal(499);
		expect(e.message).to.equal('failed');
		expect(e.inner.message).to.equal('bang');
	});

	it('can be created with just message',function() {
		var e = new StandardException('failed');
		expect(e.message).to.equal('failed');
	});

});


describe("MyError", function() {

	class MyError extends StandardException {
		constructor(message=null,status=null,inner=null) {
			super(message || MyError.MESSAGE,status || MyError.STATUS,inner);
		}
	}
	MyError.MESSAGE = 'This is MyError.';
	MyError.STATUS = 499;

	it('can create MyError which extends StandardException with defaults',function() {
		var e = new MyError();
		expect(e.constructor).to.equal(MyError);
		expect(e.message).to.equal(MyError.MESSAGE);
		expect(e.status).to.equal(MyError.STATUS);
		expect(e.inner).to.equal(null);
		expect(e.name).to.equal('MyError');
		expect(e.human_name).to.equal('My Error');
		expect(MyError.name).to.equal('MyError');
	});

	it('MyError can be thrown and matcher sees it as a MyError',function() {
		expect(function () {
			throw new MyError();
		}).to.throw(MyError);
	});
	it('MyError can be thrown and caught and contains backtrace',function(){
		try {
			throw new MyError();
		} catch(e) {
			expect(e.constructor).to.equal(MyError);
			expect(e.message).to.equal(MyError.MESSAGE);
			var s = e.stack;
			expect(s).to.be.a('string');
			expect(s.length).to.be.above(100);
		}
	});

	it('can create MyError with values',function() {
		var e = new MyError('failed',499,new Error('bang'));
		expect(e.constructor).to.equal(MyError);
		expect(e.status).to.equal(499);
		expect(e.message).to.equal('failed');
		expect(e.inner.message).to.equal('bang');
	});

	it('can create MyError with just message',function() {
		var e = new MyError('failed');
		expect(e.message).to.equal('failed');
	});

});

describe('ValidationFailed', function() {

	it("can be created and will have correct values", function() {
		var se = new ValidationFailed();
		expect(se.status).to.equal(ValidationFailed.STATUS);
		expect(se.status).to.equal(422);
		expect(se.message).to.equal(ValidationFailed.MESSAGE);
		expect(se.message).to.equal('The requested operation was not successful due to validation errors.');
		expect(se.human_name).to.equal('Validation Failed');
	});

});
