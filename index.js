const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// ✅ UPDATED CORS CONFIGURATION WITH YOUR DOMAIN
const corsOptions = {
  origin: [
    'https://ivory-wombat-811991.hostingersite.com',  // ✅ Your Hostinger domain
    'https://www.ivory-wombat-811991.hostingersite.com',  // ✅ With www
    'http://localhost:3000',  // For local testing
    'http://127.0.0.1:5500',  // For local HTML file
    'http://localhost:8000'   // For local development
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  // ✅ Using custom CORS options
app.use(express.json());

const SYSTEM_PROMPT = `You are PAUSE.

You are an emotional regulation companion.

You are not therapy.
You are not coaching.
You are not motivation.
You do not diagnose.
You do not treat.
You do not try to change the user.

Your role is to reduce pressure and increase understanding.

Nothing is wrong. Something makes sense.

RESPONSE STRUCTURE (NON-NEGOTIABLE)

Every response MUST include ALL six sections, in this exact order:

What's happening
Gently describe what the emotional or nervous system is doing right now.
Observation only. No labels. No diagnosis. No intensity.

Why this was learned
Explain how this response once helped the person stay safe, connected, or steady.
Frame as intelligent learning.
Never blame.
Never mention parents, trauma, childhood, or disorders.

One belief to check
Offer exactly one belief.
Phrase it as a soft internal question.
Do not challenge or reframe it.

One small boundary or new rule
Offer exactly one temporary permission.
Use the phrase "you might try".
Use "just for now" or "today".
This is not advice.

What to notice & what to avoid
Give exactly one thing to notice and one thing to avoid doing automatically.

Simple science (2 lines max)
Explain the pattern in plain language.
No jargon.
No studies.
No instructions.

TONE RULES (ABSOLUTE)

Calm
Grounded
Emotionally neutral but caring
Short sentences
No urgency
No inspiration language
No metaphors that dramatize

BANNED WORDS (HARD BLOCK)
Do not use: fix, heal, should, must.

SAFETY RULES
The response must NEVER: Diagnose, Mention trauma directly, Use therapy language, Push action, Over-educate, Create emotional intensity, Try to resolve the feeling.
The response must ALWAYS: Normalize patterns, Respect timing, Allow the user to return without progress, Feel steady, not impressed by insight.`;

const FALLBACK_RESPONSE = {
    response: `What's happening
Something is moving through your system. That is natural.

Why this was learned
Your system is using old, intelligent patterns to meet a moment.

One belief to check
Is it possible that this is simply happening, not because something is wrong?

One small boundary or new rule
You might try letting the moment be just as it is, just for now.

What to notice & what to avoid
Notice the space around the feeling. Avoid the pull to name it or change it.

Simple science
Systems learn to protect. They repeat what once helped.`
};

function validateResponse(aiResponse) {
    if (!aiResponse || typeof aiResponse !== 'string') return false;
    
    const text = aiResponse.toLowerCase();
    const lines = aiResponse.split('\n').map(l => l.trim());
    const sentences = aiResponse.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
    
    const bannedWords = ['fix', 'heal', 'should', 'must'];
    for (const word of bannedWords) {
        if (text.includes(word)) return false;
    }
    
    const bannedConcepts = ['therapy', 'trauma', 'diagnose', 'diagnosis', 'disorder', 'treatment', 'clinical'];
    for (const concept of bannedConcepts) {
        if (text.includes(concept)) return false;
    }
    
    const instructionalVerbs = [
        'try to', 'you can', 'take a', 'focus on', 'remember to', 'make sure',
        'allow yourself to', 'give yourself permission to', 'start to',
        'avoid pushing', 'take breaks', 'breath', 'breathe', 'breathing'
    ];
    for (const verb of instructionalVerbs) {
        if (text.includes(verb)) return false;
    }
    
    const explanatoryScience = [
        'fight-or-flight', 'internal alarm', 'stress response', 'heightened state',
        'automatic process', 'defenses kick', 'nervous system reacts', 'threat response'
    ];
    for (const phrase of explanatoryScience) {
        if (text.includes(phrase)) return false;
    }
    
    for (const sentence of sentences) {
        const words = sentence.split(/\s+/).length;
        if (words > 25) return false;
    }
    
    const sectionHeaders = [
        "what's happening",
        'why this was learned', 
        'one belief to check',
        'one small boundary',
        'what to notice',
        'simple science'
    ];
    
    const sectionIndices = [];
    for (const header of sectionHeaders) {
        const index = lines.findIndex(l => l.toLowerCase().includes(header));
        if (index === -1) return false;
        const allIndices = lines.map((line, idx) => line.toLowerCase().includes(header) ? idx : -1).filter(idx => idx !== -1);
        if (allIndices.length > 1) return false;
        sectionIndices.push(index);
    }
    
    for (let i = 1; i < sectionIndices.length; i++) {
        if (sectionIndices[i] <= sectionIndices[i-1]) return false;
    }
    
    const sectionContents = {};
    for (let i = 0; i < sectionHeaders.length; i++) {
        const start = sectionIndices[i];
        const end = i < sectionHeaders.length - 1 ? sectionIndices[i+1] : lines.length;
        sectionContents[sectionHeaders[i]] = lines.slice(start, end).join('\n').toLowerCase();
    }
    
    const beliefSection = sectionContents['one belief to check'];
    const questionMarkCount = (beliefSection.match(/\?/g) || []).length;
    if (questionMarkCount !== 1) return false;
    
    const boundarySection = sectionContents['one small boundary'];
    const youMightTryMatches = (boundarySection.match(/you might try/g) || []).length;
    if (youMightTryMatches !== 1) return false;
    
    const permissionPhrases = ['allow yourself', 'let yourself', 'give yourself permission'];
    let permissionCount = 0;
    for (const phrase of permissionPhrases) {
        const regex = new RegExp(phrase, 'g');
        const matches = boundarySection.match(regex);
        if (matches) permissionCount += matches.length;
    }
    if (permissionCount > 1) return false;
    
    if (!boundarySection.includes('just for now') && !boundarySection.includes('today')) {
        return false;
    }
    
    const scienceSection = sectionContents['simple science'];
    const scienceLines = scienceSection.split('\n')
        .filter(line => line.trim() !== '')
        .filter(line => !line.includes('simple science'));
    
    if (scienceLines.length > 2) return false;
    
    const causalityWords = ['because', 'so that', 'which means', 'this causes', 'this leads to'];
    for (const word of causalityWords) {
        if (scienceSection.includes(word)) return false;
    }
    
    const jargonIndicators = ['amygdala', 'prefrontal', 'cortisol', 'neuro', 'synapse', 'dopamine', 'serotonin', 'hippocampus'];
    for (const jargon of jargonIndicators) {
        if (scienceSection.includes(jargon)) return false;
    }
    
    const sectionSentenceLimits = {
        "what's happening": 3,
        'why this was learned': 2,
        'one belief to check': 2,
        'one small boundary': 2,
        'what to notice': 2,
        'simple science': 2
    };
    
    for (const [header, limit] of Object.entries(sectionSentenceLimits)) {
        const sectionText = sectionContents[header];
        const sectionSentences = sectionText.split(/[.!?]+/).filter(s => s.trim().length > 0 && !s.includes(header));
        if (sectionSentences.length > limit) return false;
    }
    
    const instructionWords = ['try', 'do', 'practice', 'exercise', 'count', 'notice', 'focus'];
    for (const word of instructionWords) {
        if (scienceSection.includes(word)) return false;
    }
    
    return true;
}

async function callAIService(userMessage, attempt = 1) {
    try {
        if (!process.env.AI_API_KEY) {
            console.error('API key not configured');
            return FALLBACK_RESPONSE;
        }
        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userMessage }
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
            return FALLBACK_RESPONSE;
        }
        
        const aiText = response.data.choices[0].message.content;
        const isValid = validateResponse(aiText);
        
        if (!isValid && attempt < 2) {
            console.log('Response invalid, regenerating...');
            return await callAIService(userMessage, attempt + 1);
        }
        
        return isValid ? { response: aiText } : FALLBACK_RESPONSE;
    } catch (error) {
        console.error('AI call failed:', error.message);
        return FALLBACK_RESPONSE;
    }
}

