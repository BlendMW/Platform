import { DynamoDB } from '@aws-sdk/client-dynamodb';

const dbClient = new DynamoDB({ region: "us-east-1" });

export const handler = async (event: any) => {
  try {
    const { applicationId, newStatus } = event;

    if (!applicationId || !newStatus) {
      throw new Error('Missing applicationId or newStatus in event');
    }

    await dbClient.updateItem({
      TableName: process.env.TABLE_NAME,
      Key: {
        applicationId: { S: applicationId },
      },
      UpdateExpression: 'SET #status = :newStatus',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':newStatus': { S: newStatus },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Visa status updated successfully' }),
    };
  } catch (error) {
    const err = error as Error;
    console.error('Error updating visa status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
