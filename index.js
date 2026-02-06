const express = require('express');
const cors = require('cors');

const app = express();

// ==================== CORS CONFIGURATION ====================
// Your exact frontend domain
const allowedOrigins = [
  'https://ivory-wombat-811991.hostingersite.com',
  'https://www.ivory-wombat-811991.hostingersite.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'file://',
  'null'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list OR if it's your Hostinger domain pattern
    if (allowedOrigins.includes(origin) || 
        origin.endsWith('.hostingersite.com')) {
      return callback(null, true);
    }
    
    console.log('CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin']
}));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(express.json());

// ==================== RESPONSE DATABASE (SNAKE_CASE) ====================
// Ready for system functions expansion
const RESPONSES = {
  anxious: {
    whats_happening: "Your nervous system is scanning the environment. It's preparing energy for what might come next.",
    why_learned: "This readiness once helped notice subtle changes in weather or movement. It was a way to stay steady.",
    belief_check: "That uncertainty means something is wrong.",
    boundary_rule: "You might try letting the feeling exist without needing to solve it, just for now.",
    notice_avoid: "Notice where the energy gathers in your body. Avoid trying to think your way out.",
    simple_science: "The brain activates preparation pathways. This is temporary alertness."
  },
  sad: {
    whats_happening: "Your emotional system is slowing down. It's making space for something meaningful.",
    why_learned: "This slowing conserved energy during difficult times. It allowed for processing.",
    belief_check: "That feeling this way means something is missing.",
    boundary_rule: "You might try allowing the feeling without needing to change it, just for now.",
    notice_avoid: "Notice the physical sensations. Avoid rushing to make them different.",
    simple_science: "The brain integrates experience through this state. It's part of being human."
  },
  overwhelmed: {
    whats_happening: "Your attention is pulled in many directions at once. Each feels important.",
    why_learned: "This helped track multiple elements of shelter, food, and safety simultaneously.",
    belief_check: "That everything requires equal attention right now.",
    boundary_rule: "You might try choosing one thing to complete before considering another, today.",
    notice_avoid: "Notice when thoughts scatter. Avoid adding more tasks to the list.",
    simple_science: "Working memory has natural limits. Exceeding them creates this sensation."
  },
  angry: {
    whats_happening: "Your system detects a boundary. Energy rises to meet what's happening.",
    why_learned: "This energy once helped protect resources or maintain personal space.",
    belief_check: "That this feeling must lead to action.",
    boundary_rule: "You might try noticing the energy without immediate response, just for now.",
    notice_avoid: "Notice where you feel it physically. Avoid directing it inward.",
    simple_science: "The body prepares for assertive response. This is natural boundary sensing."
  },
  tired: {
    whats_happening: "Your body signals a need for restoration. It's asking for space, not just sleep.",
    why_learned: "Rest periods allowed for repair between necessary activities.",
    belief_check: "That rest must be earned through doing.",
    boundary_rule: "You might try allowing a brief pause before continuing, today.",
    notice_avoid: "Notice early signals of fatigue. Avoid pushing through them repeatedly.",
    simple_science: "The nervous system accumulates signals for restoration over time."
  },
  lonely: {
    whats_happening: "Your system notices the absence of connection. It's registering space around you.",
    why_learned: "This awareness helped maintain social bonds that were essential for survival.",
    belief_check: "That being alone means being disconnected.",
    boundary_rule: "You might try letting the feeling exist as information, just for now.",
    notice_avoid: "Notice the quality of the space around you. Avoid filling it immediately.",
    simple_science: "Humans are wired for connection. Noticing its absence is natural intelligence."
  },
  numb: {
    whats_happening: "Your emotional system has quieted. Sensations feel distant or muted.",
    why_learned: "This distance once provided protection during prolonged difficulty.",
    belief_check: "That feeling nothing means something is wrong.",
    boundary_rule: "You might try allowing the quiet without needing to change it, today.",
    notice_avoid: "Notice what you can feel, however small. Avoid forcing sensation.",
    simple_science: "The nervous system sometimes reduces input. This is a protective function."
  },
  default: {
    whats_happening: "Your emotional system is responding to your experience. It's doing what emotional systems do.",
    why_learned: "All feelings once served functions related to safety, connection, or understanding.",
    belief_check: "That this feeling requires immediate explanation.",
    boundary_rule: "You might try observing without needing to change anything, just for now.",
    notice_avoid: "Notice where you feel it in your body. Avoid judging it as right or wrong.",
    simple_science: "Emotions are the body's intelligent response systems. They come and go."
  }
};

