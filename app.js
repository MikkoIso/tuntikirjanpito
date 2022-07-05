"use strict";
import promptSync from "prompt-sync";
const prompt = promptSync();

const tuntikirjaus = {};

function validoipvm(date) {
  const a = Date.parse(tuntikirjaus.aloitus);
  const l = Date.parse(date);
  if (a > l) {
    return false;
  } else {
    return true;
  }
}

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
      console.log("Lopetuspäivämäärän lisääminen ei onnistunut");
    }

    if (validoipvm(date) === false) {
      console.log("Lopetuspäivämäärä ei voi olla ennen aloituspäivämäärää");
    } else {
      tuntikirjaus.lopetus = date;
      console.log(`Lopetuspäivämäärä  ja -aika: ${pvm} ${klo} \n`);
      jatka = false;
    }
  } while (jatka);
}

async function projekti() {
  let jatka = true;

  do {
    const projekti = prompt("Anna projektin nimi: ");
    if (projekti === "") {
      console.log("Projektin nimi ei voi olla tyhjä");
    } else {
      tuntikirjaus.projekti = projekti;
      console.log(`Projektin nimi: ${projekti} \n`);
      jatka = false;
    }
  } while (jatka);
}

async function selite() {
  let jatka = true;

  do {
    const selite = prompt("Kerro mitä on tehty: ");
    if (selite === "") {
      console.log("Selite ei voi olla tyhjä");
    } else {
      tuntikirjaus.selite = selite;
      console.log(`Annettu selite: ${selite}\n`);
      jatka = false;
    }
  } while (jatka);
}

async function tuntisumma() {
  const a = Date.parse(tuntikirjaus.aloitus);
  const l = Date.parse(tuntikirjaus.lopetus);
  const summa = (l - a) / 3600000;
  tuntikirjaus.tuntisumma = summa;
}

async function kaynnista() {
  console.log("Tervetuloa tuntikirjanpitoon! \n");
  aloitus();
  lopetus();
  projekti();
  selite();
  tuntisumma();
  console.log("Tuntikirjaus lisätty! \n");
  const obj = JSON.stringify(tuntikirjaus);
  console.log(obj);
}

kaynnista();
