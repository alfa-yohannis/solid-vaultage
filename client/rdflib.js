import {SolidNodeClient} from 'solid-node-client';
import * as $rdf from 'rdflib';

const client = new SolidNodeClient();
const store = $rdf.graph();

async function main(){
  const me = store.sym('https://alfa.solidcommunity.net/profile/card#me');
  const profile = me.doc();       
  const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  store.add(me, VCARD('fn'), "Alexander Alex", profile);
  let name1 = store.any(me, VCARD('fn'), null, profile);
  console.log(name1);
  let name2 = store.any(me, VCARD('fn'));
  console.log(name2);

  let text = '<#this>  a  <#Example> .';
  let doc = $rdf.sym("https://alfa.solidcommunity.net/profile/card");
  let a1 = $rdf.parse(text, store, doc.uri, 'text/turtle');
  store.toNT();
  console.log($rdf.serialize(doc, store, doc.uri, 'text/turtle'));

}

main();