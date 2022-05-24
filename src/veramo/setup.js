const { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager } = require('@veramo/core');

// Core identity manager plugin
const { DIDManager } = require('@veramo/did-manager');

// Ethr did identity provider
const { EthrDIDProvider } = require('@veramo/did-provider-ethr');

// Web did identity provider
const { WebDIDProvider } = require('@veramo/did-provider-web');

// Core key manager plugin
const { KeyManager } = require('@veramo/key-manager');
const { AgentRestClient } = require('@veramo/remote-client');
// Custom key management system for RN
const { KeyManagementSystem, SecretBox } = require('@veramo/kms-local');

// Custom resolvers
const { DIDResolverPlugin } = require('@veramo/did-resolver')
const { Resolver } = require('did-resolver');

const {MessageHandler} = require('@veramo/message-handler');
const { getResolver } = require('ethr-did-resolver');
const {DIDCommMessageHandler} = require('@veramo/did-comm');
const {JwtMessageHandler} = require('@veramo/did-jwt');
const {W3cMessageHandler,CredentialIssuer} = require('@veramo/credential-w3c');
const {SdrMessageHandler} = require('@veramo/selective-disclosure');
//const { getResolver as webDidResolver } = require('web-did-resolver')
require('dotenv').config();
// Storage plugin using TypeOrm
const { Entities, KeyStore, DIDStore, IDataStoreORM, PrivateKeyStore, migrations,DataStore,DataStoreORM } = require('@veramo/data-store');

// TypeORM is installed with `@veramo/data-store`
const { createConnection } =  require('typeorm');
const {DATABASE_FILE} = require('../config/config');
const dbConnection = createConnection({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
  })

const agent = createAgent({
    plugins: [
      new KeyManager({
        store: new KeyStore(dbConnection), 
     
        kms: {
          local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(process.env.KMS_SECRET_KEY))),
        },
      }),
      new DIDManager({
        store: new DIDStore(dbConnection),
        defaultProvider: 'did:ethr:rinkeby',
        providers: {
          'did:ethr:rinkeby': new EthrDIDProvider({
            defaultKms: 'local',
            network: 'rinkeby',
            rpcUrl: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID,
          }),
          'did:web': new WebDIDProvider({
            defaultKms: 'local',
          }),
        },
      }),
      new MessageHandler({
        messageHandlers: [
          new DIDCommMessageHandler(),
          new JwtMessageHandler(),
          new W3cMessageHandler(),
          new SdrMessageHandler(),

        ],
      }),
      new DataStore(dbConnection),
      new DataStoreORM(dbConnection),
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...getResolver({ 
            infuraProjectId: process.env.INFURA_PROJECT_ID
           }),
          //...webDidResolver(),
        }),
      }),
      new CredentialIssuer(),
    ],
  })
  module.exports = {
    agent : agent
  }