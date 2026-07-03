import fs from 'fs';
import path from 'path';
export const prerender = false; // 👈 Add this here too!

export async function POST({ request }) {
  try {
    // 1. Grab the Authorization header sent by the admin panel
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    const systemPassword = import.meta.env.ADMIN_PASSWORD;

    // 2. Fail early if the password token is missing or incorrect
    if (!token || token !== systemPassword) {
      return new Response(JSON.stringify({ error: 'Forbidden: Invalid Admin Token' }), { status: 403 });
    }

    // 3. Authenticated successfully -> Proceed with reading data
    const data = await request.json();
    
    const filename = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
    const targetPath = path.join(process.cwd(), 'src', 'content', 'projects', filename);

    const fileContent = `---
title: "${data.title}"
description: "${data.description}"
link: "${data.link}"
tags: [${data.tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
---
${data.content || ''}`;

    fs.writeFileSync(targetPath, fileContent, 'utf8');

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}