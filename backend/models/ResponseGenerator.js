class ResponseGenerator {
    constructor() {
        this.rules = {
            singleResponse: true,
            noExploration: true,
            noPersonalization: true,
            noMemory: true,
            noAdvice: true,
            simpleLanguage: true,
            interfaceDisappears: true
        };
    }

    generateResponse(emotionData, matchedEmotion) {
        // EXACT STRUCTURE FRONTEND EXPECTS
        return {
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
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = ResponseGenerator;