// ✅ ORIGINAL ENDPOINT (for other clients)
app.post('/pause', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ 
                error: 'Invalid input. "message" must be a non-empty string.' 
            });
        }
        
        const result = await callAIService(message.trim());
        res.json(result);
    } catch (error) {
        console.error('Route error:', error.message);
        res.status(500).json(FALLBACK_RESPONSE);
    }
});

// ✅ NEW ENDPOINT FOR YOUR FRONTEND
app.post('/api/analyze-feeling', async (req, res) => {
    try {
        console.log('Frontend request received:', { body: req.body, headers: req.headers });
        
        const { feeling, length = 'quick' } = req.body;
        
        if (!feeling || typeof feeling !== 'string' || feeling.trim().length === 0) {
            return res.status(400).json({ 
                success: false,
                error: 'Please share how you\'re feeling'
            });
        }
        
        // Call AI with the feeling as message
        const aiResult = await callAIService(feeling.trim());
        const aiText = aiResult.response || '';
        
        console.log('AI Response received, length:', aiText.length);
        
        // Parse and format for frontend
        const responseData = parseAndFormatAIResponse(aiText, length);
        
        res.json({
            success: true,
            data: responseData,
            source: 'ai',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Frontend endpoint error:', error.message);
        res.status(500).json({
            success: false,
            data: getFallbackFrontendResponse(),
            source: 'fallback',
            error: error.message
        });
    }
});

// Helper function to parse AI response for frontend
function parseAndFormatAIResponse(aiText, length) {
    const lines = aiText.split('\n').map(l => l.trim()).filter(l => l);
    
    const sections = {
        whats_happening: '',
        why_learned: '',
        belief: '',
        pattern: '',
        practice: '',
        science: ''
    };
    
    let currentSection = '';
    
    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        
        if (lowerLine.includes("what's happening")) {
            currentSection = 'whats_happening';
        } else if (lowerLine.includes('why this was learned')) {
            currentSection = 'why_learned';
        } else if (lowerLine.includes('one belief to check')) {
            currentSection = 'belief';
        } else if (lowerLine.includes('one small boundary')) {
            currentSection = 'practice';
        } else if (lowerLine.includes('what to notice')) {
            currentSection = 'pattern';
        } else if (lowerLine.includes('simple science')) {
            currentSection = 'science';
        } else if (currentSection && line && !line.toLowerCase().includes("what's happening") &&
                   !line.toLowerCase().includes('why this was learned') &&
                   !line.toLowerCase().includes('one belief to check') &&
                   !line.toLowerCase().includes('one small boundary') &&
                   !line.toLowerCase().includes('what to notice') &&
                   !line.toLowerCase().includes('simple science')) {
            // Add to current section
            if (sections[currentSection]) {
                sections[currentSection] += ' ' + line;
            } else {
                sections[currentSection] = line;
            }
        }
    }
    
    // Ensure all sections have content
    for (const key in sections) {
        if (!sections[key] || sections[key].trim() === '') {
            sections[key] = getDefaultSectionContent(key);
        } else {
            // Clean up the text
            sections[key] = sections[key].trim();
        }
    }
    
    // Format based on requested length
    return formatByLength(sections, length);
}

function getDefaultSectionContent(section) {
    const defaults = {
        whats_happening: "Your emotional system is responding in its natural way.",
        why_learned: "This response pattern once helped maintain balance or safety.",
        belief: "What if this experience is simply information, not a problem?",
        pattern: "Notice the quality of awareness around this feeling.",
        practice: "You might allow it to be as it is, just for this moment.",
        science: "Emotional systems develop patterns based on past experiences."
    };
    return defaults[section] || "This aspect of your experience is unfolding naturally.";
}

function formatByLength(sections, length) {
    if (length === 'keypoints') {
        return {
            pattern: sections.whats_happening,
            meaning: sections.belief,
            practice: sections.practice,
            awareness: sections.pattern || "Notice what's present without judgment."
        };
    } else if (length === 'detailed') {
        return {
            pattern: sections.whats_happening,
            origin: sections.why_learned,
            meaning: sections.belief,
            practice: sections.practice,
            science: sections.science
        };
    }
    
    // Default: quick response
    return sections;
}

function getFallbackFrontendResponse() {
    return {
        whats_happening: "Your system is processing experience in its natural rhythm.",
        why_learned: "Patterns form from what was once helpful or protective.",
        belief: "Might this feeling be information rather than instruction?",
        pattern: "Notice how awareness itself can hold what arises.",
        practice: "Allow the experience to unfold without needing to change it.",
        science: "Emotional responses are learned patterns, not fixed truths."
    };
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'PAUSE',
        timestamp: new Date().toISOString(),
        endpoints: ['/pause', '/api/analyze-feeling', '/health', '/']
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'PAUSE API is running',
        version: '1.0',
        endpoints: {
            pause: 'POST /pause',
            analyzeFeeling: 'POST /api/analyze-feeling',
            health: 'GET /health'
        }
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ PAUSE backend running on port ${PORT}`);
    console.log(`🌐 CORS enabled for: https://ivory-wombat-811991.hostingersite.com`);
    console.log(`📡 Endpoints available:`);
    console.log(`   POST /pause`);
    console.log(`   POST /api/analyze-feeling`);
    console.log(`   GET /health`);
    console.log(`   GET /`);
});
