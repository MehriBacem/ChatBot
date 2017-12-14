'use strict';

require('jasmine-expect');
var request = require("request");
var lambda =  require("./handler").ChatBot;

describe("Configuration" , function(){

	describe("Valid verify_token ", function() {
		it("returns an integer { challenge} ", function(done) {


			var event={
				'method': 'GET',
				'query' :{
					'hub.verify_token': 'bacem' ,
					'hub.challenge':'333'
				}
			}
			var context={}
			var callback = (context,data) => {
				expect(data).toBe(333);
				done();
			}

			var response=lambda(event,context,callback);}); });

	describe("Invalid verify_token ", function() {
		it("returns an  error message and the authentification fails ", function(done) {


			var event={
				'method': 'GET',
				'query' :{
					'hub.verify_token': 'Invalid' ,
					'hub.challenge':'333'
				}
			}
			var context={}
			var callback = (context,data) => {
				expect(data).toBe('you messed up! , Wrong Token') ;
				done();
			}

			var response=lambda(event,context,callback);




		});}); });

describe("SendMessage" , function(){

	describe("SendTextMessage", function() {
		it("returns the same TextMessage ", function(done) {


			var event=
			{
				'method': 'POST',
				'body':
				{
					'object': 'page' ,
					'entry':  [{'messaging':[{
						'sender' :{
							'id' : '1',
						},
						'message': {

							'text':'heyyy'
							
						} }]
					} ]
				}
			}


			var context={}
			var callback = (context,data) => {
				expect(data).toBe('heyyy');
				done();
			}

			var response=lambda(event,context,callback);}); });

	describe("attachmentMessage", function() {
		it("returns the URL of the same attachment", function(done) {


			var event=
			{
				'method': 'POST',
				'body':
				{
					'object': 'page' ,
					'entry': [{'messaging': [{
						'sender' :{
							'id' : '1',
						},
						'message': {
							'attachments' :
							[ {
								'payload':{
									'url': 'URL' 
								}
							}

							]
							
						} }
						]}]
					}
				}
				var context={}
				var callback = (context,data) => {
					expect(data).toBe('URL') ;
					done();
				}

				var response=lambda(event,context,callback);




			});}); });

describe("Unknown event", function() {
	it("returns an error  ", function(done) {

		var event=
		{
			'method': 'POST',
			'body':
			{
				'object': 'page' ,
				'entry': [{'messaging': [{
					'sender' :{
						'id' : '1',
					} }
					]}]
				}
			}
			var context={}
			var callback = (context,data) => {
				expect(data).toBe("Webhook received unknown event: "+ event) ;
				done();
			}

			var response=lambda(event,context,callback);

		});
});


