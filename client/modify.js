import { SolidNodeClient } from 'solid-node-client';
const client = new SolidNodeClient();

let localhost = "https://localhost:8443";

await client.login({
  idp: localhost,
  username: "alfa",
  password: "Lololol3x!",
});

async function readAndWriteFile() {
  // fetch & display a public resource
  let response = await client.fetch(localhost + '/public/test.md');
  console.log(await response.text());
  // login, then fetch & display a private resource
  let session = await client.login(); // see login details below
  if (session.isLoggedIn) {
    console.log(`logged in as <${session.WebID}>`);
    response = await client.fetch(localhost + '/private/test.md');
    console.log(await response.text())
  }

  let writeResponse = await client.fetch(localhost + '/private/file.txt', {
    method: "PUT",
    body: "some content to go in the resource",
    headers: { "Content-type": 'text/plain' }
  });

  console.log(writeResponse.status);  // 201
  // now read it
  let readResponse = await client.fetch(localhost + '/private/file.txt');
  // display its contents
  console.log(await readResponse.text());
}

readAndWriteFile();