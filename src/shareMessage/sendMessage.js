//send a signed message;//send a signed message;
const {v4} = require('uuid')
const {agent} = require('../veramo/setup');
let recieverDid = 'did:ethr:rinkeby:0x03e786c0a4307b6f3c1379598fa6797785e54c838226c98180c1d27922e1330bb2';

let senderDid = 'did:ethr:rinkeby:0x02b99a127c9d8de535f9ea15ca872612fdc1cf85c3e735ca795655740033b496e8';
const sendSignedMessage = async()=>
{
  try{
    // console.log("Test")
    // const message = {
    //     type: 'veramo.io/chat/v1/basicmessage',
    //     to: recieverDid,
    //     from: senderDid,
    //     id: '1',
    //     body: { hello: 'world' },
    //   }
    //   const packedMessage = await localAgent?.packDIDCommMessage({
    //     packing: 'none',
    //     message,
    //   })
    //   const result = await localAgent?.sendDIDCommMessage({
    //     messageId: '1',
    //     packedMessage,
    //     recipientDidUrl: recieverDid,
    //   })

    //   console.log("Messages Result ", result)
    const message = {
      type: 'test',
      to: recieverDid,
      from: senderDid,
      id: 'test',
      body: { hello: 'world' },
    }

    const packedMessage = await agent.packDIDCommMessage({
      packing: "none",
      message,
    })
    const result = await agent.sendDIDCommMessage({
      messageId: '123',
      packedMessage,
      recipientDidUrl: recieverDid,
    })
    
    console.log("Message sent ", result)
  }
 catch(ex)
 {
   console.log(ex);
 }
}


sendSignedMessage();