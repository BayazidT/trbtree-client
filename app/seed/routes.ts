// app/seed/route.ts
export const dynamic = 'force-static';

export async function GET() {
  return new Response('Seed route disabled', { status: 200 });
}