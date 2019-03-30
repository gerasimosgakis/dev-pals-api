import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "posts",
    Item: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      // profileId: uuid.v1(),
      // name: data.name,
      // handle: data.handle,
      // avatar: data.avatar,
      // company: data.company,
      // website: data.website,
      // location: data.location,
      // status: data.status,
      // skills: data.skills,
      // bio: data.bio,
      // githubusername: data.githubusername,
      // expData: data.expData || [],
      // eduData: data.education || [],
      // linkedin: data.linkedin,
      // facebook: data.facebook,
      // youtube: data.youtube,
      // instagram: data.instagram,
      // twitter: data.twitter,
      // createdAt: Date.now()
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: uuid.v1(),
      name: data.name,
      avatar: data.avatar,
      text: data.text,
      likes: [],
      comments: [],
      createdAt: Date.now
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }

  // dynamoDb.put(params, (error, data) => {
  //   // Set response headers to enable CORS (Cross-Origin Resource Sharing)
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Credentials": true
  //   };

  //   // Return status code 500 on error
  //   if (error) {
  //     const response = {
  //       statusCode: 500,
  //       headers: headers,
  //       body: JSON.stringify({ status: false })
  //     };
  //     callback(null, response);
  //     return;
  //   }

  //   // Return status code 200 and the newly created item
  //   const response = {
  //     statusCode: 200,
  //     headers: headers,
  //     body: JSON.stringify(params.Item)
  //   };
  //   callback(null, response);
  // });
}
