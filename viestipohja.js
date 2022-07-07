"use strict";

// Muotoillaan tietokantahausta mukavannäköinen viesti
export default function muotoilu(data) {
  let viesti = `Tuntiraportti

Kirjatut tapahtumat:
`;

  data.tapahtumat.forEach(
    (rivi) =>
      (viesti += `
Projekti: ${rivi.projekti}
Aloitus: ${rivi.aloitus}  Lopetus: ${rivi.lopetus}
Selite: ${rivi.selite}
`)
  );

  viesti += `
-----------
Tunnit yhteensä: ${data.tuntisumma.sum}`;

  return viesti;
}
