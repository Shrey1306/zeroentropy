import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { query, context } = await req.json()
  const apiKey = process.env.CLAUDE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Claude API key not configured' }, { status: 400 })
  }
  if (!query) {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 })
  }

  // Compose the prompt for Claude
  const prompt = `You are an executive assistant. Here is some company context:\n${context}\n\nBased on this, answer the following question as concisely as possible:\n"${query}"`

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 512,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    })
    if (!anthropicRes.ok) {
      const err = await anthropicRes.text()
      return NextResponse.json({ error: err }, { status: anthropicRes.status })
    }
    const data = await anthropicRes.json()
    // Estimate cost: Claude 3 Opus is ~$15/million input tokens, $75/million output tokens
    // We'll estimate 2K input tokens and 500 output tokens for a short answer
    const inputTokens = 2000
    const outputTokens = 500
    const cost = (inputTokens * 0.000015) + (outputTokens * 0.000075)
    return NextResponse.json({ synthesis: data.content?.[0]?.text || data.completion || JSON.stringify(data), cost })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Claude API error' }, { status: 500 })
  }
} 