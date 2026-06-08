import React from 'react'

const TestApp = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Twisty Tales Test</h1>
            <p>If you can see this, React is working!</p>
            <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
                <h2>Component Status Check:</h2>
                <ul>
                    <li>✅ React is working</li>
                    <li>✅ Basic rendering works</li>
                    <li>🔍 Checking other components...</li>
                </ul>
            </div>
        </div>
    )
}

export default TestApp
