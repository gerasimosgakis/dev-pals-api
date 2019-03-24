import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
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
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    },
    UpdateExpression: `REMOVE eduData[${data.index}]`
  };

  try {
    console.log(params);
    await dynamoDbLib.call("update", params);
    return success(params);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
