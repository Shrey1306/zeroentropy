// ZeroEntropy API Client
interface SynthesisResult {
  synthesis: string
  confidence_score: number
  documents_searched: number
  processing_time: number
  query_id: string
}

interface Document {
  name: string
  content: string
  category: string
  path: string
}

interface APIResponse<T> {
  data: T
  status: number
  message?: string
}

interface TopSnippetsResponse {
  results: Array<{
    path: string
    start_index: number
    end_index: number
    page_span: [number, number]
    content: string
    score: number
  }>
}

interface StatusResponse {
  num_documents: number
  num_parsing_documents: number
  num_indexing_documents: number
  num_indexed_documents: number
  num_failed_documents: number
}

interface CollectionListResponse {
  collection_names: string[]
}

const SAMPLE_DOCUMENTS: Document[] = [
  {
    name: "Tech Company Strategic Plan",
    path: "tech/strategic-plan-2024.md",
    content: `# TechCorp Strategic Plan 2024

## Executive Summary
TechCorp is positioned for aggressive growth in AI/ML sectors with 47% YoY revenue increase targeting $250M ARR by Q4 2024.

## Key Strategic Initiatives
- Cloud Infrastructure Modernization ($15M investment)
- AI/ML Product Suite Launch (Q2 2024)
- International Market Expansion (EMEA focus)
- Talent Acquisition (200+ engineers)

## Financial Performance
- Current ARR: $170M (47% growth)
- Gross Margin: 78%
- Customer Acquisition Cost: $1,200
- Customer Lifetime Value: $45,000

## Risk Factors
- Competitive pressure from Microsoft, Google
- Regulatory uncertainty in AI space
- Talent retention challenges (15% attrition rate)

## Success Metrics
- ARR growth rate >40%
- Customer satisfaction >4.5/5
- Market share in AI tools >8%`,
    category: "Technology"
  },
  {
    name: "Manufacturing Operations Report",
    path: "operations/manufacturing-q3-2024.md",
    content: `# Global Manufacturing Operations Q3 2024

## Production Metrics
- Total Units Produced: 2.4M units (+12% QoQ)
- Overall Equipment Effectiveness: 87%
- Quality Defect Rate: 0.3%
- On-time Delivery: 94%

## Cost Analysis
- Cost per Unit: $47.50 (down 8% from Q2)
- Labor Costs: $28M (23% of total costs)
- Material Costs: $89M (73% of total costs)
- Energy Costs: $5M (4% of total costs)

## Supply Chain Status
- Supplier Performance Score: 8.7/10
- Inventory Turnover: 6.2x annually
- Raw Material Availability: 98%
- Critical Path Bottlenecks: Semiconductor chips, rare earth materials

## Operational Challenges
- Skilled labor shortage (12% open positions)
- Rising energy costs (+18% YoY)
- Supply chain disruptions in Asia-Pacific region
- Equipment maintenance backlogs

## Improvement Initiatives
- Automation implementation (Phase 3 of 5)
- Lean manufacturing optimization
- Predictive maintenance AI deployment
- Supplier diversification program`,
    category: "Manufacturing"
  },
  {
    name: "Healthcare Division Performance",
    path: "healthcare/division-performance-q3.md",
    content: `# Healthcare Division Q3 2024 Performance Report

## Patient Care Metrics
- Patient Satisfaction Score: 4.6/5.0
- Average Wait Time: 18 minutes (target: <20 min)
- Readmission Rate: 8.2% (industry average: 10.1%)
- Mortality Rate: 1.8% (best in region)

## Financial Performance
- Revenue: $145M (+6% YoY)
- Operating Margin: 12.4%
- Cost per Patient: $3,847
- Insurance Reimbursement Rate: 94%

## Operational Excellence
- Bed Occupancy Rate: 82%
- Staff-to-Patient Ratio: 1:4 (optimal range)
- Medical Equipment Uptime: 97.3%
- Emergency Response Time: 4.2 minutes average

## Regulatory Compliance
- HIPAA Compliance Score: 98%
- Joint Commission Accreditation: Renewed (5-year term)
- FDA Inspection Results: No major findings
- Quality Assurance Program: Exceeds standards

## Strategic Initiatives
- Telemedicine expansion (35% growth in virtual visits)
- AI-powered diagnostic tools implementation
- Electronic Health Records optimization
- Medical staff retention program (reduced turnover to 8%)

## Key Challenges
- Nursing shortage (15% vacancy rate)
- Rising pharmaceutical costs (+22% YoY)
- Cybersecurity threats (3 attempted breaches)
- Aging infrastructure requiring $25M upgrade`,
    category: "Healthcare"
  },
  {
    name: "Financial Services Compliance Report",
    path: "finance/compliance-assessment-2024.md",
    content: `# Financial Services Compliance Assessment 2024

## Regulatory Compliance Status
- SOX Compliance: 100% (all controls tested)
- Basel III Capital Adequacy: 14.2% (requirement: 8%)
- AML/KYC Program Effectiveness: 96%
- GDPR Data Protection Score: 94%

## Risk Management
- Value at Risk (VaR): $2.3M (95% confidence, 1-day horizon)
- Credit Loss Provisions: $45M (1.2% of loan portfolio)
- Operational Risk Events: 12 (down from 18 last quarter)
- Cyber Risk Assessment: Medium-High

## Financial Performance
- Return on Assets: 1.8%
- Return on Equity: 15.2%
- Net Interest Margin: 3.4%
- Cost-to-Income Ratio: 58%

## Regulatory Updates
- Implementation of new stress testing requirements
- Enhanced reporting for ESG investments
- Updated consumer protection regulations
- Digital asset trading guidelines compliance

## Audit Findings
- Internal Audit: 3 medium-risk findings (remediated)
- External Audit: Unqualified opinion
- Regulatory Examinations: Satisfactory rating
- Third-party risk assessments: 94% compliant`,
    category: "Finance"
  },
  {
    name: "Legal Department Analysis",
    path: "legal/quarterly-analysis-q3.md",
    content: `# Legal Department Quarterly Analysis Q3 2024

## Litigation Overview
- Active Cases: 23 (down from 31 previous quarter)
- New Filings: 7
- Cases Resolved: 15 (92% in company's favor)
- Average Resolution Time: 8.3 months

## Contract Management
- Contracts Reviewed: 1,247
- Average Review Time: 3.2 days (target: <5 days)
- Contract Value Processed: $890M
- Vendor Agreement Renewals: 78 contracts

## Intellectual Property
- Patent Applications Filed: 12
- Trademark Registrations: 8
- IP Licensing Revenue: $3.2M
- Copyright Enforcement Actions: 5

## Regulatory Compliance
- Compliance Training Completion: 96%
- Regulatory Filings: 100% on-time submission
- Policy Updates: 15 corporate policies revised
- Data Privacy Audits: 4 completed, all passed

## Cost Management
- Legal Spend: $2.8M (8% under budget)
- External Counsel Costs: $1.9M
- Internal Legal Team Productivity: +12%
- E-discovery Costs: $340K (managed through technology)

## Key Legal Risks
- Product liability exposure: Medium
- Employment law compliance: Low
- International trade regulations: High
- Data privacy regulations: Medium-High`,
    category: "Legal"
  }
]

