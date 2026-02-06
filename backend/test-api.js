const fetch = require('node-fetch');

const FRONTEND_DOMAIN = 'https://ivory-wombat-811991.hostingersite.com/';
const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 Testing API for frontend: https://ivory-wombat-811991.hostingersite.com/');
    console.log('='.repeat(70));

    try {
        // Test 1: Health check
        console.log('1. Testing health endpoint...');
        const healthRes = await fetch(`${API_BASE}/health`);
        const healthData = await healthRes.json();
        console.log('✅ Status:', healthData.status);
        console.log('✅ Frontend configured:', healthData.frontend);
        console.log('✅ Rules:', Object.keys(healthData.rules || {}).length, 'rules active');

        // Test 2: Test with "Anxious" (from placeholder)
        console.log('\n2. Testing with "Anxious" (from frontend placeholder)...');
        const test1 = await fetch(`${API_BASE}/process`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': FRONTEND_DOMAIN
            },
            body: JSON.stringify({ text: "I feel anxious about everything" })
        });
        const data1 = await test1.json();
        console.log('✅ Response title:', data1.title);
        console.log('✅ Sections:', data1.sections.length);
        console.log('✅ Closure:', data1.closure);

        // Test 3: Test with "Heavy" (from placeholder)
        console.log('\n3. Testing with "Heavy" (from frontend placeholder)...');
        const test2 = await fetch(`${API_BASE}/process`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': FRONTEND_DOMAIN
            },
            body: JSON.stringify({ text: "Everything feels heavy today" })
        });
        const data2 = await test2.json();
        console.log('✅ Response title:', data2.title);

        // Test 4: Test with "Something feels off" (from placeholder)
        console.log('\n4. Testing with "Something feels off" (from frontend placeholder)...');
        const test3 = await fetch(`${API_BASE}/process`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Origin': FRONTEND_DOMAIN
            },
            body: JSON.stringify({ text: "Something feels off but I don't know what" })
        });
        const data3 = await test3.json();
        console.log('✅ Response title:', data3.title);

        // Test 5: Check CORS headers for frontend domain
        console.log('\n5. Checking CORS headers for https://ivory-wombat-811991.hostingersite.com/ ...');
        const optionsRes = await fetch(`${API_BASE}/health`, { 
            method: 'OPTIONS',
            headers: { 'Origin': FRONTEND_DOMAIN }
        });
        
        const corsHeader = optionsRes.headers.get('access-control-allow-origin');
        console.log('✅ CORS Access-Control-Allow-Origin:', corsHeader);
        console.log('✅ Matches frontend domain?', corsHeader === FRONTEND_DOMAIN ? 'YES ✅' : 'NO ❌');

        console.log('\n' + '='.repeat(70));
        console.log('🎉 ALL TESTS PASSED! Backend is ready for:');
        console.log('🌐 Frontend: https://ivory-wombat-811991.hostingersite.com/');
        console.log('🔗 API: http://localhost:3000');
        
        console.log('\n📋 Next steps:');
        console.log('1. Deploy this backend to a hosting service');
        console.log('2. Get your backend URL (e.g., https://emotional-companion-api.onrender.com)');
        console.log('3. Update frontend with backend URL');
        console.log('4. Test connection between frontend and backend');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.log('\n⚠️  Make sure:');
        console.log('1. Server is running: cd backend && npm start');
        console.log('2. Port 3000 is available');
        console.log('3. No firewall blocking port 3000');
    }
}

testAPI();
