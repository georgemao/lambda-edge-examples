# lambda-edge-examples
This project demonstrates how to use [Lambda @ the Edge](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html) to instantly react to incoming requests.

## Introduction
Lambda @ Edge lets you run simple Lambda functions in response to CloudFront Events. You can use these functions to instantly react to incoming Requests and perform dynamic actions such as:
- A/B Tests
- Url Rewrites
- Injecting or Removing anything in the Request Payload

There are 4 types of Cloudfront Events as seen here:
![Events](http://docs.aws.amazon.com/lambda/latest/dg/images/cloudfront-events-that-trigger-lambda-functions.png)

In this projtect, there are two examples that demonstrate how to use the Viewer Request event: **apigwRedirect.js** and **lambdaRedirect.js**. 

### lambdaRedirect


### apigwRedirect


## Resources

- **lambdaRedirect.js** - 
- **apigwRedirect.js** - 
