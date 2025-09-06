/**
 * @linkcode /server.js
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist folder (after build)
app.use(express.static(path.join(__dirname, 'dist')));

// API routes (if needed)
app.get('/api/qqqq', (req, res) => {
    res.json({
        vvvvv: "Z+JBKU+WHUI6ITAYAGPUYWOQAO3ICFEXQWYPDZT8G"
    });
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`)
});

