require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Import models
const EmotionMatcher = require('./models/EmotionMatcher');
const ResponseGenerator = require('./models/ResponseGenerator');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize models
const emotionMatcher = new EmotionMatcher();
const responseGenerator = new ResponseGenerator();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));

// CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        error: "Too many requests from this IP",
        suggestion: "Please wait a moment before trying again",
        closure: "You can continue your day."
    },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', limiter);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Emotional Intelligence Companion',
        version: '1.0.0',
        rules: responseGenerator.rules,
        timestamp: new Date().toISOString()
    });
});

// Main processing endpoint
app.post('/api/process', (req, res) => {
    try {
        const { text } = req.body;

        // Input validation
        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                error: "Please provide text to process",
                suggestion: "Share what you're feeling or thinking",
                closure: "You can continue your day."
            });
        }

        const trimmedText = text.trim();

        if (trimmedText.length < 3) {
            return res.status(400).json({
                error: "Please share a bit more about what you're experiencing",
                suggestion: "Try to describe your feelings or thoughts in a few words",
                closure: "You can continue your day."
            });
        }

        if (trimmedText.length > 1000) {
            return res.status(400).json({
                error: "Please share a more focused experience",
                suggestion: "Try to describe one main feeling or thought at a time",
                closure: "You can continue your day."
            });
        }

        // Process emotion
        const matchResult = emotionMatcher.matchEmotion(trimmedText);
        const emotionData = emotionMatcher.getEmotionData(matchResult.emotion);

        // Generate response
        const response = responseGenerator.generateResponse(emotionData, matchResult.emotion);

        // Add processing metadata
        response.processing = {
            textLength: trimmedText.length,
            matchedScore: matchResult.score,
            timestamp: new Date().toISOString()
        };

        // Send successful response
        res.json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        
        // Generate error response
        const errorResponse = responseGenerator.generateErrorResponse();
        errorResponse.error = "I understand you're sharing something significant";
        errorResponse.suggestion = "Please try rephrasing your experience";
        errorResponse.processing = {
            error: error.message,
            timestamp: new Date().toISOString()
        };

        res.status(500).json(errorResponse);
    }
});

// Serve frontend if in production
if (process.env.NODE_ENV === 'production') {
    // If frontend is built (e.g., React/Vue build folder)
    // app.use(express.static(path.join(__dirname, '../frontend/build')));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    // });
    
    // For now, just serve a simple message
    app.get('/', (req, res) => {
        res.json({
            message: "Emotional Intelligence Companion API",
            status: "running",
            endpoints: {
                health: "/api/health",
                process: "/api/process (POST)",
                documentation: "See README for API documentation"
            }
        });
    });
} else {
    // Development mode message
    app.get('/', (req, res) => {
        res.json({
            message: "Emotional Intelligence Companion API (Development Mode)",
            status: "running",
            port: PORT,
            endpoints: {
                health: "GET /api/health",
                process: "POST /api/process",
                requestFormat: {
                    text: "Your feelings or thoughts (string, 3-1000 chars)"
                }
            }
        });
    });
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        suggestion: "Check the API documentation for available endpoints",
        closure: "You can continue your day."
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    
    res.status(500).json({
        error: "Something went wrong",
        suggestion: "Please try again later",
        closure: "You can continue your day.",
        timestamp: new Date().toISOString()
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Emotional Intelligence Companion API running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`⚡ NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

module.exports = app;
