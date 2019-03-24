import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const bodyWithId = JSON.parse(event.body);
  bodyWithId.eduData._id = uuid.v1();
  const data = bodyWithId;

  const params = {
    TableName: "profiles",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    },
    UpdateExpression: "SET eduData = list_append(:eduData, eduData)",
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
