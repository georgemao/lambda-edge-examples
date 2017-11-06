'use strict';
// This example demostrates a redirect that fires in repsonse to a Viewer Request
// **After CloudFront receives a request from a viewer (viewer request)
// This allows interception of the request and redirection to a different origin
exports.handler = (event, context, callback) => {

    // Grab the Request
    const request = event.Records[0].cf.request;
    console.log("Request URI:" + request.uri);
    var location='http://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html';
    
    // If /s3path was specified, redirect to S3, else goto the default
    if (request.uri == '/s3path') {
        console.log("Redirecting to /path");
        location='https://s3.amazonaws.com/my-s3-lab-bucket/index.html';
    }

    /*
     * Generate HTTP redirect response using 302 status code. Location header
     * is required in order to invoke browser redirect responses.
     */
    const response = {
        status: '302',
        statusDescription: '302 Found',
        httpVersion: request.httpVersion,
        headers: {
            Location: location,
            Lambdaatedge: 'test'
        },
    };

    callback(null, response);
};
