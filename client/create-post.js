import { SolidNodeClient } from 'solid-node-client';
import * as $rdf from 'rdflib';
import FAIRNET from '@ymp/fairnet';

const client = new SolidNodeClient();
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store, {fetch:client.fetch.bind(client)});
const updater = new $rdf.UpdateManager(store);

const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const FAIRNET2 = new $rdf.Namespace('https://alfa.solidcommunity.net/public/voc/fairnet.ttl#');
const RDF = new $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const RDFS = new $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
const OWL = new $rdf.Namespace('http://www.w3.org/2002/07/owl#');
const THIS  = new $rdf.Namespace('https://alfa.solidcommunity.net/public/posts#');

const me = store.sym('https://alfa.solidcommunity.net/profile/card#me');
const posts = store.sym('https://alfa.solidcommunity.net/public/posts');
const postsDoc = posts.doc();

let post = FAIRNET.Post;

// async function setName(person, name, doc) {
//   let ins = $rdf.st(FAIRNET2(':p1'), FAIRNET2('title'), name, doc)
//   let del = []
//   updater.update(del, ins, (uri, ok, message) => {
//     if (ok) {
//       console.log(uri);
//       console.log('Name changed to ' + name);
//     }
//     else {
//       console.log(message);
//     }
//   });
// }

let credential = {
  idp: "https://solidcommunity.net",
  username: "alfa",
  password: "Lololol3x!",
};

let session = await client.login(credential); 
  if (session.isLoggedIn) {
    console.log(session);
    
    store.add(THIS("post01"), RDF("type"), FAIRNET2('Post'), postsDoc);
    store.add(THIS("post01"), FAIRNET2("title"), 'Title-01', postsDoc);
    store.add(THIS("post01"), FAIRNET2("content"), "Content-01", postsDoc);
    store.add(THIS("post01"), FAIRNET2("ownedBy"), me, postsDoc);

    store.add(THIS("post02"), RDF("type"), FAIRNET2('Post'), postsDoc);
    store.add(THIS("post02"), FAIRNET2("title"), 'Title-02', postsDoc);
    store.add(THIS("post02"), FAIRNET2("content"), "Content-02", postsDoc);
    store.add(THIS("post02"), FAIRNET2("ownedBy"), me, postsDoc);
    
    console.log($rdf.serialize(posts, store, postsDoc.uri, 'text/turtle'));
    fetcher.putBack(posts);
    console.log("Finished!");

    // setName(me, "XOXOXOXO", profile);
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



