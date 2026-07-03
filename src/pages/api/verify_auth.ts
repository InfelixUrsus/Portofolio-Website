// 🚨 TELL ASTRO TO RUN THIS ON A LIVE SERVER, NOT AS A STATIC FILE
export const prerender = false;

export async function POST({ request }) {
  try {
    const rawText = await request.text();
    if (!rawText || rawText.trim() === "") {
      return new Response(JSON.stringify({ error: "Empty body" }), { status: 400 });
    }

    const body = JSON.parse(rawText);
    const systemPassword = import.meta.env.ADMIN_PASSWORD;

    console.log('--- Auth Comparison ---');
    console.log('Typed:', `"${body.password}"`);
    console.log('Expected:', `"${systemPassword}"`);

    if (body.password?.trim() === systemPassword?.trim()) {
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server processing error' }), { status: 500 });
  }
}