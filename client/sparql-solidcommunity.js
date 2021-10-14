import { createRequire } from "module";
const require = createRequire(import.meta.url);

const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();
// const myEngine = newEngine;


// const result = await myEngine.query(`
//   SELECT ?s ?p ?o WHERE {
//     ?s ?p <http://dbpedia.org/resource/Belgium>.
//     ?s ?p ?o
//   } LIMIT 100`, {
//   sources: ['http://fragments.dbpedia.org/2015/en'],
// });

const startTime = new Date();

const result = await myEngine.query(`
  PREFIX f:<https://alfa.solidcommunity.net/public/voc/fairnet.ttl#>
  SELECT ?s ?title ?content ?ownedBy WHERE {
    ?s f:content ?content.
    ?s f:ownedBy ?ownedBy.
    ?s f:title ?title
  } LIMIT 100`, {
  sources: ['https://alfa.solidcommunity.net/public/posts'],
});

const endTime = new Date();
console.log(`Execution Time: ${endTime - startTime} milliseconds`);

const bindings = await result.bindings();
bindings.forEach(binding => {
  console.log("Post Id: " + binding.get('?s').value);
  // console.log(binding.get('?s').termType);
  console.log("Title: " + binding.get('?title').value);
  console.log("Content: " + binding.get('?content').value);
  console.log("Owner: " + binding.get('?ownedBy').value);
  console.log();
});

// result.bindingsStream.on('data', (binding) => {
//   console.log(binding.get('?s'));
//   console.log("Post Id: " + binding.get('?s').value);
//   // console.log(binding.get('?s').termType);
//   console.log("Title: " + binding.get('?title').value);
//   console.log("Content: " + binding.get('?content').value);
//   console.log("Owner: " + binding.get('?ownedBy').value);
//   console.log();
// });