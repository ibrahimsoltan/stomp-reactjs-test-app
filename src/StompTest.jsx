import React, { useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function StompTest() {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    let stompClient = null;

    const connectToWebSocket = () => {
        console.log("Connecting to WebSocket...");

        const socket = new SockJS('http://localhost:8082/gs-guide-websocket'); // Change to your backend WebSocket URL
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log('STOMP Debug:', str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = (frame) => {
            console.log("Connected to WebSocket. Frame:", frame);
            setConnected(true);

            // Subscribe to a topic
            stompClient.subscribe('/topic/greetings', (message) => {
                console.log("Received message:", message.body);
                setMessages((prevMessages) => [...prevMessages, message.body]);
            });

            // Send a test message
            stompClient.publish({
                destination: '/app/hello',
                body: JSON.stringify({ name: 'TestUser' }),
            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error("WebSocket error occurred:", error);
        };

        stompClient.onStompError = (frame) => {
            console.error("STOMP error:", frame.headers['message'], frame.body);
        };

        stompClient.onWebSocketClose = (event) => {
            console.warn("WebSocket connection closed:", event);
            setConnected(false);
        };

        stompClient.activate();
    };

    const disconnectFromWebSocket = () => {
        if (stompClient) {
            stompClient.deactivate();
            console.log("Disconnected from WebSocket.");
            setConnected(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>STOMP WebSocket Test</h1>
            <div>
                {!connected ? (
                    <button onClick={connectToWebSocket} style={{ padding: '10px', background: 'green', color: 'white' }}>
                        Connect to WebSocket
                    </button>
                ) : (
                    <button onClick={disconnectFromWebSocket} style={{ padding: '10px', background: 'red', color: 'white' }}>
                        Disconnect from WebSocket
                    </button>
                )}
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Received Messages:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
