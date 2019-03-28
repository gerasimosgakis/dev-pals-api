import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "profiles",
    IndexName: "handle-index",
    KeyConditionExpression: "handle = :handle",
    ExpressionAttributeValues: {
      ":handle": event.pathParameters.handle
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
    console.log(e);
    return failure({ status: false });
  }
}
