import { SESClient } from "@aws-sdk/client-ses";
// Set the AWS Region.
const REGION = "eu-north-1"; //e.g. "us-east-1"
// Create SES service object.
const sesClient = new SESClient({ region: REGION });
export { sesClient };
