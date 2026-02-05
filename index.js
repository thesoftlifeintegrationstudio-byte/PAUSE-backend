const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// ==================== CORS CONFIGURATION ====================
// ALLOW YOUR HOSTINGER FRONTEND
const allowedOrigins = [
  'https://ivory-wombat-811991.hostingersite.com',  // Your Hostinger site
  'http://localhost:3000',      // Local development
  'http://localhost:5173',      // Vite/React dev server
  'http://localhost:8080'       // Alternative port
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// ==================== AI CONFIGURATION ====================
// Length-specific prompts to generate JSON responses matching frontend expectations
const SYSTEM_PROMPTS = {
  quick: `You are PAUSE. You are an emotional regulation companion. You are not therapy. You do not diagnose. Your role is to reduce pressure and increase understanding. Nothing is wrong. Something makes sense.

Respond with a valid JSON object with exactly these keys: whats_happening, why_learned, belief, pattern, practice, science. Each value must be a string (1-2 sentences max). No extra text outside the JSON.

Example: {"whats_happening": "Something is moving through your system. That is natural.", "why_learned": "Your system is using old, intelligent patterns to meet a moment.", "belief": "Is it possible that this is simply happening, not because something is wrong?", "pattern": "Notice the space around the feeling. Avoid the pull to name it or change it.", "practice": "You might try letting the moment be just as it is, just for now.", "science": "Systems learn to protect. They repeat what once helped."}`,

  keypoints: `You are PAUSE. You are an emotional regulation companion. You are not therapy. You do not diagnose. Your role is to reduce pressure and increase understanding. Nothing is wrong. Something makes sense.

Respond with a valid JSON object with exactly these keys: pattern, meaning, practice, awareness. Each value must be a string (1-2 sentences max). No extra text outside the JSON.

Example: {"pattern": "Cognitive saturation—too many meaningful inputs competing for attention.", "meaning": "Often signals: 'These all matter' or 'I need clearer boundaries.'", "practice": "Choose one small action. Complete it fully before considering another.", "awareness": "Notice when you're trying to process multiple complex thoughts simultaneously."}`,

  detailed: `You are PAUSE. You are an emotional regulation companion. You are not therapy. You do not diagnose. Your role is to reduce pressure and increase understanding. Nothing is wrong. Something makes sense.

Respond with a valid JSON object with exactly these keys: pattern, origin, meaning, practice, science. Each value must be a string (1-2 sentences max). No extra text outside the JSON.

Example: {"pattern": "Overwhelm occurs when cognitive demands exceed processing bandwidth—an intelligent system saying 'simplify and focus' rather than 'you're failing.'", "origin": "Our ancestors balanced immediate survival needs with longer-term planning. Your brain uses similar architecture for emails, relationships, and aspirations.", "meaning": "This might indicate: 'My values are distributed too thinly' or 'Clarity would help more than capacity.'", "practice": "Try the 'one page' method: Write everything on your mind. Circle three priorities. Let the rest exist on paper instead of in mental space.", "science": "Working memory limitations trigger stress responses. This temporary state often shifts with single-tasking and intentional space creation."}`
};

// Fallback responses (structured JSON versions of your LOCAL_RESPONSES)
const FALLBACK_RESPONSES = {
  quick: {
    whats_happening: "Your nervous system is scanning the horizon—not for danger, but for what matters. This energy rises to meet what's coming, even when the path isn't clear.",
    why_learned: "Ancestors needed to anticipate storms and predators. Your body remembers this wisdom, applying it to deadlines, conversations, and unknowns.",
    belief: "What if this anxiety isn't about preventing disaster, but about caring deeply?",
    pattern: "Energy gathers in your chest and throat—a preparation system activating. Thoughts move like weather patterns, shifting and reforming.",
    practice: "Place one hand on your sternum. Breathe naturally. Notice the rise and fall for three breaths.",
    science: "Your amygdala activates ancient pathways designed for protection. Cortisol rises briefly—a temporary visitor, not a permanent resident."
  },
  keypoints: {
    pattern: "Anticipatory energy—your system preparing for what might matter.",
    meaning: "Often signals: 'This is important' or 'I care about this outcome.'",
    practice: "Name it gently: 'Preparation energy is here.' Return to one complete breath.",
    awareness: "Notice when future possibilities feel more real than your feet on the ground."
  },
  detailed: {
    pattern: "Anxiety is future-oriented energy seeking certainty in an uncertain world. It's your ancient threat detection system applying millennia of survival wisdom to modern complexity.",
    origin: "For 200,000 years, humans survived by anticipating danger. Your nervous system carries this legacy, now interpreting emails and conversations through ancient survival filters.",
    meaning: "This feeling might be saying: 'My care is activated' or 'Something here holds meaning worth protecting.'",
    practice: "When anxiety visits, try the RAIN method: Recognize it's here, Allow it space, Investigate where it lives in your body, Nurture with a hand on your heart.",
    science: "Involves coordinated activation of amygdala (fear center), hippocampus (memory), and prefrontal cortex (planning). This temporary alignment served survival—now serves your humanity."
  }
};

function validateJsonResponse(jsonObj, length) {
  if (!jsonObj || typeof jsonObj !== 'object') return false;
  
  const requiredKeys = {
    quick: ['whats_happening', 'why_learned', 'belief', 'pattern', 'practice', 'science'],
    keypoints: ['pattern', 'meaning', 'practice', 'awareness'],
    detailed: ['pattern', 'origin', 'meaning', 'practice', 'science']
  };
  
  const keys = requiredKeys[length];
  for (const key of keys) {
    if (!jsonObj[key] || typeof jsonObj[key] !== 'string' || jsonObj[key].length > 500) return false;
  }
  
  return true;
}

async function callAIService(userFeeling, length, attempt = 1) {
  try {
    if (!process.env.AI_API_KEY) {
      console.error('API key not configured');
      return FALLBACK_RESPONSES[length];
    }
    
    const prompt = SYSTEM_PROMPTS[length];
    if (!prompt) return FALLBACK_RESPONSES[length];
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: userFeeling }
        ],
        temperature: 0.3,
        max_tokens: 350
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );
    
    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('Invalid AI response structure');
      return FALLBACK_RESPONSES[length];
    }
    
    const aiText = response.data.choices[0].message.content.trim();
    
    // Try to parse as JSON
    let parsed;
    try {
      parsed = JSON.parse(aiText);
    } catch (e) {
      console.error('AI response is not valid JSON:', aiText);
      return FALLBACK_RESPONSES[length];
    }
    
    const isValid = validateJsonResponse(parsed, length);
    if (!isValid && attempt < 2) {
      console.log('Response invalid, regenerating...');
      return await callAIService(userFeeling, length, attempt + 1);
    }
    
    return isValid ? parsed : FALLBACK_RESPONSES[length];
  } catch (error) {
    console.error('AI call failed:', error.message);
    return FALLBACK_RESPONSES[length];
  }
}

