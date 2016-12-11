# generator-socketio-d3-express-requirejs
quick setup with yeoman using socketio, d3, express, and requirejs

# Usage
```
yo socketio-d3-express-requirejs
npm start
```

Once installation is complete, try opening two browser tabs to localhost:(port) to see to confirm that all dependancies are working.
If all is well, you should see one svg:circle per open browser tab.

# Project Structure
```
├── app.js                  - Express app and server code
├── package.json            - Project dependencies
|── public/                 - Files available through express static
|   |── index.html          
|   |── scripts/
|   |   |── config.js       - Requirejs configuration
|   |   |── main.js         - Entry point
```
