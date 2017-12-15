require('jasmine-expect');
var request = require("request");

var APITest = {
    url: "https://i6x45av503.execute-api.us-east-1.amazonaws.com/prod/webhook?hub.verify_token=bacem&hub.challenge=2&hub.mode=subscribe"
       };

describe("valid verify_token ", function() {
  describe("GET /", function() {

    it("returns status code 200", function(done) {
      request.get(APITest, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns an integer { challenge } ", function(done) {
      request.get(APITest, function(error, response, body) {
       expect(JSON.parse(body)).toBe(2);

        done();
      });
    });

  });
});

var APITest2 = {
    url: "https://i6x45av503.execute-api.us-east-1.amazonaws.com/prod/webhook?hub.verify_token=bacffeeem&hub.challenge=2&hub.mode=subscribe"
       };
describe("Invalid verify_token ", function() {
  describe("GET /", function() {

    it("returns an error ", function(done) {
      request.get(APITest2, function(error, response, body) {
       expect(JSON.parse(body)).toBe('you messed up! , Wrong Token');

        done();
      });
    });

  });
});

var APITest3 ={
 
    url: "https://i6x45av503.execute-api.us-east-1.amazonaws.com/prod/webhook",
    method: "POST",
    json: true,
    body: {
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

var body1 ={}

describe("Send a Text Message", function () {
    describe("POST /", function () {

        it("returns status code 200", function (done) {
            request(APITest3, function (error, response, body) {
                body1=body;
                expect(response.statusCode).toBe(200);
                done();
            });
        }, 5000);

        it("Response with the same message", function (done) {

            expect(body1).toBe("heyyy");
            done();
        });
       
 
    });
});


var APITest4 = {
 
    url: "https://i6x45av503.execute-api.us-east-1.amazonaws.com/prod/webhook",
    method: "POST",
    json: true,
    body: {
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

var body2 ={}

describe("Send an attachment Message", function () {
    describe("POST /", function () {

        it("returns status code 200", function (done) {
            request(APITest4, function (error, response, body) {
                body2=body;
                expect(response.statusCode).toBe(200);
                done();
            });
        }, 5000);

        it("Response with the url of the attachment", function (done) {

            expect(body2).toBe("URL");
            done();
        });
       
 
    });
});
var APITest5 = {
 
    url: "https://i6x45av503.execute-api.us-east-1.amazonaws.com/prod/webhook",
    method: "POST",
    json: true,
    body: {
          'object': 'page' ,
          'entry': [{'messaging': [{
            'sender' :{
              'id' : '1',
            } }
          ]}]
        }
             
}


describe("Unknown Event", function () {
    describe("POST /", function () {

        it("Response as an unknown event", function (done) {
               request(APITest5, function (error, response, body) {
            expect(body).toBe("Webhook received unknown event: [object Object]");
            done();
        }); });
       
 
    });
});




