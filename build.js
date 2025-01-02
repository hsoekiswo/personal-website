const fs = require('fs');

// Replace `process.env` placeholders in the template file
const content = `
window.env = {
    PUBLIC_KEY: "${process.env.PUBLIC_KEY}",
    SERVICE_ID: "${process.env.SERVICE_ID}",
    TEMPLATE_ID: "${process.env.TEMPLATE_ID}"
};
`;

fs.writeFileSync('./env.js', content);
console.log('Environment variables injected into env.js');