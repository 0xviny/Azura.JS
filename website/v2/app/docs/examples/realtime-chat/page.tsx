"use client";

import { useLanguage } from "@/components/language-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/docs/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function RealtimeChatPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Realtime Chat Application",
      subtitle: "Build a realtime chat application with Azura and WebSockets",
      intro:
        "In this example, we'll build a realtime chat application using Azura's WebSocket support. This example demonstrates how to create a chat server that allows users to join rooms, send messages, and receive updates in real-time.",
      features: {
        title: "Key Features",
        description: "This example demonstrates the following features of Azura:",
        list: [
          "WebSocket integration for realtime communication",
          "Room-based chat system",
          "User presence tracking",
          "Message broadcasting",
          "Private messaging",
          "Typing indicators",
          "Message history",
          "JWT authentication for secure connections",
        ],
      },
      serverSetup: {
        title: "Server Setup",
        description: "Let's start by setting up the WebSocket server with Azura:",
      },
      messageHandling: {
        title: "Message Handling",
        description: "Now, let's implement the message handling logic:",
      },
      roomManagement: {
        title: "Room Management",
        description: "Let's implement room management functionality:",
      },
      authentication: {
        title: "Authentication",
        description: "Let's add authentication to secure our WebSocket connections:",
      },
      clientImplementation: {
        title: "Client Implementation",
        description: "Here's a simple client implementation using JavaScript:",
      },
      testing: {
        title: "Testing the Chat Application",
        description: "Let's test our chat application:",
      },
    },
    pt: {
      title: "Aplicação de Chat em Tempo Real",
      subtitle: "Construa uma aplicação de chat em tempo real com Azura e WebSockets",
      intro:
        "Neste exemplo, construiremos uma aplicação de chat em tempo real usando o suporte a WebSocket do Azura. Este exemplo demonstra como criar um servidor de chat que permite aos usuários entrar em salas, enviar mensagens e receber atualizações em tempo real.",
      features: {
        title: "Recursos Principais",
        description: "Este exemplo demonstra os seguintes recursos do Azura:",
        list: [
          "Integração WebSocket para comunicação em tempo real",
          "Sistema de chat baseado em salas",
          "Rastreamento de presença de usuários",
          "Transmissão de mensagens",
          "Mensagens privadas",
          "Indicadores de digitação",
          "Histórico de mensagens",
          "Autenticação JWT para conexões seguras",
        ],
      },
      serverSetup: {
        title: "Configuração do Servidor",
        description: "Vamos começar configurando o servidor WebSocket com Azura:",
      },
      messageHandling: {
        title: "Manipulação de Mensagens",
        description: "Agora, vamos implementar a lógica de manipulação de mensagens:",
      },
      roomManagement: {
        title: "Gerenciamento de Salas",
        description: "Vamos implementar a funcionalidade de gerenciamento de salas:",
      },
      authentication: {
        title: "Autenticação",
        description: "Vamos adicionar autenticação para proteger nossas conexões WebSocket:",
      },
      clientImplementation: {
        title: "Implementação do Cliente",
        description: "Aqui está uma implementação simples de cliente usando JavaScript:",
      },
      testing: {
        title: "Testando a Aplicação de Chat",
        description: "Vamos testar nossa aplicação de chat:",
      },
    },
  };

  const c = content[language];

  const serverSetup = `// src/index.ts
import { AzuraServer, createWebSocket } from '@atosjs/azura';
import { JwtUtil } from './utils/jwt.util';
import { ChatService } from './services/chat.service';
import { AuthMiddleware } from './middleware/auth.middleware';

// Create Azura server
const app = new AzuraServer();

// Create WebSocket server
const wss = createWebSocket(app.server);

// Create services
const jwtUtil = new JwtUtil();
const chatService = new ChatService();
const authMiddleware = new AuthMiddleware(jwtUtil);

// Handle WebSocket connections
wss.on('connection', async (socket, req) => {
  try {
    // Authenticate the connection
    const token = new URL(req.url, 'http://localhost').searchParams.get('token');
    
    if (!token) {
      socket.close(4001, 'Authentication required');
      return;
    }
    
    // Verify token
    const user = await authMiddleware.verifyToken(token);
    
    if (!user) {
      socket.close(4001, 'Invalid token');
      return;
    }
    
    // Set user data on socket
    socket.userId = user.id;
    socket.username = user.username;
    
    // Add user to the online users list
    chatService.addUser(user.id, user.username, socket);
    
    console.log(\`User connected: \${user.username} (\${user.id})\`);
    
    // Send welcome message
    socket.send(JSON.stringify({
      type: 'connected',
      data: {
        userId: user.id,
        username: user.username,
        message: \`Welcome, \${user.username}!\`
      }
    }));
    
    // Broadcast user joined
    chatService.broadcastSystemMessage({
      type: 'userJoined',
      data: {
        userId: user.id,
        username: user.username,
        timestamp: new Date().toISOString()
      }
    });
    
    // Handle messages
    socket.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        handleMessage(socket, message);
      } catch (error) {
        console.error('Error parsing message:', error);
        socket.send(JSON.stringify({
          type: 'error',
          data: { message: 'Invalid message format' }
        }));
      }
    });
    
    // Handle disconnection
    socket.on('close', () => {
      console.log(\`User disconnected: \${user.username} (\${user.id})\`);
      
      // Remove user from online users
      chatService.removeUser(user.id);
      
      // Leave all rooms
      chatService.leaveAllRooms(user.id);
      
      // Broadcast user left
      chatService.broadcastSystemMessage({
        type: 'userLeft',
        data: {
          userId: user.id,
          username: user.username,
          timestamp: new Date().toISOString()
        }
      });
    });
  } catch (error) {
    console.error('WebSocket connection error:', error);
    socket.close(4000, 'Connection error');
  }
});

// Start the server
app.listen(3000);
console.log('Server running at http://localhost:3000');`;

  const messageHandling = `// src/services/chat.service.ts
export class ChatService {
  private users = new Map();
  private rooms = new Map();
  private userRooms = new Map();
  
  // User management
  addUser(userId, username, socket) {
    this.users.set(userId, { userId, username, socket });
    this.userRooms.set(userId, new Set());
  }
  
  removeUser(userId) {
    this.users.delete(userId);
    this.userRooms.delete(userId);
  }
  
  getUser(userId) {
    return this.users.get(userId);
  }
  
  getAllUsers() {
    return Array.from(this.users.values()).map(({ userId, username }) => ({ userId, username }));
  }
  
  // Room management
  createRoom(roomId, name, isPrivate = false) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        name,
        isPrivate,
        users: new Set(),
        messages: []
      });
      return true;
    }
    return false;
  }
  
  joinRoom(userId, roomId) {
    const user = this.users.get(userId);
    const room = this.rooms.get(roomId);
    
    if (!user || !room) return false;
    
    room.users.add(userId);
    this.userRooms.get(userId).add(roomId);
    
    // Notify room members
    this.broadcastToRoom(roomId, {
      type: 'userJoinedRoom',
      data: {
        roomId,
        userId,
        username: user.username,
        timestamp: new Date().toISOString()
      }
    });
    
    return true;
  }
  
  leaveRoom(userId, roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return false;
    
    room.users.delete(userId);
    this.userRooms.get(userId)?.delete(roomId);
    
    // Notify room members
    this.broadcastToRoom(roomId, {
      type: 'userLeftRoom',
      data: {
        roomId,
        userId,
        timestamp: new Date().toISOString()
      }
    });
    
    // Delete room if empty and not the general room
    if (room.users.size === 0 && roomId !== 'general') {
      this.rooms.delete(roomId);
    }
    
    return true;
  }
  
  leaveAllRooms(userId) {
    const userRooms = this.userRooms.get(userId);
    if (!userRooms) return;
    
    for (const roomId of userRooms) {
      this.leaveRoom(userId, roomId);
    }
  }
  
  getRoomUsers(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    
    return Array.from(room.users).map(userId => {
      const user = this.users.get(userId);
      return { userId, username: user.username };
    });
  }
  
  getRoomMessages(roomId, limit = 50) {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    
    return room.messages.slice(-limit);
  }
  
  // Message handling
  sendMessage(userId, roomId, content) {
    const user = this.users.get(userId);
    const room = this.rooms.get(roomId);
    
    if (!user || !room) return false;
    
    // Check if user is in the room
    if (!room.users.has(userId)) return false;
    
    const message = {
      id: Date.now().toString(),
      userId,
      username: user.username,
      roomId,
      content,
      timestamp: new Date().toISOString()
    };
    
    // Store message
    room.messages.push(message);
    
    // Broadcast to room
    this.broadcastToRoom(roomId, {
      type: 'message',
      data: message
    });
    
    return true;
  }
  
  sendPrivateMessage(fromUserId, toUserId, content) {
    const fromUser = this.users.get(fromUserId);
    const toUser = this.users.get(toUserId);
    
    if (!fromUser || !toUser) return false;
    
    const message = {
      id: Date.now().toString(),
      fromUserId,
      fromUsername: fromUser.username,
      toUserId,
      toUsername: toUser.username,
      content,
      timestamp: new Date().toISOString()
    };
    
    // Send to recipient
    toUser.socket.send(JSON.stringify({
      type: 'privateMessage',
      data: message
    }));
    
    // Send confirmation to sender
    fromUser.socket.send(JSON.stringify({
      type: 'privateMessageSent',
      data: message
    }));
    
    return true;
  }
  
  sendTypingStatus(userId, roomId, isTyping) {
    const user = this.users.get(userId);
    const room = this.rooms.get(roomId);
    
    if (!user || !room) return false;
    
    // Check if user is in the room
    if (!room.users.has(userId)) return false;
    
    // Broadcast typing status to room
    this.broadcastToRoom(roomId, {
      type: 'typing',
      data: {
        userId,
        username: user.username,
        roomId,
        isTyping,
        timestamp: new Date().toISOString()
      }
    }, userId); // Exclude sender
    
    return true;
  }
  
  // Broadcasting
  broadcastToRoom(roomId, message, excludeUserId = null) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    
    for (const userId of room.users) {
      if (excludeUserId && userId === excludeUserId) continue;
      
      const user = this.users.get(userId);
      if (user && user.socket.readyState === 1) { // WebSocket.OPEN
        user.socket.send(JSON.stringify(message));
      }
    }
  }
  
  broadcastSystemMessage(message) {
    for (const [userId, user] of this.users.entries()) {
      if (user.socket.readyState === 1) { // WebSocket.OPEN
        user.socket.send(JSON.stringify(message));
      }
    }
  }
}`;

  const handleMessage = `// Handle incoming messages
function handleMessage(socket, message) {
  const { type, data } = message;
  
  switch (type) {
    case 'joinRoom':
      handleJoinRoom(socket, data);
      break;
    case 'leaveRoom':
      handleLeaveRoom(socket, data);
      break;
    case 'createRoom':
      handleCreateRoom(socket, data);
      break;
    case 'message':
      handleChatMessage(socket, data);
      break;
    case 'privateMessage':
      handlePrivateMessage(socket, data);
      break;
    case 'typing':
      handleTypingStatus(socket, data);
      break;
    case 'getRoomUsers':
      handleGetRoomUsers(socket, data);
      break;
    case 'getRoomMessages':
      handleGetRoomMessages(socket, data);
      break;
    default:
      socket.send(JSON.stringify({
        type: 'error',
        data: { message: 'Unknown message type' }
      }));
  }
}

function handleJoinRoom(socket, data) {
  const { roomId } = data;
  const userId = socket.userId;
  
  if (!roomId) {
    socket.send(JSON.stringify({
      type: 'error',
      data: { message: 'Room ID is required' }
    }));
    return;
  }
  
  // Check if room exists
  if (!chatService.getRoomById(roomId)) {
    socket.send(JSON.stringify({
      type: 'error',
      data: { message: 'Room not found' }
    }));
    return;
  }
  
  // Join room
  const success = chatService.joinRoom(userId, roomId);
  
  if (success) {
    // Send room details to user
    const roomUsers = chatService.getRoomUsers(roomId);
    const roomMessages = chatService.getRoomMessages(roomId);
    
    socket.send(JSON.stringify({
      type: 'roomJoined',
      data: {
        roomId,
        users: roomUsers,
        messages: roomMessages
      }
    }));
  } else {
    socket.send(JSON.stringify({
      type: 'error',
      data: { message: 'Failed to join room' }
    }));
  }
}

function handleChatMessage(socket, data) {
  const { roomId, content } = data;
  const userId = socket.userId;
  
  if (!roomId || !content) {
    socket.send(JSON.stringify({
      type: 'error',
      data: { message: 'Room ID and content are required' }
    }));
    return;
  }
  
  // Send message to room
  const success = chatService.sendMessage(userId, roomId, content);
  
  if (!success) {
    socket.send(JSON.stringify({
      type: 'error',
      data: { message: 'Failed to send message' }
    }));
  }
}`;

  const clientImplementation = `// chat-client.js
class ChatClient {
  constructor(url, token) {
    this.url = url;
    this.token = token;
    this.socket = null;
    this.connected = false;
    this.currentRoom = null;
    this.user = null;
    this.eventListeners = {};
  }
  
  connect() {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(\`\${this.url}?token=\${this.token}\`);
      
      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        this.connected = true;
      };
      
      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
          
          if (message.type === 'connected') {
            this.user = {
              userId: message.data.userId,
              username: message.data.username
            };
            resolve(this.user);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };
      
      this.socket.onclose = (event) => {
        console.log(\`WebSocket connection closed: \${event.code} \${event.reason}\`);
        this.connected = false;
        this.emit('disconnected', { code: event.code, reason: event.reason });
      };
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
  
  // Room methods
  joinRoom(roomId) {
    this.sendMessage({
      type: 'joinRoom',
      data: { roomId }
    });
  }
  
  leaveRoom(roomId) {
    this.sendMessage({
      type: 'leaveRoom',
      data: { roomId }
    });
  }
  
  createRoom(name, isPrivate = false) {
    this.sendMessage({
      type: 'createRoom',
      data: { name, isPrivate }
    });
  }
  
  // Message methods
  sendMessage(roomId, content) {
    this.sendMessage({
      type: 'message',
      data: { roomId, content }
    });
  }
  
  sendPrivateMessage(toUserId, content) {
    this.sendMessage({
      type: 'privateMessage',
      data: { toUserId, content }
    });
  }
  
  sendTypingStatus(roomId, isTyping) {
    this.sendMessage({
      type: 'typing',
      data: { roomId, isTyping }
    });
  }
  
  // Utility methods
  getRoomUsers(roomId) {
    this.sendMessage({
      type: 'getRoomUsers',
      data: { roomId }
    });
  }
  
  getRoomMessages(roomId, limit = 50) {
    this.sendMessage({
      type: 'getRoomMessages',
      data: { roomId, limit }
    });
  }
  
  // Internal methods
  sendMessage(message) {
    if (!this.connected) {
      throw new Error('Not connected');
    }
    
    this.socket.send(JSON.stringify(message));
  }
  
  handleMessage(message) {
    // Emit event for the message type
    this.emit(message.type, message.data);
    
    // Handle specific messages
    switch (message.type) {
      case 'roomJoined':
        this.currentRoom = message.data.roomId;
        break;
      case 'roomLeft':
        if (this.currentRoom === message.data.roomId) {
          this.currentRoom = null;
        }
        break;
    }
  }
  
  // Event handling
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }
  
  off(event, callback) {
    if (!this.eventListeners[event]) return;
    
    if (callback) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    } else {
      delete this.eventListeners[event];
    }
  }
  
  emit(event, data) {
    if (!this.eventListeners[event]) return;
    
    for (const callback of this.eventListeners[event]) {
      callback(data);
    }
  }
}

// Usage example
async function startChat() {
  const client = new ChatClient('ws://localhost:3000/chat', 'your-jwt-token');
  
  try {
    const user = await client.connect();
    console.log(\`Connected as \${user.username}\`);
    
    // Join the general room
    client.joinRoom('general');
    
    // Listen for messages
    client.on('message', (data) => {
      console.log(\`\${data.username}: \${data.content}\`);
    });
    
    // Listen for private messages
    client.on('privateMessage', (data) => {
      console.log(\`[Private] \${data.fromUsername}: \${data.content}\`);
    });
    
    // Listen for typing status
    client.on('typing', (data) => {
      console.log(\`\${data.username} is typing...\`);
    });
    
    // Listen for errors
    client.on('error', (data) => {
      console.error('Error:', data.message);
    });
    
    // Send a message to the general room
    client.sendMessage('general', 'Hello, everyone!');
    
    // Send a private message
    client.sendPrivateMessage('user123', 'Hello, this is a private message');
    
    // Send typing status
    client.sendTypingStatus('general', true);
    setTimeout(() => {
      client.sendTypingStatus('general', false);
    }, 3000);
  } catch (error) {
    console.error('Failed to connect:', error);
  }
}

startChat();`;

  return (
    <div className="space-y-8">
      <AnimatedSection animation="fadeIn">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{c.title}</h1>
          <p className="mt-2 text-lg text-gray-400">{c.subtitle}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slideInFromLeft" delay={0.1}>
        <p className="text-lg">{c.intro}</p>
      </AnimatedSection>

      <AnimatedSection animation="slideInFromRight" delay={0.2}>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-white mb-4">{c.features.title}</h3>
          <p className="text-gray-400 mb-4">{c.features.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {c.features.list.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.3}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{c.serverSetup.title}</h2>
          <p>{c.serverSetup.description}</p>

          <CodeBlock language="typescript">{serverSetup}</CodeBlock>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.4}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{c.messageHandling.title}</h2>
          <p>{c.messageHandling.description}</p>

          <Tabs defaultValue="service">
            <TabsList className="w-full">
              <TabsTrigger value="service" className="flex-1">
                Chat Service
              </TabsTrigger>
              <TabsTrigger value="handlers" className="flex-1">
                Message Handlers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="service">
              <CodeBlock language="typescript">{messageHandling}</CodeBlock>
            </TabsContent>
            <TabsContent value="handlers">
              <CodeBlock language="typescript">{handleMessage}</CodeBlock>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.5}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{c.clientImplementation.title}</h2>
          <p>{c.clientImplementation.description}</p>

          <CodeBlock language="javascript">{clientImplementation}</CodeBlock>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.6}>
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Complete Example</AlertTitle>
          <AlertDescription>
            This is a comprehensive example of a realtime chat application built with Azura's
            WebSocket support. You can find the complete source code for this example in our GitHub
            repository.
          </AlertDescription>
        </Alert>
      </AnimatedSection>
    </div>
  );
}
