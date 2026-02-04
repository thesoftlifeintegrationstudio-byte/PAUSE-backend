const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
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
    
    const bannedWords = ['fix', 'heal', 'should', 'must'];
    for (const word of bannedWords) {
        if (text.includes(word)) return false;
    }
    
    const bannedConcepts = ['therapy', 'trauma', 'diagnose', 'diagnosis', 'disorder', 'treatment', 'clinical'];
    for (const concept of bannedConcepts) {
        if (text.includes(concept)) return false;
    }
    
    const sectionHeaders = [
        "what's happening",
        'why this was learned', 
        'one belief to check',
        'one small boundary',
        'what to notice',
        'simple science'
    ];
    
    for (const header of sectionHeaders) {
        if (!text.includes(header)) return false;
    }
    
    return true;
}

async function callAIService(userMessage, attempt = 1) {
    try {
        if (!process.env.AI_API_KEY) {
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
        
        const aiText = response.data.choices[0].message.content;
        const isValid = validateResponse(aiText);
        
        if (!isValid && attempt < 2) {
            return await callAIService(userMessage, attempt + 1);
        }
        
        return isValid ? { response: aiText } : FALLBACK_RESPONSE;
    } catch (error) {
        console.error('AI call error:', error.message);
        return FALLBACK_RESPONSE;
    }
}

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
        res.status(500).json(FALLBACK_RESPONSE);
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'PAUSE' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`PAUSE backend running on port ${PORT}`);
});
