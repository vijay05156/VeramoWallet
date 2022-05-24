const express =  require('express')
const { agent } = require('../veramo/setup');
const cors = require('cors');

const { AgentRouter, RequestWithAgentRouter,MessagingRouter ,ApiSchemaRouter} = require('@veramo/remote-server');

//const {MessagingRouter}  = require('./messaging-router');
// const {ApiSchemaRouter} = require('./api-schema-router');
const basePath = '/agent'
const schemaPath = '/open-api.json'
const port = process.env.PORT || 15403
const exposedMethods = agent.availableMethods();


const getAgentForRequest = async (req) => agent;
//console.log(getAgentForRequest().then(console.log))

const requestWithAgent = RequestWithAgentRouter({ agent })
//console.log(agent);
const agentRouter = AgentRouter({
    getAgentForRequest,
    exposedMethods: agent.availableMethods()
})

const schemaRouter = ApiSchemaRouter({
    basePath,
    getAgentForRequest,
    exposedMethods,
})

//   const didDocRouter = WebDidDocRouter({
//     getAgentForRequest,
//   })

const app = express()
app.use(cors());
app.use(requestWithAgent)
app.use(basePath, agentRouter)
app.use(schemaPath, schemaRouter)
// app.use(didDocRouter)


app.use(
  '/messaging',
  requestWithAgent,
  MessagingRouter({
    metaData: { type: 'DIDComm', value: 'integration test' },
  }),
)
restServer = app.listen(port, () => {
    console.log("server hosted", port)
})
console.log("server hosted")