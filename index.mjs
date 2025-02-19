/**
 * @typedef {Object} ChatOptions
 * @property {*} messages - If you want to use ChatBuilder, use ChatBuilder.build()
 * @property {*} model - The model to use; if you're unsure, use the Models class
 * @property {string} [session_id] - Optional session ID
 * @property {string} [chat_id] - Optional chat ID
 * @property {string} [id] - Optional ID
 * @property {boolean} [stream] - If true, an event stream for chat completions will be used
 */

class Client {
  /**
   * Creates a new Client instance.
   * @param {*} options
   * @param {string} options.token - Your Qwenlm API token
   * @param {string} options.bxumidtoken - Your session ID
   * @param {string} options.bxua - Your user agent
   * @param {string} options.stream - Use event stream for chat completions
   */
  constructor(options) {
    this.options = options;
    if (!options.token) throw new Error("You must provide a token");
    this.headers = {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.5",
      authorization: "Bearer " + this.options.token,
      "content-type": "application/json",
    };
  }

  /**
   * Creates a chat completions request.
   * @param {ChatOptions} options - The options for the chat completions request
   * @returns {Promise<Object|string>} - The API response, either as JSON or text if streaming is enabled
   */
  async createchatcompletions(options) {
    if (!options.messages) throw new Error("You must provide messages");
    if (!options.model) throw new Error("You must provide a model");

    const body = {
      stream: options.stream || false,
      chat_type: "t2t",
      model: options.model,
      messages: options.messages,
    };

    if (options.session_id) body.session_id = options.session_id;
    if (options.chat_id) body.chat_id = options.chat_id;
    if (options.id) body.id = options.id;

    const res = await fetch("https://chat.qwenlm.ai/api/chat/completions", {
      headers: this.headers,
      referrer: "https://chat.qwenlm.ai/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: JSON.stringify(body),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    
    if (!res.ok)
      throw new Error(
        `API returned status code ${res.status} with message: ${(await res.json()).detail}`
      );
    
    return await (options.stream ? res.text() : res.json());
  }
}

class ChatBuilder {
  constructor() {
    this.messages = [];
  }

  /**
   * Adds a message.
   * @param {"user" | "system"} role - The role (either "user" or "system")
   * @param {*} content - The content of the message
   * @param {*} chat_type - Defaults to "t2t"
   * @param {*} extra - Defaults to an empty object
   * @returns {ChatBuilder} The ChatBuilder instance for chaining
   */
  addMessage(role, content, chat_type, extra) {
    if (!role) throw new Error("You must provide a role");
    if (!content) throw new Error("You must provide content");
    this.messages.push({
      role,
      content,
      chat_type: chat_type || "t2t",
      extra: extra || {},
    });
    return this;
  }

  /**
   * Builds and returns the messages array.
   * @returns {Array} The array of messages
   */
  build() {
    return this.messages;
  }
}

class Models {
  /**
   * Available models:
   * - qwen-max-latest
   * - qwen-plus-latest
   * - qwen2.5-vl-72b-instruct
   * - qwen2.5-14b-instruct-1m
   * - qvq-72b-preview
   * - qwq-32b-preview
   * - qwen2.5-coder-32b-instruct
   * - qwen-turbo-latest
   * - qwen2.5-72b-instruct
   */
  static qwenmaxlatest = "qwen-max-latest";
  static qwenpluslatest = "qwen-plus-latest";
  static qwen25vl72binstruct = "qwen2.5-vl-72b-instruct";
  static qwen2514binstruct1m = "qwen2.5-14b-instruct-1m";
  static qvq72bpreview = "qvq-72b-preview";
  static qwq32bpreview = "qwq-32b-preview";
  static qwen25coder32binstruct = "qwen2.5-coder-32b-instruct";
  static qwenturbolatest = "qwen-turbo-latest";
  static qwen2572binstruct = "qwen2.5-72b-instruct";
}

export { Client, ChatBuilder, Models };
