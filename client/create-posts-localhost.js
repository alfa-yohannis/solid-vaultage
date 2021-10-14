import { SolidNodeClient } from 'solid-node-client';
import * as $rdf from 'rdflib';

const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const FAIRNET = new $rdf.Namespace('https://alfa.solidcommunity.net/public/voc/fairnet.ttl#');
const RDF = new $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const RDFS = new $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');
const OWL = new $rdf.Namespace('http://www.w3.org/2002/07/owl#');

const NUM_OF_PODS = 15;
const NUM_OF_POSTS = 100;
var portNum = 9100;
var content = "";
for (let c = 1; c <= 1000; c++) {
  content += "A";
}

for (let i = 1; i <= NUM_OF_PODS; i++) {
  portNum += 1;

  var credential = {
    idp: "https://localhost:" + portNum,
    username: "alice",
    password: "Lololol3x!",
  };
  console.log("Creating posts at " +  credential.idp + "...");

  var client = new SolidNodeClient();
  var store = $rdf.graph();
  var fetcher = new $rdf.Fetcher(store, { fetch: client.fetch.bind(client) });
  // var updater = new $rdf.UpdateManager(store);

  var THIS = new $rdf.Namespace('https://localhost:' + portNum + '/public/posts#');
  var me = store.sym('https://localhost:' + portNum + '/profile/card#me');
  var posts = store.sym('https://localhost:' + portNum + '/public/posts');
  var postsDoc = posts.doc();
  
  var session = await client.login(credential);
  if (session.isLoggedIn) {
    // console.log(session);

    var postNum = 100;
    for (let j = 1; j <= NUM_OF_POSTS; j++) {
      postNum += 1;
      store.add(THIS("post" + postNum), RDF("type"), FAIRNET('Post'), postsDoc);
      store.add(THIS("post" + postNum), FAIRNET("title"), 'Title-' + postNum, postsDoc);
      store.add(THIS("post" + postNum), FAIRNET("content"), content, postsDoc);
      store.add(THIS("post" + postNum), FAIRNET("ownedBy"), me, postsDoc);
    }

    // console.log($rdf.serialize(posts, store, postsDoc.uri, 'text/turtle'));
    await fetcher.putBack(posts);
    
    console.log("Success!!!");
  } else {
    console.log("Cannot login!!! ");
  }
  await session.logout();
}

console.log("Finished!");