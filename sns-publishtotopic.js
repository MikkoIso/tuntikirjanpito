// Import required AWS SDK clients and commands for Node.js
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./libs/snsClient.js";

// Set the parameters
var params = {
  Message: "Tähän viestin message.", // MESSAGE_TEXT
  TopicArn: "TÄHÄN TOPIC ARN", //TOPIC_ARN;
};

export const publishToTopic = async () => {
  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log("Success.", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err.stack);
  }
};
publishToTopic();
