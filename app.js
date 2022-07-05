"use strict";
import promptSync from "prompt-sync";
const prompt = promptSync();

const tuntikirjaus = {};

async function aloitus() {
  let jatka = true;
  do {
    const pvm = prompt("Anna aloituspäivämäärä muodossa yyyy-mm-dd: ");
    const klo = prompt("Anna aloituskellonaika muodossa hh:mm:ss: ");
    const date = new Date(pvm + " " + klo);
    if (isNaN(date)) {
      // Tarkista, että validi päivämäärä: validoipvm()
      console.log("Aloituspäivämäärän lisääminen ei onnistunut");
    } else {
      tuntikirjaus.aloitus = date;
      console.log(`Aloituspäivämäärä  ja -aika: ${pvm} ${klo} \n`);
      jatka = false;
    }
  } while (jatka);
}

// Tarkista, että validi kellonaika

async function lopetus() {
  let jatka = true;
  do {
    const pvm = prompt("Anna lopetuspäivämäärä muodossa yyyy-mm-dd: ");
    const klo = prompt("Anna lopetuskellonaika muodossa hh:mm:ss: ");
    const date = new Date(pvm + " " + klo);
    if (isNaN(date)) {
      // Tarkista, että validi päivämäärä: validoipvm()
      console.log("Lopetuspäivämäärän lisääminen ei onnistunut");
    } else {
      tuntikirjaus.lopetus = date;
      console.log(`Lopetuspäivämäärä  ja -aika: ${pvm} ${klo} \n`);
      jatka = false;
    }
  } while (jatka);
}

// Tarkista, että validi päivämäärä: validoipvm()

// Tarkista, että validi kellonaika
// Tarkista että aloitus (pvm & klo) < lopetus (pvm & klo)

async function projekti() {}

async function selite() {}

async function kaynnista() {
  console.log("Tervetuloa tuntikirjanpitoon! \n");
  aloitus();
  lopetus();
  const obj = JSON.stringify(tuntikirjaus);
  console.log(obj);
}

kaynnista();
