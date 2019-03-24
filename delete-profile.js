import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "profiles",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    console.log(
      event.requestContext.identity.cognitoIdentityId,
      event.pathParameters.id
    );
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (err) {
    return failure({ status: false });
  }
}
