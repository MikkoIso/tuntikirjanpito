"use strict";
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./libs/snsClient.js";
import { haeTietokannasta } from "./datasiirto.js";
import viestipohja from "./viestipohja.js";

let data = await haeTietokannasta();

const viesti = viestipohja(data);

// console.log(viesti);

// Set the parameters
var params = {
  Message: viesti, // MESSAGE_TEXT
  TopicArn: "arn:aws:sns:eu-north-1:235920682125:kuumakinkkukeskustelu", //TOPIC_ARN;
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
