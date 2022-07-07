import { SNSClient } from "@aws-sdk/client-sns";

// Määritellään sns-asiakasyhteys

// Set the AWS Region.
const REGION = "eu-north-1"; //e.g. "us-east-1"
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });
export { snsClient };
