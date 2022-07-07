"use strict";

import "dotenv/config";
import pg from "pg";
import AWS from "aws-sdk";
const { Pool } = pg;

let secretManager = new AWS.SecretsManager({ region: "eu-north-1" });
const data = await secretManager
  .getSecretValue({ SecretId: "kinkkusalaisuus" })
  .promise();
let secret = JSON.parse(data.SecretString);
const pool = new Pool({
  user: secret.username,
  host: secret.host,
  database: secret.dbname,
  password: secret.password,
  port: 5432,
});

export default async function lataaTietokantaan(kirjaus) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "INSERT INTO tuntikirjaus (projekti, aloitus, lopetus, tuntisumma, selite) VALUES ($1,$2,$3,$4,$5)",
      [
        kirjaus.projekti,
        kirjaus.aloitus.toLocaleString(),
        kirjaus.lopetus.toLocaleString(),
        kirjaus.tuntisumma,
        kirjaus.selite,
      ]
    );
    // console.log("Kirjauksesi on tallennettu tietokantaan.");
  } catch (e) {
    console.log("Virhe tietokantaan tallennuksessa!");
    throw e;
  } finally {
    client.release();
  }
}

export async function haeTietokannasta() {
  const client = await pool.connect();
  try {
    const response = await client.query("SELECT * from tuntikirjaus;", []);
    const tunnit = await client.query(
      "SELECT SUM(tuntisumma) from tuntikirjaus;",
      []
    );
    return { tapahtumat: response.rows, tuntisumma: tunnit.rows[0] };
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
}
