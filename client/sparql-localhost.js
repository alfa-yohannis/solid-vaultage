import { createRequire } from "module";
const require = createRequire(import.meta.url);

const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();

const REPEAT = 13;
const results = [];

for (var i = 0; i < REPEAT; i++) {
  const startTime = new Date();

  const result = await myEngine.query(`
  PREFIX f:<https://alfa.solidcommunity.net/public/voc/fairnet.ttl#>
  SELECT ?s ?title ?content ?ownedBy WHERE {
    ?s f:content ?content.
    ?s f:ownedBy ?ownedBy.
    ?s f:title ?title
  } `, {
    sources: ['https://localhost:9101/public/posts',
      'https://localhost:9102/public/posts',
      'https://localhost:9103/public/posts',
      'https://localhost:9104/public/posts',
      'https://localhost:9105/public/posts',
      'https://localhost:9106/public/posts',
      'https://localhost:9107/public/posts',
      'https://localhost:9108/public/posts',
      'https://localhost:9109/public/posts',
      'https://localhost:9110/public/posts',
      'https://localhost:9111/public/posts',
      'https://localhost:9112/public/posts',
      'https://localhost:9113/public/posts',
      'https://localhost:9114/public/posts',
      'https://localhost:9115/public/posts'
    ],
  });

  const bindings = await result.bindings();
  const endTime = new Date();
  var time = endTime - startTime;
  if (i > 2) {
    results.push(time);
    console.log(`Execution Time: ${time} milliseconds`);
    console.log("Num of records: " + bindings.length);
  }
}

var total = 0;
for (var i = 0; i < results.length; i++) {
  console.log("I " + (i + 1) + ": " + results[i]);
  total += results[i];
}
var average = total / results.length;
console.log("Average: " + average + " milliseconds");

// bindings.forEach(binding => {
//   console.log("Post Id: " + binding.get('?s').value);
//   // console.log(binding.get('?s').termType);
//   console.log("Title: " + binding.get('?title').value);
//   console.log("Content: " + binding.get('?content').value);
//   console.log("Owner: " + binding.get('?ownedBy').value);
//   console.log();
// });

// result.bindingsStream.on('data', (binding) => {
//   console.log(binding.get('?s'));
//   console.log("Post Id: " + binding.get('?s').value);
//   // console.log(binding.get('?s').termType);
//   console.log("Title: " + binding.get('?title').value);
//   console.log("Content: " + binding.get('?content').value);
//   console.log("Owner: " + binding.get('?ownedBy').value);
//   console.log();
// });