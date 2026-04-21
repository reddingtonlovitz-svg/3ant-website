import fs from 'fs';
import path from 'path';

// Load blog data from JSON
const blogDataPath = path.resolve(process.cwd(), 'src/data/blog.json');
const BLOG_POSTS = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

const SITE_URL = 'https://3ant.ru'; // Замените на реальный URL
const SITE_TITLE = '3ant Agency Blog';
const SITE_DESCRIPTION = 'Экспертные статьи о маркетинге, SEO и автоматизации бизнеса от 3ant Agency.';

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
    return c;
  });
}

const generateRss = () => {
  const items = BLOG_POSTS.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <author>${post.author}</author>
      <category>${post.category}</category>
      ${post.image ? `<enclosure url="${post.image}" length="0" type="image/jpeg" />` : ''}
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
<channel>
  <title>${SITE_TITLE}</title>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  <link>${SITE_URL}</link>
  <description>${SITE_DESCRIPTION}</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <language>ru-RU</language>
  <sy:updatePeriod>hourly</sy:updatePeriod>
  <sy:updateFrequency>1</sy:updateFrequency>
  ${items}
</channel>
</rss>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.join(publicDir, 'rss.xml');
  fs.writeFileSync(outputPath, rss.trim());
  console.log(`✅ RSS feed generated successfully at: ${outputPath}`);
};

generateRss();
