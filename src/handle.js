require('dotenv').config();
const {agent} = require('./veramo/setup');

const handle = async()=>
{
  
     const raw = "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUHJvZmlsZSJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJuYW1lIjoidmlqYXkiLCJhZ2UiOiIxOCJ9fSwic3ViIjoiZGlkOmV0aHI6cmlua2VieToweDAzZTc4NmMwYTQzMDdiNmYzYzEzNzk1OThmYTY3OTc3ODVlNTRjODM4MjI2Yzk4MTgwYzFkMjc5MjJlMTMzMGJiMiIsIm5iZiI6MTY1MzI4NDcyMSwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweDAyYjk5YTEyN2M5ZDhkZTUzNWY5ZWExNWNhODcyNjEyZmRjMWNmODVjM2U3MzVjYTc5NTY1NTc0MDAzM2I0OTZlOCJ9.FBws7eGC_qyjSudD1vMsWriBqyqtGtgZKzoPXUoZconos7Fv9_Zt3RDGdKwRHxM4-dt4olRXQYMxY-K48AV-Ag"
    const parsedMessage = await agent.handleMessage({
     raw,
     save: false,
     metaData: [{ type: 'test' }],
    })
    console.log(parsedMessage);

}
handle()

