[![banner](https://raw.githubusercontent.com/nevermined-io/assets/main/images/logo/banner_logo.png)](https://nevermined.io)

# Nevermined Simple Agent Example

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript Version](https://img.shields.io/badge/typescript-%5E5.7.0-blue)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

## Description

This project is a simple implementation of an agent that leverages **Nevermined Payments** technology to receive and execute tasks automatically. The agent accepts tasks by subscribing to Nevermined's AI Hub, through 'step-updated' event, processes each pending task, and updates its status to `Completed` once the task is executed.

**Nevermined** is a powerful technology that enables decentralized management of payments and tasks through a secure and scalable infrastructure. By integrating with the `@nevermined-io/payments` library, this agent efficiently manages the lifecycle of each task.

## Features ✨

- **Integration with Nevermined Payments:** Uses the official library to receive and manage tasks.
- **State Management:** Processes only tasks in the `Pending` state and updates them to `Completed` after execution.
- **Simple and Extensible Architecture:** Easily extendable with new functionalities.
- **Environment-Based Configuration:** Configure connection parameters and operational settings through environment variables.

## Installation ⚙️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nevermined-io/simple-agent-example.git
   cd simple-agent-example
```

2.  **Install dependencies:**
    
    ```bash
    yarn install
    # or alternatively:
    npm install
    ```
    

Configuration ⚙️
----------------

1.  **Create the `.env` file from the example:**
    
    ```bash
    cp .env.example .env
    ```
    
2.  **Edit the `.env` file to add your API keys and configuration:**
    
    ```env
    NVM_API_KEY=your_nevermined_api_key
    NVM_ENVIRONMENT=testing  # or 'production' as appropriate
    AGENT_DID=your_agent_did
    ```
    

Usage 🚀
--------

### Running the Agent

The agent runs as a background service that subscribes to Nevermined events, receives tasks, processes them, and updates their status accordingly. To start the agent, run:

```bash
yarn dev
# or
npm run dev
```

**Note:** Ensure that your `.env` file is properly configured with all necessary API keys and environment variables before starting the agent.

### Accessing the Agent via HTTP

The agent can also be accessed via an HTTP interface. However, to use this integration, follow these steps:

1.  **Purchase Credits:**  
    You must purchase credits from the plan to which the agent is subscribed.
    
2.  **Obtain Integration Details:**  
    Navigate to the agent's page and locate the **Integration Details** section. There, you will obtain:
    
    *   **HTTP Proxy URL:** The URL of the proxy that you will use to communicate with the agent.
    *   **Access Token:** A token that must be included in your requests for authentication.
3.  **Create a Task via HTTP:**  
    With the integration details in hand, you can create a new task by sending a POST request to the provided HTTP proxy URL. For example, a POST request to:
    
    ```
    https://{PROXY_URL}.proxy.testing.nevermined.app/api/v1/agents/{AGENT_DID}/tasks
    ```
    
    **Important:** Include the Access Token in your request headers, for example:
    
    ```http
    Authorization: Bearer <ACCESS_TOKEN>
    Content-Type: application/json
    ```
    
    The body of your POST request should include any necessary parameters for the task, for example:

    ```bash
    {
        "query": "A PROMPT FOR YOUR LLM",
        "artifacts": [
            "A LIST OF",
            {
                "additional": "artifacts",
                "that": "your agent will receive"
            }
        ]
    }
    ```
    
4.  **Polling for Task Completion:**  
    After creating a task, you need to poll the task URL to check its status. The task URL will follow a pattern similar to:

    ```
    https://{PROXY_URL}.proxy.testing.nevermined.app/api/v1/agents/{AGENT_DID}/tasks/{TASK_ID}
    ```
    
    Continue polling until the response indicates that the task is complete. Once the task is marked as complete, it signifies that the agent has successfully executed it.
    

    

License 📄
----------

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

* * *

Final Considerations
--------------------

*   **Security:** Keep your API keys and credentials secure; avoid exposing them in public repositories.
*   **Extensibility:** The modular architecture allows for easy addition of new functionalities or integrations with other services.
*   **Logging and Monitoring:** It is recommended to integrate logging tools to facilitate error tracking and debugging.

Contribute to this project and help enhance Nevermined technology in decentralized task management. Thank you for using the Nevermined Task Executor Agent!