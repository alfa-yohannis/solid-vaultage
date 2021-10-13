import { SolidNodeClient } from 'solid-node-client';
import * as $rdf from 'rdflib';

const client = new SolidNodeClient();
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store, {fetch:client.fetch.bind(client)});
const updater = new $rdf.UpdateManager(store);
const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');;

const me = store.sym('https://alfa.solidcommunity.net/profile/card#me');
const profile = me.doc();


async function setName(person, name, doc) {
  let ins = $rdf.st(person, VCARD('fn'), name, doc)
  let del = []
  updater.update(del, ins, (uri, ok, message) => {
    if (ok) {
      console.log(uri);
      console.log('Name changed to ' + name);
    }
    else {
      console.log(message);
    }
  });
}

let credential = {
  idp: "https://solidcommunity.net",
  username: "alfa",
  password: "Lololol3x!",
};

let session = await client.login(credential); 
  if (session.isLoggedIn) {
    console.log(session);
    setName(me, "HAHAHA", profile);
}

// import { SolidNodeClient } from 'solid-node-client';
// import * as $rdf from 'rdflib';
// import * as fairnet2 from '@ymp/fairnet';
// import { createDocument, fetchDocument } from 'tripledoc';
// import { space, rdf, solid, schema, foaf, vcard } from 'rdf-namespaces';

// const me = "https://alfa.solidcommunity.net/profile/card#me";
// const fairnetNamespace = 'https://alfa.solidcommunity.net/public/voc/fairnet.ttl#';

// const client = new SolidNodeClient();
// const store = $rdf.graph();
// const FAIRNET = new $rdf.Namespace(fairnetNamespace);

// async function main() {
//   const webIdDoc = await fetchDocument(me);
//   const profile = webIdDoc.getSubject(me);
//   let name = profile.getString(foaf.name);
//   console.log(name);


//   // const publicTypeIndexRef = profile.getRef(solid.publicTypeIndex);
//   // const publicTypeIndex = await fetchDocument(publicTypeIndexRef);
//   // const notesListEntry = publicTypeIndex.findSubject(solid.forClass, schema.TextDigitalDocument);

//   // /* 2. If it doesn't exist, create it. */
//   // if (notesListEntry === null) {
//   //   const storage = profile.getRef(space.storage);

//   //   // Decide at what URL within the user's Pod the new Document should be stored:
//   //   const notesListRef = storage + 'public/posts.ttl';

//   //   // Create the new Document:
//   //   const notesList = createDocument(notesListRef);
//   //   await notesList.save();

//   //   // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
//   //   const typeRegistration = typeIndex.addSubject();
//   //   typeRegistration.addRef(rdf.type, solid.TypeRegistration);
//   //   typeRegistration.addRef(solid.instance, notesList.asRef());
//   //   typeRegistration.addRef(solid.forClass, schema.TextDigitalDocument);
//   //   await typeIndex.save([typeRegistration]);
//   // }

//   // const notesListRef = notesListEntry.getRef(solid.instance);
//   // let x = await fetchDocument(notesListRef);

// }

// await main();



