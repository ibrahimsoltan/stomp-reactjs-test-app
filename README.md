# ReactJS Vite WebSocket Test Project

This project demonstrates real-time communication between a ReactJS frontend and a Spring Boot backend using WebSockets, STOMP, and SockJS.

---

## Features
- Establishes a WebSocket connection using SockJS with STOMP protocol.
- Subscribes to a topic to receive real-time messages.
- Supports sending messages to the backend.
- Cross-origin support for development environments.

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- NPM or Yarn
- Java 17 or higher
- Maven
- A web browser

---

### Frontend Setup Instructions

#### 1. Clone the Repository
```bash
$ git clone <repository-url>
$ cd <repository-directory>
```

#### 2. Navigate to the Frontend Directory
```bash
$ cd stomp-test-app
```

#### 3. Install Dependencies
```bash
$ npm install
```

#### 4. Start the Development Server
```bash
$ npm run dev
```

Visit the frontend at `http://localhost:3000`.



## How to Use

1. **Start the Backend:**  
   Ensure the Spring Boot backend is running on `http://localhost:8082`.

## Linked Backend Repository
This project works with a Spring Boot backend. You can find the backend repository here:
[Java Backend Repository](https://github.com/ibrahimsoltan/STOMP-Sample-Project)


2. **Run the Frontend:**  
   Start the Vite development server with `npm run dev`.

3. **Test WebSocket Connection:**
   - Click **"Connect to WebSocket"** in the UI to establish the connection.
   - Messages received from the backend will appear in the message list.
   - A test message is sent to the backend upon connection.

4. **Disconnect:**  
   - Click **"Disconnect from WebSocket"** to close the connection.

---

## Troubleshooting

### Error: `global is not defined`
This issue occurs when using Node.js-specific libraries in a browser. To fix:
1. Add the following line to the top of `main.jsx`:
   ```javascript
   window.global = window;
   ```

2. Alternatively, update `vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite';

   export default defineConfig({
     define: {
       global: 'window',
     },
   });
   ```

---

## Project Structure

```
stomp-test-app/
├── src/
│   ├── StompTest.jsx       // WebSocket testing component
│   ├── main.jsx            // Application entry point
│   ├── index.css           // Styling
├── vite.config.js          // Vite configuration
├── package.json            // Dependencies
```

---

## Tech Stack

- **Frontend:** ReactJS, Vite
- **Libraries:**
  - `@stomp/stompjs`: STOMP client for WebSocket messaging.
  - `sockjs-client`: Fallback WebSocket library.
- **Backend:** Spring Boot with STOMP WebSocket support.

---

## References

- [STOMP.js Documentation](https://stomp-js.github.io/stompjs/)
- [SockJS Documentation](https://github.com/sockjs/sockjs-client)
- [Spring WebSocket Guide](https://spring.io/guides/gs/messaging-stomp-websocket/)

