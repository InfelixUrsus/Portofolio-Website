// src/pages/api/create-project.js
import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  try {
    const data = await request.json();
    
    // Clean up title to make a safe markdown filename (e.g., "Doctor Site" -> "doctor-site.md")
    const filename = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
    const targetPath = path.join(process.cwd(), 'src', 'content', 'projects', filename);

    // Build the Markdown File Template Structure string
    const fileContent = `---
title: "${data.title}"
description: "${data.description}"
link: "${data.link}"
tags: [${data.tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
---
${data.content || ''}`;

    // Physically write the markdown file straight into your content directory
    fs.writeFileSync(targetPath, fileContent, 'utf8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}