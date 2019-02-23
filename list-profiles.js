import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
// import AWS from "aws-sdk";
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
export async function main(event, context) {
  const params = {
    TableName: "profiles"
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
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
