// Descarga los assets Custom_* de OpenAI a public/assets/letters/
// Uso: npm run download-assets
// Origen: https://openai.com/index/introducing-chatgpt-images-2-5/
// © OpenAI. Solo para estudio/recreación. Ver README atribución.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'assets', 'letters');

const ASSETS = {
  'Custom_C-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/7t95fuFaas9S8B0rNlPMyi/85cf7c9ea79f3cee0d19762ad74420d9/Custom_C-1.png',
  'Custom_C-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/2GT92BHF56dSdcSydscHFr/aa56146419c0f7bf1f3951b65c774b6f/Custom_C-2.png',
  'Custom_h-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/eJCfra8VG2lNL78anwslJ/3ed8b3a8009fbbdb62f3391847c6011e/Custom_h-1.png',
  'Custom_a-1-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/24LKs5W2UKAAbFdCoe709U/70bd24eb11700e410383e60be87cf60c/Custom_a-1-1.png',
  'Custom_T-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/37qncH6gKq67xhpyOWuSDd/3c97ef46de441d45a385964c7b6a1484/Custom_T-2.png',
  't-v2.webp': 'https://images.ctfassets.net/kftzwdyauwt9/6F00DaaXTEcSytr7vzfnLy/80f5768c33616c76b531e24eab32a1da/t-v2.webp',
  'Custom_g-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/22tLfNsXeSNlIOQ5c3DKxB/1bad41b67c92b00b6f0275cf41bfc249/Custom_g-1.png',
  'Custom_g-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/2g0dE92MQsW0wU3X7zj5qL/6391bb8a397a4a0bef72f4744e3c5f80/Custom_g-2.png',
  'Custom_P-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/6QIdM41FULUGKkU7esCPBg/01a61bb4a6786c8f61ef3eed4e81548a/Custom_P-1.png',
  'Custom_P-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/VGMQ3VsLy1QM2lWatxbId/ba67658e57bf1db6519bc147c9c4b4e6/Custom_P-2.png',
  'Custom_t-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/WDIVMyNdfmuou74AF11ae/e585ea17b9530fbe32616e26273ddb5d/Custom_t-1.png',
  'Custom_I-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/7vkMwHaGG3J623uoolTvIk/b99a500ae7febd8685b05273908a724a/Custom_I-1.png',
  'Custom_M-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/2iPiM7sMYispjQahNo0Mtt/733f1cd96b2489a833329e2e17279e7b/Custom_M-1.png',
  'Custom_M-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/15oWtoKCxSo0zPz4AYmIfV/70bb0e57936936f373df92fcf684c7ad/Custom_M-2.png',
  'Custom_a-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/1XaBKUN7MhiiRQhsLkDmeC/f5d37f05b9984c3de0a640150f988fc3/Custom_a-1.png',
  'Custom_a-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/4fZnXrdguOPdmYH4axFFoQ/48cdca5d27afbf2af8edf838eaff1ab6/Custom_a-2.png',
  'Custom_lowerg-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/thwKHERVBy2zx4j5BF13F/a23b360d35c2fb648b7b1a022839011e/Custom_lowerg-1.png',
  'Custom_lowerg-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/6bjk911sGJLjrIy8pkBOtQ/e70c39dbdcca5072ba5605fe2e284ef8/Custom_lowerg-2.png',
  'Custom_e-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/v7gMrfIlM4618OHOgcEHO/6e057cd229c6b29f763b32c0333e5d3f/Custom_e-1.png',
  'Custom_e-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/6PbdR4TBQ8rISoC8fXu9ST/469ffc262a81f32b08ab691c2f292f2d/Custom_e-2.png',
  'Custom_s-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/522MJpWnis8BXCBC3KFgK0/ab12e90415285b646fd8d46657b9ac7c/Custom_s-1.png',
  'Custom_2-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/6fBFrbe8IjnaoAUVLnOV2W/6821e3e389d6ada86162f75a5316316e/Custom_2-1.png',
  'Custom_2-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/5PAdmhxof1bqrAmsn08bEG/34cbce57a9c073d799d187847ed18820/Custom_2-2.png',
  'Custom_period.png': 'https://images.ctfassets.net/kftzwdyauwt9/61HqPQWWogbzUhGfSMvUz5/6c586f726733f30ff0ad6c6de1127f2c/Custom_period.png',
  'Custom5-1.png': 'https://images.ctfassets.net/kftzwdyauwt9/30924A1JRTUWG2ID4aotNz/e5deb53f7b0b1a1120620147747c8f8b/Custom5-1.png',
  'Custom5-2.png': 'https://images.ctfassets.net/kftzwdyauwt9/5AxpAb4CIjSyezTQZZXs0v/e35116c570d0397740ec5353bdf0105a/Custom5-2.png',
};

await mkdir(outDir, { recursive: true });

let ok = 0;
for (const [file, url] of Object.entries(ASSETS)) {
  const dest = path.join(outDir, file);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`ok ${file} (${(buf.length / 1024).toFixed(1)} KB)`);
    ok++;
  } catch (e) {
    console.error(`fail ${file}: ${e.message}`);
  }
}
console.log(`\n${ok}/${Object.keys(ASSETS).length} descargados en ${outDir}`);
