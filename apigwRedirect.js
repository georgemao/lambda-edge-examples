'use strict';

// This Lambda @ Edge example demostrates a redirect that fires in repsonse to a Viewer Request
// **After CloudFront receives a request from a viewer (viewer request)

// We want to check if a header parameter (auth) exists and contains the "valid!" value. 
// Then inject the x-api-key header to the request and continue to the Protected URL
// If not, redirect to the Open URL
exports.handler = (event, context, callback) => {

    // Oregon is the authorized location. Note, Lambda @ Edge cannot use ENV Variables
    let oregon_location = "https://08tquh0p3k.execute-api.us-west-2.amazonaws.com/test/api"
    let ohio_location = "https://035rxrltw7.execute-api.us-east-2.amazonaws.com/test/api";
    let location = "";

    // Grab the Request. This example assumes there will be a 'auth' header that contains the value 'valid!'.
    const request = event.Records[0].cf.request;
    const authHeader = request.headers['auth'];
    console.log("Request URI:" + request.uri);
    
    // If header is present, inject the x-api-key into the request
    if(authHeader != null && authHeader[0].value === 'valid!'){
        console.log("Auth header: " + JSON.stringify(authHeader));
        console.log("Authorized. Injecting x-api-key header to protected Endpoint ...");
        //location=oregon_location;
        request.headers['x-api-key'] = [{
            key: 'x-api-key',
            value: 'somevalue'
        }];

        callback(null, request);
    }
    else{
        console.log("No Auth header present...")
        console.log("Unauthoried! Redirecting to unauthorized endpoint ...");
        location=ohio_location;

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
    
}