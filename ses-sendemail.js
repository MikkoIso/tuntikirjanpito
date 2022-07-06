// Create the promise and SES service object

// Import required AWS SDK clients and commands for Node.js
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./libs/sesClient.js";

// Set the parameters
const params = {
  Destination: {
    CcAddresses: [
      /* more items */
    ],
    ToAddresses: [
      "tiinatuulia.vaisanen@gmail.com", //RECEIVER_ADDRESS
      /* more To-email addresses */
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: "UTF-8",
        Data: "Moikka, tää on html-viesti", // tää tekstinä itse viestiin
      },
      Text: {
        Charset: "UTF-8",
        Data: "Täspä tää",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Ja tämä oli subject", // tähän otsikko
    },
  },
  Source: "tiina.vaisanen@awacademy.training", // SENDER_ADDRESS
  ReplyToAddresses: [
    /* more items */
  ],
};

const spostinLahetys = async () => {
  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log("Sähköposti lähetetty", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

spostinLahetys();
