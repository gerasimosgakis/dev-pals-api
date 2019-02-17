import uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "profiles",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'profileId': a unique id
    // - 'handle': parsed from request body
    // - 'company': parsed from request body
    // - 'website': parsed from request body
    // - 'location': parsed from request body
    // - 'status': parsed from request body
    // - 'skills': parsed from request body
    // - 'githubusername': parsed from request body
    // - 'experience': parsed from request body
    // - 'education': parsed from request body
    // - 'social': parsed from request body
    // - 'createdAt': currentUnix timestamp
    // -
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      profileId: uuid.v1(),
      handle: data.handle,
      company: data.company,
      // website: data.website,
      // location: data.location,
      // status: data.status,
      // skills: data.skills,
      // githubusername: data.githubusername,
      // experience: data.experience,
      // education: data.education,
      // social: data.social,
      createdAt: Date.now()
    }
  };

  dynamoDb.put(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}