// ==================== HELPER FUNCTION ====================
function getResponseForFeeling(feeling) {
  const lowerFeeling = feeling.toLowerCase().trim();
  
  // Simple emotion detection (ready for system functions expansion)
  if (lowerFeeling.includes('anxious') || lowerFeeling.includes('worried') || lowerFeeling.includes('nervous')) {
    return RESPONSES.anxious;
  } else if (lowerFeeling.includes('sad') || lowerFeeling.includes('heavy') || lowerFeeling.includes('down') || lowerFeeling.includes('grief')) {
    return RESPONSES.sad;
  } else if (lowerFeeling.includes('overwhelm') || lowerFeeling.includes('too much') || lowerFeeling.includes('busy') || lowerFeeling.includes('scattered')) {
    return RESPONSES.overwhelmed;
  } else if (lowerFeeling.includes('angry') || lowerFeeling.includes('mad') || lowerFeeling.includes('frustrat') || lowerFeeling.includes('irritat')) {
    return RESPONSES.angry;
  } else if (lowerFeeling.includes('tired') || lowerFeeling.includes('exhaust') || lowerFeeling.includes('fatigue') || lowerFeeling.includes('drain')) {
    return RESPONSES.tired;
  } else if (lowerFeeling.includes('lonely') || lowerFeeling.includes('alone') || lowerFeeling.includes('isolat') || lowerFeeling.includes('disconnect')) {
    return RESPONSES.lonely;
  } else if (lowerFeeling.includes('numb') || lowerFeeling.includes('empty') || lowerFeeling.includes('flat') || lowerFeeling.includes('detach')) {
    return RESPONSES.numb;
  } else if (lowerFeeling.includes('happy') || lowerFeeling.includes('joy') || lowerFeeling.includes('content') || lowerFeeling.includes('peace')) {
    return RESPONSES.default; // Use default for positive emotions
  } else {
    return RESPONSES.default;
  }
}

// ==================== ROUTES ====================
app.post('/api/analyze', async (req, res) => {
  try {
    console.log('📥 Request from origin:', req.headers.origin);
    console.log('📝 User input:', req.body.feeling);
    
    const { feeling } = req.body;
    
    // Validation
    if (!feeling || typeof feeling !== 'string' || feeling.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid input. "feeling" must be a non-empty string.' 
      });
    }
    
    // Get response
    const result = getResponseForFeeling(feeling.trim());
    
    // Set CORS headers explicitly
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    console.log('📤 Sending response to:', req.headers.origin);
    
    // Return in SNAKE_CASE (matching frontend expectation)
    res.json({
      success: true,
      whats_happening: result.whats_happening,
      why_learned: result.why_learned,
      belief_check: result.belief_check,
      boundary_rule: result.boundary_rule,
      notice_avoid: result.notice_avoid,
      simple_science: result.simple_science,
      source: 'backend_v2'
    });
    
  } catch (error) {
    console.error('❌ Route error:', error.message);
    
    // Still set CORS headers on error
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Return default response on error
    res.json({
      success: true,
      ...RESPONSES.default,
      source: 'backend_fallback'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  res.json({ 
    status: 'healthy',
    service: 'PAUSE Backend',
    version: '2.0',
    timestamp: new Date().toISOString(),
    endpoints: ['POST /api/analyze', 'GET /health'],
    cors: {
      allowedOrigins: allowedOrigins.filter(o => !o.includes('file://') && o !== 'null'),
      yourOrigin: req.headers.origin
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  res.json({ 
    message: 'PAUSE Backend API',
    description: 'Emotional intelligence companion - Backend service',
    frontend: 'https://ivory-wombat-811991.hostingersite.com',
    endpoints: {
      analyze: 'POST /api/analyze (body: {feeling: "your feeling"})',
      health: 'GET /health',
      cors: 'Your frontend is whitelisted'
    }
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ============================================
  🧘 PAUSE BACKEND v2.0 STARTED
  ============================================
  🌐 Port: ${PORT}
  🔗 Health: https://pause-backend-2.onrender.com/health
  📍 Frontend: https://ivory-wombat-811991.hostingersite.com
  📍 Endpoint: POST https://pause-backend-2.onrender.com/api/analyze
  ============================================`);
  
  // Log CORS configuration
  console.log('\n  ✅ CORS Allowed Origins:');
  allowedOrigins
    .filter(o => !o.includes('file://') && o !== 'null')
    .forEach(origin => console.log(`     ${origin}`));
  console.log('  ============================================');
});
