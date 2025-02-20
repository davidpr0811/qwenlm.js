import { Client, ChatBuilder, Models } from "../index.mjs";

let client = new Client({
  token:
    "your token",
});

let msg = new ChatBuilder().addMessage("user", "was ist 7 mal 7", "t2t", {}).build();

client
  .createchatcompletions({messages:msg,model:"qwen-plus-latest"})
  .then((data) => console.log(data.choices[0].message))
  .catch((error) => console.log(error));