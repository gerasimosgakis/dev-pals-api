import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "profiles",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    },
    UpdateExpression: "SET eduData = list_append(eduData, :eduData)",
    ExpressionAttributeValues: {
      ":eduData": [data.eduData]
    }
  };

  try {
    console.log(params);
    await dynamoDbLib.call("update", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
