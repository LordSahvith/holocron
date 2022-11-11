// package.json "type": "module" allows for "import" syntax over "require"
import express from 'express';

const app = express();
const PORT = 3000;

// starts server
app.listen(PORT, () => {
    console.log(`Express Server running on port:${PORT} `);
});
