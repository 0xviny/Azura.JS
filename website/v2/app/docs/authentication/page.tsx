"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function AuthenticationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Authentication in Azura</h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Authentication</h2>
        <p>
          Azura supports basic authentication using JWT tokens. Here's an example of how to set it
          up:
        </p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, Controller, Get, Auth } from '@azura/framework';
import jwt from 'jsonwebtoken';

// Example controller
@Controller('/auth')
class AuthController {
  @Get('/login')
  login(req, res) {
    // Generate a token
    const token = jwt.sign({ userId: 123, role: 'user' }, 'your-secret-key');
    
    // Send the token back
    return { token };
  }
}

@Controller('/api')
class ApiController {
  @Get('/profile')
  @Auth()
  getProfile(req, res) {
    // Access user data from the request
    const user = req.user;
    return { user };
  }
  
  @Get('/admin')
  @Auth('admin')
  getAdminPanel() {
    return {
      message: 'Welcome to the admin panel',
      secretData: 'Only admins can see this'
    };
  }
}

// Create and configure the server
const app = new AzuraServer();

// Register controllers
app.load([AuthController, ApiController]);

// Authentication middleware
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const payload = jwt.verify(token, 'your-secret-key');
    req.user = payload;
  } catch (error) {
    // Invalid token, but we don't throw an error here
    // The @Auth decorator will handle that
  }
  
  next();
});

app.listen(3000);`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Role-Based Access Control</h2>
        <p>
          Azura supports role-based access control (RBAC) through the <code>@Roles</code> decorator:
        </p>

        <CodeBlock language="typescript">
          {`import { Controller, Get, Roles } from '@azura/framework';

@Controller('/dashboard')
@Roles('admin', 'manager') // Only users with admin or manager role can access
class DashboardController {
  @Get('/')
  getDashboard() {
    return { dashboard: 'Dashboard data' };
  }
  
  @Get('/users')
  getUsers() {
    return { users: ['User 1', 'User 2'] };
  }
  
  @Get('/reports')
  getReports() {
    return { reports: ['Report 1', 'Report 2'] };
  }
}`}
        </CodeBlock>

        <p>
          The <code>@Roles</code> decorator applies to the entire controller, while the{" "}
          <code>@Auth</code> decorator can override the roles for specific methods.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Authentication Logic</h2>
        <p>You can implement custom authentication logic by creating your own middleware:</p>

        <CodeBlock language="typescript">
          {`import { AzuraServer, HttpError } from '@azura/framework';

// Custom authentication middleware
function customAuthMiddleware(req, res, next) {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new HttpError(401, { message: 'No token provided' });
  }
  
  // Custom token validation logic
  try {
    // Example: decode a custom token format
    const [userId, role, timestamp] = token.split('.');
    
    // Check if token is expired (example: 1 hour)
    const expirationTime = parseInt(timestamp) + 3600000;
    if (Date.now() > expirationTime) {
      throw new HttpError(401, { message: 'Token expired' });
    }
    
    // Attach user to request
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new HttpError(401, { message: 'Invalid token' });
  }
}

const app = new AzuraServer();

// Apply custom middleware
app.get('/protected', customAuthMiddleware, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});`}
        </CodeBlock>
      </div>

      <div className="mt-8">
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Security Best Practices</AlertTitle>
          <AlertDescription>
            <ul className="ml-4 list-disc">
              <li>Use HTTPS in production to encrypt tokens in transit</li>
              <li>Set appropriate token expiration times</li>
              <li>Store API keys securely and rotate them regularly</li>
              <li>Use strong, unique passwords for user accounts</li>
              <li>Implement rate limiting to prevent brute force attacks</li>
              <li>Consider using environment variables for sensitive configuration</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