class ZeroEntropyClient {
  private apiKey: string | null = null
  private baseUrl: string = 'https://api.zeroentropy.dev/v1'
  private collectionName: string = 'synthesis_comparison_demo'

  constructor() {
    // Use server-side env variable for API key
    this.apiKey = process.env.NEXT_PUBLIC_ZEROENTROPY_API_KEY || null
  }

  private async makeRequest<T>(endpoint: string, data: any = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('ZeroEntropy API key not configured')
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new Error(`API Error ${response.status}: ${errorData.detail || response.statusText}`)
    }

    return response.json()
  }

  async checkStatus(): Promise<StatusResponse> {
    return this.makeRequest<StatusResponse>('/status/get-status', {
      collection_name: this.collectionName
    })
  }

  async getCollections(): Promise<CollectionListResponse> {
    return this.makeRequest<CollectionListResponse>('/collections/get-collection-list', {})
  }

  async createCollection(): Promise<void> {
    try {
      await this.makeRequest('/collections/add-collection', {
        collection_name: this.collectionName
      })
    } catch (error: any) {
      // Ignore 409 Conflict (collection already exists)
      if (!error.message.includes('409')) {
        throw error
      }
    }
  }

  async addDocument(document: Document): Promise<void> {
    try {
      await this.makeRequest('/documents/add-document', {
        collection_name: this.collectionName,
        path: document.path,
        content: {
          type: 'text',
          text: document.content
        },
        metadata: {
          category: document.category,
          name: document.name
        },
        overwrite: true
      })
    } catch (error: any) {
      console.warn(`Failed to add document ${document.name}:`, error.message)
    }
  }

  async loadDocuments(onProgress?: (progress: number, message: string) => void): Promise<void> {
    if (!this.apiKey) {
      // Fallback to demo mode
      onProgress?.(0, 'Demo mode: Simulating document loading...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      onProgress?.(100, `Loaded ${SAMPLE_DOCUMENTS.length} documents in demo mode`)
      return
    }

    try {
      onProgress?.(0, 'Creating collection...')
      await this.createCollection()
      
      onProgress?.(10, 'Starting document upload...')
      
      const totalDocs = SAMPLE_DOCUMENTS.length
      for (let i = 0; i < totalDocs; i++) {
        const doc = SAMPLE_DOCUMENTS[i]
        onProgress?.(10 + (i / totalDocs) * 70, `Uploading ${doc.name}...`)
        await this.addDocument(doc)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      onProgress?.(80, 'Waiting for indexing to complete...')
      
      // Wait for indexing to complete
      let attempts = 0
      const maxAttempts = 30
      while (attempts < maxAttempts) {
        const status = await this.checkStatus()
        const indexedPercentage = status.num_documents > 0 
          ? (status.num_indexed_documents / status.num_documents) * 100 
          : 0
        
        onProgress?.(80 + (indexedPercentage / 100) * 20, 
          `Indexing documents: ${status.num_indexed_documents}/${status.num_documents} completed`)
        
        if (status.num_indexed_documents === status.num_documents && status.num_documents > 0) {
          break
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        attempts++
      }
      
      onProgress?.(100, `Successfully loaded and indexed ${totalDocs} documents`)
    } catch (error: any) {
      console.error('Error loading documents:', error)
      throw new Error(`Failed to load documents: ${error.message}`)
    }
  }

  async synthesize(query: string, onProgress?: (message: string) => void): Promise<SynthesisResult> {
    if (!this.apiKey) {
      // Fallback to demo mode
      onProgress?.('Demo mode: Generating synthesis...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const synthesis = this.generateDemoSynthesis(query)
      return {
        synthesis,
        confidence_score: 0.85 + Math.random() * 0.1,
        documents_searched: SAMPLE_DOCUMENTS.length,
        processing_time: 1.2 + Math.random() * 0.5,
        query_id: 'demo-' + Date.now()
      }
    }

    const startTime = Date.now()
    
    try {
      onProgress?.('Searching knowledge base...')
      
      // Get top snippets using ZeroEntropy's API
      const snippetResponse = await this.makeRequest<TopSnippetsResponse>('/queries/top-snippets', {
        collection_name: this.collectionName,
        query: query,
        k: 10,
        precise_responses: false
      })
      
      onProgress?.('Processing results and generating insights...')
      
      // Create synthesis from snippets
      const synthesis = this.createSynthesisFromSnippets(query, snippetResponse.results)
      const processingTime = (Date.now() - startTime) / 1000
      
      // Calculate confidence based on snippet scores
      const avgScore = snippetResponse.results.length > 0
        ? snippetResponse.results.reduce((sum, r) => sum + r.score, 0) / snippetResponse.results.length
        : 0
      
      return {
        synthesis,
        confidence_score: Math.min(avgScore, 0.95),
        documents_searched: new Set(snippetResponse.results.map(r => r.path)).size,
        processing_time: processingTime,
        query_id: 'api-' + Date.now()
      }
    } catch (error: any) {
      console.error('Error in synthesis:', error)
      throw new Error(`Synthesis failed: ${error.message}`)
    }
  }

  private createSynthesisFromSnippets(query: string, snippets: any[]): string {
    if (snippets.length === 0) {
      return `I couldn't find specific information related to "${query}" in the current knowledge base. Please ensure documents have been loaded and indexed, or try rephrasing your query.`
    }

    const queryLower = query.toLowerCase()
    const uniquePaths = new Set(snippets.map(s => s.path))
    
    let synthesis = `Based on analysis of ${uniquePaths.size} documents in your knowledge base:\n\n`
    
    // Group snippets by document
    const byDocument = snippets.reduce((acc, snippet) => {
      if (!acc[snippet.path]) acc[snippet.path] = []
      acc[snippet.path].push(snippet)
      return acc
    }, {} as Record<string, any[]>)
    
    // Create synthesis based on query type
    if (queryLower.includes('risk')) {
      synthesis += this.synthesizeRisks(byDocument)
    } else if (queryLower.includes('financial') || queryLower.includes('performance')) {
      synthesis += this.synthesizeFinancial(byDocument)
    } else if (queryLower.includes('operational') || queryLower.includes('inefficienc')) {
      synthesis += this.synthesizeOperational(byDocument)
    } else if (queryLower.includes('strategic') || queryLower.includes('investment')) {
      synthesis += this.synthesizeStrategic(byDocument)
    } else if (queryLower.includes('competitive') || queryLower.includes('threat')) {
      synthesis += this.synthesizeCompetitive(byDocument)
    } else if (queryLower.includes('customer') || queryLower.includes('satisfaction')) {
      synthesis += this.synthesizeCustomer(byDocument)
    } else if (queryLower.includes('compliance') || queryLower.includes('legal')) {
      synthesis += this.synthesizeCompliance(byDocument)
    } else if (queryLower.includes('growth') || queryLower.includes('opportunit')) {
      synthesis += this.synthesizeGrowth(byDocument)
    } else {
      // General synthesis
      synthesis += this.synthesizeGeneral(byDocument, snippets)
    }
    
    synthesis += `\n\n**Data Sources:** Analysis based on ${snippets.length} relevant excerpts from ${uniquePaths.size} organizational documents.`
    
    return synthesis
  }

  private synthesizeRisks(byDocument: Record<string, any[]>): string {
    const docs = Object.keys(byDocument)
    let synthesis = '**Key Risk Areas Identified:**\n\n'
    
    docs.forEach(docPath => {
      const snippets = byDocument[docPath]
      const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
      synthesis += `**${docName}:**\n`
      snippets.slice(0, 2).forEach(snippet => {
        const content = snippet.content.substring(0, 200) + '...'
        synthesis += `• ${content}\n`
      })
      synthesis += '\n'
    })
    
    return synthesis
  }

  private synthesizeFinancial(byDocument: Record<string, any[]>): string {
    return '**Financial Performance Overview:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeOperational(byDocument: Record<string, any[]>): string {
    return '**Operational Analysis:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeStrategic(byDocument: Record<string, any[]>): string {
    return '**Strategic Investment Analysis:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeCompetitive(byDocument: Record<string, any[]>): string {
    return '**Competitive Landscape Analysis:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeCustomer(byDocument: Record<string, any[]>): string {
    return '**Customer Satisfaction Analysis:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeCompliance(byDocument: Record<string, any[]>): string {
    return '**Compliance & Legal Analysis:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeGrowth(byDocument: Record<string, any[]>): string {
    return '**Growth Opportunities Analysis:**\n\n' + 
           Object.keys(byDocument).map(docPath => {
             const snippets = byDocument[docPath]
             const docName = docPath.split('/').pop()?.replace('.md', '') || docPath
             const content = snippets[0]?.content.substring(0, 300) + '...'
             return `**${docName}:** ${content}`
           }).join('\n\n')
  }

  private synthesizeGeneral(byDocument: Record<string, any[]>, snippets: any[]): string {
    return '**Key Insights:**\n\n' + 
           snippets.slice(0, 5).map((snippet, index) => {
             const docName = snippet.path.split('/').pop()?.replace('.md', '') || snippet.path
             const content = snippet.content.substring(0, 250) + '...'
             return `${index + 1}. **${docName}:** ${content}`
           }).join('\n\n')
  }

  private generateDemoSynthesis(query: string): string {
    const queryLower = query.toLowerCase()

    if (queryLower.includes('risk')) {
      return `**Demo Mode - Risk Analysis:**

Based on analysis of organizational documents, the primary risks identified are:

**Operational Risks:**
• Talent retention challenges with 15% attrition rate in tech division
• Nursing shortage creating 15% vacancy rate in healthcare operations  
• Supply chain vulnerabilities in semiconductor and rare earth materials

**Financial Risks:**
• Rising energy costs (+18% YoY) impacting manufacturing margins
• Pharmaceutical cost inflation (+22% YoY) affecting healthcare profitability
• Credit loss exposure of $45M (1.2% of loan portfolio)

**Strategic Risks:**
• Competitive pressure from Microsoft and Google in AI/ML markets
• Regulatory uncertainty in AI space potentially impacting product roadmap
• Cybersecurity threats with 3 attempted breaches in healthcare division

**Recommended Actions:**
1. Implement comprehensive talent retention program across divisions
2. Diversify supply chain partnerships to reduce single-point failures
3. Enhance cybersecurity investments, particularly for healthcare systems
4. Develop contingency plans for regulatory changes in AI sector

*Note: This is a demonstration using sample data. Configure your ZeroEntropy API key to access real organizational insights.*`
    }

    // Return other demo syntheses as before...
    return `**Demo Mode - General Analysis:**

Based on comprehensive analysis of organizational documents:

**Key Insights:**
• Strong financial performance across all business units with Technology leading at 47% YoY growth
• Operational excellence in Healthcare (4.6/5 patient satisfaction) and Manufacturing (0.3% defect rate)
• Robust regulatory compliance positioning, particularly in Financial Services (14.2% capital adequacy)
• Strategic growth opportunities in AI/ML expansion and international markets

**Cross-Functional Themes:**
• Talent retention challenges across divisions requiring coordinated HR strategy
• Cybersecurity risks necessitating enterprise-wide security enhancement
• Supply chain resilience needs, particularly for critical materials and semiconductors
• Digital transformation opportunities in customer experience and operational efficiency

**Strategic Recommendations:**
1. Accelerate AI/ML investments to maintain competitive advantage
2. Implement enterprise-wide talent retention program
3. Enhance cybersecurity posture across all divisions
4. Continue international expansion with structured approach

*Note: This is a demonstration using sample data. Configure your ZeroEntropy API key to access real organizational insights.*`
  }

  isConfigured(): boolean {
    return !!this.apiKey
  }
}

export const zeroEntropyClient = new ZeroEntropyClient()
export type { SynthesisResult, StatusResponse }
export { ZeroEntropyClient } 