const { agent } = require('./veramo/setup');

async function main() {
  console.log(agent);
  const identifiers = await agent.didManagerFind()

  console.log(`There are ${identifiers.length} identifiers`)

  if (identifiers.length > 0) {
    identifiers.map((id) => {
      console.log(id)
      console.log('..................')
    })
  }
}

main().catch(console.log)