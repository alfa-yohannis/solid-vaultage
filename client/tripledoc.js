import { fetchDocument } from 'tripledoc';
import { foaf, vcard } from 'rdf-namespaces';

async function getName(url) {
  /* 1. Fetch the Document at `webId`: */
  const webIdDoc = await fetchDocument(url);
  /* 2. Read the Subject representing thed current user's profile: */
  const profile = webIdDoc.getSubject(url);
  /* 3. Get their foaf:name: */
  console.log(profile.getString(foaf.name));
  return profile.getString(vcard.fn);
}


let name = await getName("https://alfa.solidcommunity.net/profile/card#me");
console.log(name);