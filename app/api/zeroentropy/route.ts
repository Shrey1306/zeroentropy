import { NextRequest, NextResponse } from 'next/server'
import { ZeroEntropyClient } from 'lib/zeroentropy'

export async function POST(req: NextRequest) {
  const { query } = await req.json()
  if (!query) {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 })
  }
  try {
    const client = new ZeroEntropyClient()
    const result = await client.synthesize(query)
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'ZeroEntropy API error' }, { status: 500 })
  }
} 