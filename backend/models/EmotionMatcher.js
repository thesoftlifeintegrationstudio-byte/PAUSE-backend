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
            },
            loneliness_alone: {
                title: "When Connection Feels Distant",
                understanding: "That hollow feeling when connection feels far away – it's like there's space meant for sharing that's currently empty. Many people feel this when separated from others.",
                body: "You might feel physically still, notice quiet around you, or have thoughts that circle back to missing others. Your system is noticing the absence of connection.",
                purpose: "This feeling has helped humans maintain social bonds and seek out community, which has been essential for survival.",
                shared: "Feeling disconnected is part of the human experience everywhere, reminding us of our need for each other.",
                closure: "You can continue your day."
            },
            overwhelm_full: {
                title: "When Too Much Is Happening",
                understanding: "That feeling when everything seems to come at once – it's like your capacity is being tested. Many people feel this when demands exceed resources.",
                body: "You might feel scattered, notice shallow breathing, or have difficulty focusing. Your system is trying to process more than it can handle at once.",
                purpose: "This feeling has helped humans prioritize what matters most when resources are limited.",
                shared: "Everyone experiences overwhelm at times, regardless of culture. It's a signal to pause and reassess.",
                closure: "You can continue your day."
            },
            excitement_anticipation: {
                title: "When Something Good Is Coming",
                understanding: "That bubbly feeling when something positive approaches – it's like energy rises in anticipation. This is how humans prepare for good things.",
                body: "You might feel extra energy, notice quicker movements, or have thoughts that jump ahead. Your system is getting ready for positive engagement.",
                purpose: "This feeling has helped humans pursue opportunities and engage fully with positive experiences.",
                shared: "Anticipation of good things brings energy to people in every culture and community.",
                closure: "You can continue your day."
            },
            tiredness_exhaustion: {
                title: "When Energy Is Low",
                understanding: "That heavy feeling when reserves feel depleted – it's like your system needs rest to recharge. Many people feel this after sustained effort.",
                body: "You might notice slower movements, heavy eyelids, or reduced interest in activities. Your body is signaling its need for restoration.",
                purpose: "This feeling has helped humans balance activity with rest, which is essential for long-term survival.",
                shared: "The need for rest and renewal is recognized in every culture as fundamental to wellbeing.",
                closure: "You can continue your day."
            }
        };

        this.emotionalPatterns = {
            worry_future: [
                'worried about', 'anxious about', 'scared of', 'nervous about',
                'what if', 'might happen', 'future', 'tomorrow',
                'uncertain', 'don\'t know what', 'afraid', 'concerned'
            ],
            sadness_loss: [
                'sad about', 'miss', 'lost', 'gone',
                'used to be', 'remember when', 'wish', 'heart hurts',
                'empty', 'alone', 'nobody understands', 'hurt'
            ],
            frustration_blocked: [
                'frustrated', 'annoyed', 'stuck', 'can\'t',
                'won\'t work', 'blocked', 'trying but',
                'hard time', 'difficult', 'obstacle', 'barrier', 'impossible'
            ],
            joy_connection: [
                'happy', 'excited', 'good about', 'pleased',
                'connected', 'together', 'close to', 'loved',
                'appreciate', 'thankful', 'blessed', 'lucky', 'joy'
            ],
            confusion_learning: [
                'confused', 'don\'t understand', 'unsure',
                'what does', 'how come', 'why is',
                'puzzled', 'doesn\'t make sense', 'question', 'wonder'
            ],
            peace_integration: [
                'peaceful', 'calm', 'settled', 'quiet',
                'balanced', 'centered', 'at ease', 'relaxed',
                'everything is okay', 'fine', 'alright', 'content'
            ],
            loneliness_alone: [
                'lonely', 'by myself', 'no one', 'isolated',
                'disconnected', 'separated', 'far from',
                'wish someone', 'need company', 'feel alone', 'isolated'
            ],
            overwhelm_full: [
                'overwhelmed', 'too much', 'can\'t handle',
                'stressed out', 'burdened', 'loaded',
                'everything at once', 'too many things',
                'drowning', 'sinking', 'pressure'
            ],
            excitement_anticipation: [
                'excited', 'looking forward', 'can\'t wait',
                'eager', 'anticipating', 'waiting for',
                'thrilled', 'pumped', 'ready for', 'enthusiastic'
            ],
            tiredness_exhaustion: [
                'tired', 'exhausted', 'drained', 'worn out',
                'no energy', 'need rest', 'fatigued',
                'burned out', 'weary', 'sleepy', 'drowsy'
            ]
        };
    }

    matchEmotion(text) {
        if (!text || typeof text !== 'string' || text.trim().length < 3) {
            return { emotion: 'peace_integration', score: 0 };
        }

        const textLower = text.toLowerCase().trim();
        let bestMatch = { emotion: null, score: 0 };
        let allScores = {};

        // Calculate scores for each emotional pattern
        for (const [emotion, patterns] of Object.entries(this.emotionalPatterns)) {
            let score = 0;

            // Check each pattern
            for (const pattern of patterns) {
                if (textLower.includes(pattern)) {
                    score += 3;

                    // Extra points for exact matches
                    const exactPattern = new RegExp(`\\b${pattern}\\b`);
                    if (exactPattern.test(textLower)) {
                        score += 2;
                    }
                }
            }

            // Context clues
            if (textLower.includes('feel') || textLower.includes('feeling')) {
                score += 1;
            }

            if (textLower.includes('like') && textLower.length > 30) {
                score += 1;
            }

            if (textLower.includes('body') || textLower.includes('mind')) {
                score += 1;
            }

            allScores[emotion] = score;

            // Update best match if higher score
            if (score > bestMatch.score) {
                bestMatch = { emotion, score };
            }
        }

        // Ensure we always return a valid emotion
        if (!bestMatch.emotion || bestMatch.score < 3) {
            // Use text characteristics for fallback
            if (textLower.includes('?')) return { emotion: 'confusion_learning', score: 0 };
            if (textLower.includes('!') && textLower.length < 50) return { emotion: 'excitement_anticipation', score: 0 };
            if (textLower.length < 40) return { emotion: 'peace_integration', score: 0 };
            if (textLower.includes('always') || textLower.includes('never')) return { emotion: 'frustration_blocked', score: 0 };
            return { emotion: 'worry_future', score: 0 };
        }

        return bestMatch;
    }

    getEmotionData(emotionKey) {
        return this.emotionalStates[emotionKey] || this.emotionalStates['peace_integration'];
    }
}

module.exports = EmotionMatcher;
