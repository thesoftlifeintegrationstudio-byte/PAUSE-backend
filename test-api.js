const fetch = require('node-fetch');

const FRONTEND_DOMAIN = 'https://ivory-wombat-811991.hostingersite.com/';
const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing API for: https://ivory-wombat-811991.hostingersite.com/');
    console.log('='.repeat(60));

    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthRes = await fetch(`${API_BASE}/health`);
        const healthData = await healthRes.json();
        console.log('✅ Status:', healthData.status);
        console.log('✅ Frontend:', healthData.frontend);

        // Test process endpoint
        console.log('\n2. Testing process endpoint...');
        const processRes = await fetch(`${API_BASE}/process`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': FRONTEND_DOMAIN
            },
            body: JSON.stringify({ 
                text: "I'm feeling anxious about tomorrow" 
            })
        });
        const processData = await processRes.json();
        console.log('✅ Response title:', processData.title);
        console.log('✅ Sections:', processData.sections.length);
        console.log('✅ Closure:', processData.closure);

        console.log('\n🎉 API is working correctly!');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.log('Make sure server is running: npm start');
    }
}

testAPI();
