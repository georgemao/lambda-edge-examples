# lambda-edge-examples
This project demonstrates how to use [Lambda @ the Edge](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html) to instantly react to incoming requests.

## Introduction
Lambda @ Edge lets you run simple Lambda functions in response to CloudFront Events. You can use these functions to instantly react to incoming Requests and perform dynamic actions such as:
- A/B Tests
- Url Rewrites
- Injecting or Removing anything in the Request Payload

There are 4 types of Cloudfront Events as seen here:
![Events](http://docs.aws.amazon.com/lambda/latest/dg/images/cloudfront-events-that-trigger-lambda-functions.png)

In this project, there are two examples that demonstrate how to use the Viewer Request event: **apigwRedirect.js** and **lambdaRedirect.js**. 

Both examples start by grabbign the incoming request

```json
const request = event.Records[0].cf.request;
```

### lambdaRedirect
This example checks the request uri and if it = '/s3path', it sets the location to S3 based URL. Otherwise, redirect to the default url on amazon.com. To perform a redirect, you must issue a response that includes a status: 302 and the location:

```json
   const response = {
        status: '302',
        statusDescription: '302 Found',
        httpVersion: request.httpVersion,
        headers: {
            Location: location,
            Lambdaatedge: 'test'
        },
    };
```

Issue the response back to the user:
```json
callback(null, response);
```

### apigwRedirect
This example is a little more advanced. We have two API Gateway endpoints deployed, one in us-west-2 that is protected via an API Key and another in us-east-2 that is open to all users.

The Lambda function will inspect the incoming request looking for an 'auth' header with the value 'valid!'. If present, it will inject the proper api key into the request. If not present, the user will be redirected to the open API in us-east-2.

Inject headers. You must include the key/value pair as follows:
```json
    request.headers['x-api-key'] = [{
        key: 'x-api-key',
        value: 'somekey'
    }];
```

Put the modified request back into the callback:
```json
callback(null, request);
```



## Resources

- **lambdaRedirect.js** - 
- **apigwRedirect.js** - 
