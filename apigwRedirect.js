'use strict';

// This example demostrates a redirect that fires in repsonse to a Viewer Request
// **After CloudFront receives a request from a viewer (viewer request)
// This allows interception of the request and redirection to a different origin

// We want to check if a header parameter (auth) exists and contains the "valid!" value
// If not, redirect to a different API Gateway Endpoint
exports.handler = (event, context, callback) => {

    // Oregon is the authorized location
    let oregon_location = "https://08tquh0p3k.execute-api.us-west-2.amazonaws.com/test/api";
    let ohio_location = "https://035rxrltw7.execute-api.us-east-2.amazonaws.com/test/api";
    let location = "";

    // Grab the Request
    const request = event.Records[0].cf.request;
    const authHeader = request.headers['auth'];
    console.log("Request URI:" + request.uri);
    
    if(authHeader != null && authHeader[0].value === 'valid!'){
        console.log("Auth header: " + JSON.stringify(authHeader));
        console.log("Authorized. Forwarding to authorized Endpoint ...");
        location=oregon_location;
    }
    else{
        console.log("No Auth header present...")
        console.log("Unauthoried! Forwarding to unauthorized endpoint ...");
        location=ohio_location;
    }

    
    const response = {
        status: '302',
        statusDescription: '302 Found',
        httpVersion: request.httpVersion,
        headers: {
            location: [{
                key:'Location',
                value:location
            }]
        },
    };

    callback(null, response);
}