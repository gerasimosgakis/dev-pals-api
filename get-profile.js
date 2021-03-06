import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "profiles",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    // Key: {
    //   // userId: event.requestContext.identity.cognitoIdentityId
    //   //profileId: event.pathParameters.id
    // }
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    if (result.Items) {
      // Return retrieved item
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Item not found" });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
