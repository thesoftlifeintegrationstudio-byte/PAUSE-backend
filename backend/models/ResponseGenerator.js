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
        // Ensure all rules are followed
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
            rules: this.rules,
            matchedEmotion: matchedEmotion
        };
    }

    generateErrorResponse() {
        return {
            title: "Thank You For Sharing",
            sections: [
                {
                    type: "understanding",
                    title: "Thank You For Sharing",
                    content: "What you're experiencing matters. Sometimes words don't capture everything we feel."
                },
                {
                    type: "shared",
                    title: "You're Not Alone",
                    content: "Many people have moments that are hard to put into words. That's part of being human."
                }
            ],
            closure: "You can continue your day.",
            rules: this.rules,
            matchedEmotion: null
        };
    }
}

module.exports = ResponseGenerator;
