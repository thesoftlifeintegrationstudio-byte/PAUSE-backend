const express = require('express');
const cors = require('cors');

const app = express();

// ==================== CORS CONFIGURATION ====================
// ALLOW YOUR HOSTINGER FRONTEND
const allowedOrigins = [
  'https://ivory-wombat-811991.hostingersite.com',  // Your Hostinger site
  'http://localhost:3000',      // Local development
  'http://localhost:5173',      // Vite/React dev server
  'http://localhost:8080',      // Alternative port
  'file://'                     // Allow local file access
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like from mobile apps or local files)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// ==================== RESPONSE TEMPLATES ====================
// Simple responses matching the blueprint format
const RESPONSES = {
  anxious: {
    whats_happening: "Your nervous system is scanning the environment. It's preparing energy for what might come next.",
    why_learned: "This readiness once helped notice subtle changes in weather or movement. It was a way to stay steady.",
    belief_check: "That uncertainty means something is wrong.",
    boundary_rule: "You might try letting the feeling exist without needing to solve it, just for now.",
    notice_avoid: "Notice where the energy gathers in your body. Avoid trying to think your way out.",
    simple_science: "The brain activates preparation pathways. This is temporary alertness."
  },
  overwhelmed: {
    whats_happening: "Your attention is pulled in many directions at once. Each feels important.",
    why_learned: "This helped track multiple elements of shelter, food, and safety simultaneously.",
    belief_check: "That everything requires equal attention right now.",
    boundary_rule: "You might try choosing one thing to complete before considering another, today.",
    notice_avoid: "Notice when thoughts scatter. Avoid adding more tasks to the list.",
    simple_science: "Working memory has natural limits. Exceeding them creates this sensation."
  },
  sad: {
    whats_happening: "Your emotional system is slowing down. It's making space for something meaningful.",
    why_learned: "This slowing conserved energy during difficult times. It allowed for processing.",
    belief_check: "That feeling this way means something is missing.",
    boundary_rule: "You might try allowing the feeling without needing to change it, just for now.",
    notice_avoid: "Notice the physical sensations. Avoid rushing to make them different.",
    simple_science: "The brain integrates experience through this state."
  },
  angry: {
    whats_happening: "Your system detects a boundary. Energy rises to meet what's happening.",
    why_learned: "This energy once helped protect resources or maintain personal space.",
    belief_check: "That this feeling must lead to action.",
    boundary_rule: "You might try noticing the energy without immediate response, just for now.",
    notice_avoid: "Notice where you feel it physically. Avoid directing it inward.",
    simple_science: "The body prepares for assertive response."
  },
  tired: {
    whats_happening: "Your body signals a need for restoration. It's asking for space, not just sleep.",
    why_learned: "Rest periods allowed for repair between necessary activities.",
    belief_check: "That rest must be earned through doing.",
    boundary_rule: "You might try allowing a brief pause before continuing, today.",
    notice_avoid: "Notice early signals of fatigue. Avoid pushing through them repeatedly.",
    simple_science: "The nervous system accumulates signals for restoration."
  },
  lonely: {
    whats_happening: "Your system notices the absence of connection. It's registering space around you.",
    why_learned: "This awareness helped maintain social bonds that were essential for survival.",
    belief_check: "That being alone means being disconnected.",
    boundary_rule: "You might try letting the feeling exist as information, just for now.",
    notice_avoid: "Notice the quality of the space around you. Avoid filling it immediately.",
    simple_science: "Humans are wired for connection. Noticing its absence is natural."
  },
  default: {
    whats_happening: "Your emotional system is responding to your experience. It's doing what emotional systems do.",
    why_learned: "All feelings once served functions related to safety, connection, or understanding.",
    belief_check: "That this feeling requires immediate explanation.",
    boundary_rule: "You might try observing without needing to change anything, just for now.",
    notice_avoid: "Notice where you feel it in your body. Avoid judging it as right or wrong.",
    simple_science: "Emotions are the body's intelligent response systems."
  }
};

// ==================== HELPER FUNCTIONS ====================
function getResponseForFeeling(feeling) {
  const lowerFeeling = feeling.toLowerCase().trim();
  
  if (lowerFeeling.includes('anxious') || lowerFeeling.includes('worried') || lowerFeeling.includes('nervous')) {
    return RESPONSES.anxious;
  } else if (lowerFeeling.includes('overwhelm') || lowerFeeling.includes('too much') || lowerFeeling.includes('busy')) {
    return RESPONSES.overwhelmed;
  } else if (lowerFeeling.includes('sad') || lowerFeeling.includes('heavy') || lowerFeeling.includes('down')) {
    return RESPONSES.sad;
  } else if (lowerFeeling.includes('angry') || lowerFeeling.includes('mad') || lowerFeeling.includes('frustrat')) {
    return RESPONSES.angry;
  } else if (lowerFeeling.includes('tired') || lowerFeeling.includes('exhaust') || lowerFeeling.includes('fatigue')) {
    return RESPONSES.tired;
  } else if (lowerFeeling.includes('lonely') || lowerFeeling.includes('alone') || lowerFeeling.includes('isolat')) {
    return RESPONSES.lonely;
  } else if (lowerFeeling.includes('numb') || lowerFeeling.includes('empty') || lowerFeeling.includes('flat')) {
    return RESPONSES.numb;
  } else {
    return RESPONSES.default;
  }
}

// ==================== ROUTES ====================
app.post('/api/analyze', async (req, res) => {
  try {
    console.log('Received request from origin:', req.headers.origin);
    console.log('Request body:', req.body);
    
    const { feeling } = req.body;
    
    if (!feeling || typeof feeling !== 'string' || feeling.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid input. "feeling" must be a non-empty string.' 
      });
    }
    
    // Get appropriate response (NO length parameter - blueprint says one response only)
    const result = getResponseForFeeling(feeling.trim());
    
    console.log('Sending response');
    res.json({
      success: true,
      whats_happening: result.whats_happening,
      why_learned: result.why_learned,
      belief_check: result.belief_check,
      boundary_rule: result.boundary_rule,
      notice_avoid: result.notice_avoid,
      simple_science: result.simple_science
    });
    
  } catch (error) {
    console.error('Route error:', error.message);
    // Return default response on error
    res.json({
      success: true,
      ...RESPONSES.default
    });
  }
});

// Simple health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'PAUSE',
    timestamp: new Date().toISOString(),
    endpoints: ['POST /api/analyze', 'GET /health']
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'PAUSE Backend is running',
    description: 'Emotional intelligence companion - Backend API',
    endpoints: {
      analyze: 'POST /api/analyze (body: {feeling: "your feeling"})',
      health: 'GET /health'
    }
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ============================================
  🧘 PAUSE BACKEND STARTED
  ============================================
  🌐 Port: ${PORT}
  🔗 Health: http://localhost:${PORT}/health
  📍 Endpoint: POST http://localhost:${PORT}/api/analyze
  📍 Frontend: https://ivory-wombat-811991.hostingersite.com
  ============================================`);
});
