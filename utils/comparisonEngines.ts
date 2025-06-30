import { zeroEntropyClient } from '../lib/zeroentropy'

export interface ComparisonResult {
  answer: string
  time: number
  cost: number
  docsUsed: number
}

export interface ComparisonEngine {
  name: string
  run: (query: string) => Promise<ComparisonResult>
}

// ZeroEntropy engine
export const zeroEntropyEngine: ComparisonEngine = {
  name: 'ZeroEntropy',
  async run(query: string) {
    const start = Date.now()
    const result = await zeroEntropyClient.synthesize(query)
    const time = (Date.now() - start) / 1000
    // Cost: you can set your own cost model here (e.g., $0.01 per query)
    const cost = 0.01
    return {
      answer: result.synthesis,
      time,
      cost,
      docsUsed: result.documents_searched || 0
    }
  }
}

// Claude engine (calls ZeroEntropy for top K snippets, then Claude API)
export const claudeEngine: ComparisonEngine = {
  name: 'Claude',
  async run(query: string) {
    // 1. Get top K snippets from ZeroEntropy
    const zeResult = await zeroEntropyClient.synthesize(query)
    const topSnippets = zeResult.synthesis // or use a real snippet API if available
    // 2. Call Claude API with the query and top snippets as context
    const start = Date.now()
    const res = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, context: topSnippets })
    })
    const data = await res.json()
    const time = (Date.now() - start) / 1000
    // Cost: estimate based on tokens (if Claude API returns token usage)
    const cost = data.cost || 0.12 // fallback to $0.12 per query
    return {
      answer: data.synthesis || data.error || 'No result',
      time,
      cost,
      docsUsed: 5 // or K, if you use top K snippets
    }
  }
}

export const comparisonEngines: ComparisonEngine[] = [zeroEntropyEngine, claudeEngine] 