// ==================== ROUTES ====================
app.post('/api/analyze-feeling', async (req, res) => {
  try {
    console.log('Received analyze-feeling request from origin:', req.headers.origin);
    console.log('Request body:', req.body);
    
    const { feeling, length = 'quick' } = req.body;
    
    if (!feeling || typeof feeling !== 'string' || feeling.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid input. "feeling" must be a non-empty string.' 
      });
    }
    
    if (!['quick', 'keypoints', 'detailed'].includes(length)) {
      return res.status(400).json({ 
        error: 'Invalid "length". Must be "quick", "keypoints", or "detailed".' 
      });
    }
    
    const result = await callAIService(feeling.trim(), length);
    console.log('Sending response');
    res.json({ success: true, data: result, source: 'ai' });
  } catch (error) {
    console.error('Route error:', error.message);
    res.status(500).json({ success: false, data: FALLBACK_RESPONSES.quick, source: 'fallback' });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'PAUSE',
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins,
    endpoints: ['GET /health', 'POST /api/analyze-feeling', 'GET /']
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'PAUSE API is running',
    endpoints: {
      health: 'GET /health',
      analyzeFeeling: 'POST /api/analyze-feeling',
      cors: {
        allowedOrigins: allowedOrigins,
        methods: ['GET', 'POST', 'OPTIONS'],
        headers: ['Content-Type', 'Authorization']
      }
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
  📍 Allowed Frontends:`);
  allowedOrigins.forEach(origin => console.log(`       ${origin}`));
  console.log(`  ============================================`);
});
