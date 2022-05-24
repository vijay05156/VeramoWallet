
const  { agent } = require('./veramo/setup');

async function main() {
  const identity = await agent.didManagerCreate();
 // console.log(`New identity created`,identity)
  // console.log(identity)
 //const a =  agent.availableMethods();

 await agent.createVerifiableCredential({
  credential: {
    issuer: { id: identity.did },
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: identity.did,
      topic: 'math',
    },
  },
  proofFormat: 'jwt',
  save: true,
});
 const v =agent.getSchema();
console.log(v);
}

main().catch(console.log)