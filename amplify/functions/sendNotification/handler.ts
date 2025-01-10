import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  try {
    const { recipientEmail, subject, body } = event;

    if (!recipientEmail || !subject || !body) {
      throw new Error('Missing recipientEmail, subject, or body in event');
    }

    const emailParams = new SendEmailCommand({
      Source: process.env.SES_SOURCE_EMAIL,
      Destination: {
        ToAddresses: [recipientEmail],
      },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: body } },
      },
    });

    const response = await sesClient.send(emailParams);
    return {
      statusCode: 200,
      body: JSON.stringify({ messageId: response.MessageId }),
    };
  } catch (error) {
    const err = error as Error; // Explicitly type the error
    console.error('Error updating visa status:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
