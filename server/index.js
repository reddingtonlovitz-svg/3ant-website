const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const app = express();
const PORT = process.env.PORT || 8080;
const DATA_PATH = path.join(__dirname, 'data', 'articles.json');
const SECRETS_HASH = process.env.VITE_MAKE_HASH_KEY || "a7f5d9c3b1e8f2a6d4c0b9e7f5a2d8c1e6f3b9a4d7"; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure data file exists
if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
}

// API: Get all articles
app.get('/api/articles', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: "Failed to read articles" });
    }
});

// API: Webhook for creating articles from Make.com
app.post('/api/webhook/article', (req, res) => {
    const { 
        HASH_KEY, 
        NAME, 
        PREVIEW_TEXT, 
        DETAIL_TEXT, 
        PREVIEW_PICTURE,
        IBLOCK_ID 
    } = req.body;

    console.log('Received webhook request:', { NAME, IBLOCK_ID });

    // 1. Validate HASH_KEY
    if (HASH_KEY !== SECRETS_HASH) {
        console.warn('Unauthorized attempt with HASH_KEY:', HASH_KEY);
        return res.status(403).json({ error: "Unauthorized" });
    }

    if (!NAME) {
        return res.status(400).json({ error: "NAME (Title) is required" });
    }

    try {
        const articlesStr = fs.readFileSync(DATA_PATH, 'utf8');
        const articles = JSON.parse(articlesStr);

        // 2. Generate Slug from Title
        const slug = slugify(NAME, {
            lower: true,
            strict: true,
            locale: 'ru'
        });

        // 3. Create new article object
        const newArticle = {
            id: Date.now(),
            slug: slug,
            title: NAME,
            excerpt: PREVIEW_TEXT || "",
            content: DETAIL_TEXT || "",
            date: new Date().toISOString(),
            author: "3ant Agency", // Default author
            category: "Бизнес", // Default category
            image: PREVIEW_PICTURE || "/images/blog/default.jpg",
            tags: ["Автоматизация", "Маркетинг"]
        };

        // 4. Save
        articles.unshift(newArticle); // Newest first
        fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2));

        console.log('Successfully created article:', NAME);
        res.status(201).json({ success: true, article: newArticle });
    } catch (err) {
        console.error('Error processing webhook:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback for SPA routing
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
