"use strict";

import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DB_CONNECTIONSTRING });

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
    console.log("Kirjauksesi on tallennettu tietokantaan.");
  } catch (e) {
    console.log("Virhe tietokantaan tallennuksessa!");
    throw e;
  } finally {
    client.release();
  }
}
