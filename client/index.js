// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const  FAIRNET  = require('./Generated/SourceCodeArtifacts/JavaScript/GeneratedVocab/FAIRNET.cjs');

import FAIRNET from '@ymp/fairnet';

// const  FAIRNET  = require('@inrupt/generated-vocab-fairnet');

console.log(`What is Pet Rock 'shininess'?\n`);

console.log(`Our vocabulary describes it as:`);
console.log(FAIRNET.Post.title);
