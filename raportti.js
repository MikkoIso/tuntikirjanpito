"use strict";
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./libs/snsClient.js";
import { haeTietokannasta } from "./datasiirto.js";
import viestipohja from "./viestipohja.js";
import { getStackExports } from "./stackOutputs.js";

// Haetaan tietokannasta tiedot
let data = await haeTietokannasta();

// Muotoillaan viesti sähköpostia varten
const viesti = viestipohja(data);

// console.log(viesti);

const region = "eu-north-1";
const stackName = "KuumatKinkut";

// Määritellään komento SNS:lle
var params = {
  Message: viesti,
  TopicArn: await getStackExports({ stackName, region }), // Noudetaan aiheen ARN osoite Stackistä YML
};
// Lähetä viesti -funktio
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
