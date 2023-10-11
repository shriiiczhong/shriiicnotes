import { Table } from "sst/node/table";
import handler from "@shriiicnotes/core/handler";
import dynamoDb from "@shriiicnotes/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Notes.tableName,
    Key: {
        userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
      noteId: event?.pathParameters?.id, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return JSON.stringify({ status: true });
});