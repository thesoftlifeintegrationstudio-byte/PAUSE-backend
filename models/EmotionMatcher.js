class EmotionMatcher {
    constructor() {
        this.emotionalStates = {
            worry_future: {
                title: "When Things Feel Uncertain",
                understanding: "That sense of looking ahead and wondering what might come – it's like your mind is trying to prepare for all possibilities. Many people feel this way when facing unknowns.",
                body: "Your body might be showing signs of this through a faster heartbeat, tight shoulders, or that feeling in your stomach. It's your system's way of getting ready.",
                purpose: "This response has helped humans stay alert and prepare for challenges throughout our history. It's part of how we've survived uncertain times.",
                shared: "Across cultures, people experience this before important events or decisions. It's a shared human experience of preparing for what's ahead.",
                closure: "You can continue your day."
            },
            sadness_loss: {
                title: "When Something Feels Missing",
                understanding: "That heavy feeling when something or someone important isn't there anymore – it's like space has opened up where there used to be connection. This is how humans process what matters.",
                body: "You might notice your energy feels lower, movements feel slower, or things don't seem as bright. Your body is honoring the importance of what was.",
                purpose: "This feeling has helped humans form deep bonds and remember what truly matters in our lives together.",
                shared: "Every culture has ways of honoring this feeling because loss touches all human lives, though expressions may differ.",
                closure: "You can continue your day."
            },
            frustration_blocked: {
                title: "When Things Feel Stuck",
                understanding: "That feeling when you're trying to move forward but something's in the way – it's like your energy meets resistance. Many people feel this when facing obstacles.",
                body: "You might feel tension in your jaw or shoulders, restless energy, or that urge to push through. Your body is gathering strength to overcome.",
                purpose: "This feeling has driven humans to solve problems and persist through challenges that seemed impossible.",
                shared: "Everyone encounters obstacles in life, regardless of where they're from. This feeling is part of our shared human journey of growth.",
                closure: "You can continue your day."
            },
            joy_connection: {
                title: "When Things Feel Right",
                understanding: "That warm feeling when things align or connections feel strong – it's like everything falls into place for a moment. This is how humans recognize harmony.",
                body: "You might notice easy breathing, relaxed muscles, or spontaneous smiles. Your body is settling into a moment of goodness.",
                purpose: "This feeling has helped humans build communities, strengthen bonds, and remember what brings us together.",
                shared: "Moments of connection and harmony are sought and celebrated in every human culture around the world.",
                closure: "You can continue your day."
            },
            confusion_learning: {
                title: "When Things Don't Make Sense Yet",
                understanding: "That feeling when understanding feels just out of reach – it's like your mind is sorting through pieces looking for the picture. This is part of how humans learn.",
                body: "You might feel your brow furrow, your thoughts circle, or that need to ask more questions. Your mind is actively working to understand.",
                purpose: "This feeling has driven human curiosity, learning, and discovery throughout our history.",
                shared: "Everyone experiences moments of not understanding, no matter their background. It's part of our shared journey of learning.",
                closure: "You can continue your day."
            },
            peace_integration: {
                title: "When Things Feel Settled",
                understanding: "That quiet feeling when conflicts resolve or balance returns – it's like things have found their place. This is how humans recognize harmony.",
                body: "You might notice steady breathing, relaxed posture, or calm awareness. Your body is resting in a moment of balance.",
                purpose: "This feeling has helped humans conserve energy, heal, and prepare for whatever comes next.",
                shared: "Finding moments of peace and balance is valued in every culture as essential for wellbeing.",
                closure: "You can continue your day."
            }
        };

        this.patterns = {
            worry_future: ['worried', 'anxious', 'nervous', 'uncertain', 'future', 'tomorrow', 'what if'],
            sadness_loss: ['sad', 'miss', 'lost', 'gone', 'alone', 'empty', 'heart', 'hurt'],
            frustration_blocked: ['frustrated', 'stuck', 'can\'t', 'won\'t', 'blocked', 'hard', 'difficult'],
            joy_connection: ['happy', 'joy', 'excited', 'good', 'connected', 'together', 'love'],
            confusion_learning: ['confused', 'don\'t understand', 'unsure', 'question', 'how', 'why'],
            peace_integration: ['peaceful', 'calm', 'settled', 'quiet', 'balanced', 'relaxed']
        };
    }

    matchEmotion(text) {
        if (!text || typeof text !== 'string') {
            return { emotion: 'peace_integration', score: 0 };
        }

        const textLower = text.toLowerCase().trim();
        let bestMatch = { emotion: null, score: 0 };
        
        for (const [emotion, keywords] of Object.entries(this.patterns)) {
            let score = 0;
            
            keywords.forEach(keyword => {
                if (textLower.includes(keyword)) {
                    score += 3;
                }
            });
            
            if (score > bestMatch.score) {
                bestMatch = { emotion, score };
            }
        }
        
        if (!bestMatch.emotion || bestMatch.score === 0) {
            return { emotion: 'peace_integration', score: 0 };
        }
        
        return bestMatch;
    }

    getEmotionData(emotionKey) {
        return this.emotionalStates[emotionKey] || this.emotionalStates['peace_integration'];
    }
}

module.exports = EmotionMatcher;
