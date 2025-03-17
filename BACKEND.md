```bash
/backend
│── /src
│   │── /config
│   │   ├── db.js                # Database connection
│   │   ├── auth.js              # JWT & authentication setup
│   │── /models
│   │   ├── User.js              # User schema
│   │   ├── Project.js           # Project schema
│   │   ├── Bid.js               # Bidding schema
│   │   ├── Event.js             # Event schema
│   │   ├── Gigbit.js            # Gigbits transaction schema
│   │── /routes
│   │   ├── authRoutes.js        # Authentication routes
│   │   ├── userRoutes.js        # User profile routes
│   │   ├── projectRoutes.js     # Project-related routes
│   │   ├── bidRoutes.js         # Bidding system routes
│   │   ├── eventRoutes.js       # Event management routes
│   │   ├── gigbitRoutes.js      # Gigbit transactions
│   │── /controllers
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User profile logic
│   │   ├── projectController.js # Project CRUD logic
│   │   ├── bidController.js     # Bidding logic
│   │   ├── eventController.js   # Event handling logic
│   │   ├── gigbitController.js  # Gigbits handling logic
│   │── /middlewares
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── roleMiddleware.js    # Role-based access
│   │── /utils
│   │   ├── helpers.js           # Helper functions
│── .env                         # Environment variables
│── server.js                     # Main server file
│── package.json                  # Dependencies
│── README.md                     # Project documentation
```