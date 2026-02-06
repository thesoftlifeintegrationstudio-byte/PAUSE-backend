require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import models
const EmotionMatcher = require('./models/EmotionMatcher');
const ResponseGenerator = require('./models/ResponseGenerator');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize models
const emotionMatcher = new EmotionMatcher();
const responseGenerator = new ResponseGenerator();

// YOUR EXACT FRONTEND DOMAIN - HARDCODED
const FRONTEND_DOMAIN = 'https://ivory-wombat-811991.hostingersite.com/';

// Middleware - CONFIGURED FOR YOUR FRONTEND
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            connectSrc: ["'self'", FRONTEND_DOMAIN]
        }
    }
}));

// CORS - ONLY ALLOW YOUR FRONTEND
app.use(cors({
    origin: FRONTEND_DOMAIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Request-ID']
}));

app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests",
        suggestion: "Please wait a moment before trying again",
        closure: "You can continue your day."
    },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/', limiter);

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'unknown'}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Emotional Intelligence Companion API',
        version: '1.0.0',
        frontend: FRONTEND_DOMAIN,
        timestamp: new Date().toISOString(),
        endpoints: {
            process: 'POST /api/process'
        },
        rules: responseGenerator.rules
    });
});

// Main processing endpoint - MATCHES FRONTEND EXPECTATIONS
app.post('/api/process', (req, res) => {
    try {
        const { text } = req.body;

        // Input validation - MATCHES FRONTEND VALIDATION
        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                title: "Understanding Your Experience",
                sections: [
                    {
                        type: "understanding",
                        title: "Thank You For Sharing",
                        content: "Please share what you're feeling or thinking"
                    }
                ],
                closure: "You can continue your day.",
                timestamp: new Date().toISOString()
            });
        }

        const trimmedText = text.trim();

        if (trimmedText.length < 3) {
            return res.status(400).json({
                title: "Understanding Your Experience",
                sections: [
                    {
                        type: "understanding",
                        title: "Thank You For Sharing",
                        content: "Please share a bit more about what you're experiencing"
                    }
                ],
                closure: "You can continue your day.",
                timestamp: new Date().toISOString()
            });
        }

        if (trimmedText.length > 1000) {
            return res.status(400).json({
                title: "Understanding Your Experience",
                sections: [
                    {
                        type: "understanding",
                        title: "Thank You For Sharing",
                        content: "Please share a more focused experience"
                    }
                ],
                closure: "You can continue your day.",
                timestamp: new Date().toISOString()
            });
        }

        // Process emotion - USING SAME LOGIC AS FRONTEND
        const matchResult = emotionMatcher.matchEmotion(trimmedText);
        const emotionData = emotionMatcher.getEmotionData(matchResult.emotion);

        // Generate response - EXACT SAME STRUCTURE AS FRONTEND EXPECTS
        const response = {
            title: emotionData.title,
            sections: [
                {
                    type: "understanding",
                    title: "Understanding This Feeling",
                    content: emotionData.understanding
                },
                {
                    type: "body",
                    title: "What Your Experience Might Feel Like",
                    content: emotionData.body
                },
                {
                    type: "purpose",
                    title: "Why Humans Experience This",
                    content: emotionData.purpose
                },
                {
                    type: "shared",
                    title: "How Others Experience This Too",
                    content: emotionData.shared
                }
            ],
            closure: emotionData.closure,
            timestamp: new Date().toISOString(),
            processing: {
                textLength: trimmedText.length,
                matchedEmotion: matchResult.emotion,
                matchScore: matchResult.score
            }
        };

        // Log for debugging
        console.log(`Processed: "${trimmedText.substring(0, 50)}..." -> ${matchResult.emotion} (score: ${matchResult.score}) from ${req.headers.origin || 'unknown origin'}`);

        res.json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        
        // Error response that frontend can handle
        res.status(500).json({
            title: "Understanding Your Experience",
            sections: [
                {
                    type: "understanding",
                    title: "Thank You For Sharing",
                    content: "I understand you're sharing something significant. Please try rephrasing your experience."
                },
                {
                    type: "shared",
                    title: "You're Not Alone",
                    content: "Many people have moments that are hard to put into words. That's part of being human."
                }
            ],
            closure: "You can continue your day.",
            timestamp: new Date().toISOString()
        });
    }
});

// Preflight requests
app.options('*', cors());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Emotional Intelligence Companion API',
        status: 'running',
        version: '1.0.0',
        frontend: FRONTEND_DOMAIN,
        configuredFor: 'https://ivory-wombat-811991.hostingersite.com/',
        endpoints: {
            health: 'GET /api/health',
            process: 'POST /api/process'
        },
        note: 'This API is configured specifically for: https://ivory-wombat-811991.hostingersite.com/'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        title: "Understanding Your Experience",
        sections: [
            {
                type: "understanding",
                title: "Endpoint Not Found",
                content: "The requested endpoint does not exist."
            }
        ],
        closure: "You can continue your day.",
        timestamp: new Date().toISOString()
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    
    res.status(500).json({
        title: "Understanding Your Experience",
        sections: [
            {
                type: "understanding",
                title: "Something Went Wrong",
                content: "Please try again later."
            }
        ],
        closure: "You can continue your day.",
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Emotional Intelligence Companion API running on port ${PORT}`);
    console.log(`📡 Configured for frontend: ${FRONTEND_DOMAIN}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 Process endpoint: POST http://localhost:${PORT}/api/process`);
    console.log(`🌐 CORS enabled for: ${FRONTEND_DOMAIN}`);
    console.log(`🔒 Frontend domain hardcoded: https://ivory-wombat-811991.hostingersite.com/`);
});

module.exports = app;
