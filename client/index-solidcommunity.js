import { SolidNodeClient } from 'solid-node-client';
const client = new SolidNodeClient();

async function login(credentials) {
  console.log('logging in ...');
  let session = await client.login(credentials);
  if (session.isLoggedIn) {
    console.log(`logged in as <${session.WebID}>`);

    let response1 = await client.fetch('https://alfa.solidcommunity.net/public/test.md');
    console.log(await response1.text());

    let response2 = await client.fetch('https://alfa.solidcommunity.net/private/test.md');
    console.log(await response2.text())

    return session;
  }
  else {
    console.log(`Could not login to <${credentials.idp}>`);
  }
}
login({
  idp: "https://solidcommunity.net",
  username: "alfa",
  password: "Lololol3x!",
});