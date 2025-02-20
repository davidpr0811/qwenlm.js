# Qwenlm Chat API Client

This library provides a simple client for interacting with the Qwenlm Chat API. It offers:

- A **Client** class for sending chat completions requests.
- A **ChatBuilder** class to easily build message arrays.
- A **Models** class containing a list of available chat models.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initializing the Client](#initializing-the-client)
  - [Building Chat Messages](#building-chat-messages)
  - [Making a Chat Completion Request](#making-a-chat-completion-request)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd qwenlm-chat-api-client
npm install
```

If published on npm, you can install via:

```bash
npm install qwenlm-chat-api-client
```

## Usage

### Initializing the Client

Import the classes and create a new instance of the **Client** class with your API token and other required options.

```js
import { Client, ChatBuilder, Models } from './path/to/your/file.mjs';

const client = new Client({
  token: "YOUR_API_TOKEN",         // Your Qwenlm API token
  // bxumidtoken: "YOUR_SESSION_ID",     Your session ID (optional)
  // bxua: "YOUR_USER_AGENT",            Your user agent (optional)
  //stream: false                      Option to use event stream for chat completions (optional)
});
```

### Building Chat Messages

Use the **ChatBuilder** class to construct your chat messages:

```js
const chatBuilder = new ChatBuilder();
chatBuilder.addMessage("user", "Hello, how are you?");
const messages = chatBuilder.build();
```

### Making a Chat Completion Request

Call the `createchatcompletions` method with your chat options, including the messages and the desired model from the **Models** class.

```js
client.createchatcompletions({
  messages: messages,
  model: Models.qwenmaxlatest,  // Choose a model from the Models class
  // Optional parameters:
  // session_id: "optional-session-id",
  // chat_id: "optional-chat-id",
  // id: "optional-id",
  // stream: true  // if you want to use an event stream
})
.then(response => {
  console.log("API Response:", response.choices[0].message);
})
.catch(error => {
  console.error("Error:", error);
});
```

## API Reference

### Client

#### `constructor(options)`

- **options.token** (`string`): Your Qwenlm API token.
- **options.bxumidtoken** (`string`): Your session ID.
- **options.bxua** (`string`): Your user agent.
- **options.stream** (`string`): Option to use event stream for chat completions.

#### `createchatcompletions(options)`

- **options.messages**: Use `ChatBuilder.build()` to supply messages.
- **options.model**: The model to use (refer to the **Models** class for available options).
- **options.session_id** (`string`, optional): Session ID.
- **options.chat_id** (`string`, optional): Chat ID.
- **options.id** (`string`, optional): Optional ID.
- **options.stream** (`boolean`, optional): If true, an event stream for chat completions will be used.

**Returns:** `Promise<Object|string>` – The API response as JSON or plain text if streaming is enabled.

### ChatBuilder

#### `addMessage(role, content, chat_type, extra)`

- **role** (`"user" | "system"`): The role for the message.
- **content** (`*`): The content of the message.
- **chat_type** (`*`): Defaults to `"t2t"`.
- **extra** (`*`): Additional parameters (defaults to an empty object).

**Returns:** The **ChatBuilder** instance to allow chaining.

#### `build()`

**Returns:** An array of chat messages.

### Models

The **Models** class provides a list of available chat models, such as:

- `Models.qwenmaxlatest`
- `Models.qwenpluslatest`
- `Models.qwen25vl72binstruct`
- `Models.qwen2514binstruct1m`
- `Models.qvq72bpreview`
- `Models.qwq32bpreview`
- `Models.qwen25coder32binstruct`
- `Models.qwenturbolatest`
- `Models.qwen2572binstruct`

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
