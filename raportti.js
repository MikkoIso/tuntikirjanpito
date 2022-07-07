"use strict";
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./libs/snsClient.js";
import { haeTietokannasta } from "./datasiirto.js";
import viestipohja from "./viestipohja.js";
import { getStackExports } from "./stackOutputs.js";

let data = await haeTietokannasta();

const viesti = viestipohja(data);

// console.log(viesti);

const region = "eu-north-1";
const stackName = "KuumatKinkut";

// Set the parameters
var params = {
  Message: viesti, // MESSAGE_TEXT
  TopicArn: await getStackExports({ stackName, region }), //TOPIC_ARN;
};

export const publishToTopic = async () => {
  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log("Sähköposti lähetetty.", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err.stack);
  }
};

publishToTopic();
