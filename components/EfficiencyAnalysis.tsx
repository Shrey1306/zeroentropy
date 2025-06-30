'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExecutiveProgress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Clock, DollarSign, TrendingUp, Users, FileText, Zap, Database, Search, Brain, Network, Cpu, BarChart3 } from 'lucide-react'
import { useState, useRef } from 'react'

const architectureComponents = [
  {
    title: "Document Processing Pipeline",
    description: "Intelligent parsing and hierarchical structure recognition",
    icon: FileText,
    features: [
      "Multi-format support (PDF, DOCX, PPT, TXT)",
      "Complex diagram recognition for medicine & manufacturing",
      "Hierarchical structure parsing for legal & healthcare",
      "LLM-powered semantic tagging and annotation"
    ],
    color: "text-blue-400"
  },
  {
    title: "Hybrid Search Engine",
    description: "Advanced retrieval combining vector and keyword search",
    icon: Search,
    features: [
      "Turbopuffer vector storage for semantic similarity",
      "ParadeDB BM25 indices for keyword precision",
      "BK-tree data structure for fuzzy matching",
      "LLM-in-the-loop query understanding"
    ],
    color: "text-green-400"
  },
  {
    title: "Query Processing Engine",
    description: "Natural language understanding without special syntax",
    icon: Brain,
    features: [
      "Intent recognition and query expansion",
      "Multi-document synthesis and cross-referencing",
      "Context-aware business intelligence",
      "Confidence scoring and source attribution"
    ],
    color: "text-purple-400"
  },
  {
    title: "Data Storage Layer",
    description: "Distributed storage optimized for enterprise scale",
    icon: Database,
    features: [
      "Object storage for raw documents and images",
      "PostgreSQL for metadata and relationships",
      "S3 collection dictionaries with BK-tree structure",
      "End-to-end encryption and enterprise security"
    ],
    color: "text-yellow-400"
  }
]

const metrics = [
  {
    title: "Query Processing Speed",
    traditional: "2-4 weeks",
    zeroentropy: "1.2 seconds",
    improvement: "99.9%",
    icon: Clock,
    description: "Time to analyze and synthesize enterprise documents"
  },
  {
    title: "Document Processing",
    traditional: "5-10 docs",
    zeroentropy: "Unlimited",
    improvement: "1000%+",
    icon: FileText,
    description: "Number of documents analyzable simultaneously"
  },
  {
    title: "Search Accuracy",
    traditional: "60%",
    zeroentropy: "95%",
    improvement: "58%",
    icon: TrendingUp,
    description: "Precision of cross-domain insights and synthesis"
  },
  {
    title: "Cost Efficiency",
    traditional: "$2,400",
    zeroentropy: "$24",
    improvement: "99%",
    icon: DollarSign,
    description: "Cost per comprehensive business intelligence analysis"
  }
]

const EfficiencyAnalysis = () => {
  const [query, setQuery] = useState('What are our biggest risks right now?')
  const [isRunning, setIsRunning] = useState(false)
  const [zeTime, setZeTime] = useState(0)
  const [zeResult, setZeResult] = useState<string | null>(null)
  const zeTimer = useRef<NodeJS.Timeout | null>(null)

  // Run ZeroEntropy pipeline (real API call)
  const runZeroEntropy = async (q: string) => {
    setZeTime(0)
    setZeResult(null)
    return new Promise<number>(async resolve => {
      let t = 0
      zeTimer.current = setInterval(() => setZeTime(++t / 10), 100)
      const start = Date.now()
      try {
        const res = await fetch('/api/zeroentropy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q })
        })
        const data = await res.json()
        if (zeTimer.current) clearInterval(zeTimer.current)
        const elapsed = (Date.now() - start) / 1000
        setZeTime(elapsed)
        setZeResult(data.synthesis || 'No result')
        resolve(elapsed)
      } catch (e) {
        if (zeTimer.current) clearInterval(zeTimer.current)
        setZeTime(0)
        setZeResult('Error: Could not reach ZeroEntropy API')
        resolve(0)
      }
    })
  }

  const handleRun = async () => {
    setIsRunning(true)
    setZeTime(0)
    setZeResult(null)
    await runZeroEntropy(query)
    setIsRunning(false)
  }

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold gradient-text">
          ZeroEntropy Architecture
        </h1>
        <p className="text-xl text-gray-300 font-medium max-w-4xl mx-auto">
          Advanced document intelligence system designed to solve common failures in traditional hybrid search implementations
        </p>
        
        {/* Architecture Overview */}
        <div className="mt-8 p-6 bg-gray-800/40 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm leading-relaxed">
            Based on the{' '}
            <a 
              href="https://docs.zeroentropy.dev/architecture" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              ZeroEntropy architecture documentation
            </a>
            , our system brings advanced document intelligence to your knowledge base with enterprise-grade performance and security.
          </p>
        </div>
      </motion.div>

      {/* Query UI */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={isRunning}
          placeholder="Enter your executive query..."
        />
        <button onClick={handleRun} disabled={isRunning || !query.trim()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          {isRunning ? 'Running...' : 'Run Analysis'}
        </button>
      </div>

      {/* ZeroEntropy Result */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
            <span className="text-gray-300">{zeTime.toFixed(1)}s</span>
            {isRunning && <span className="ml-2 animate-pulse text-xs text-green-400">Running...</span>}
          </div>
          <div className="min-h-[60px] text-gray-300 text-sm whitespace-pre-line">
            {zeResult || (isRunning ? 'Processing...' : '—')}
          </div>
        </div>
      </div>

      {/* Architecture Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {architectureComponents.map((component, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full bg-gray-800/60 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700/50 rounded-lg">
                    <component.icon className={`h-6 w-6 ${component.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-gray-200">{component.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {component.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {component.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${component.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center gradient-text">
          Performance Comparison
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card className="h-full bg-gray-800/60 border-gray-700">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <metric.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-200">{metric.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-400">
                    {metric.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-400">Traditional</span>
                      <span className="font-semibold text-red-400">{metric.traditional}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-400">ZeroEntropy</span>
                      <span className="font-semibold text-green-400">{metric.zeroentropy}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-400">Improvement</span>
                      <span className="font-semibold text-blue-400">{metric.improvement}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* System Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="bg-gray-800/60 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl gradient-text flex items-center justify-center">
              <Network className="mr-3 h-8 w-8" />
              System Architecture Flow
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              How ZeroEntropy processes and synthesizes organizational knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ingestion */}
              <div className="text-center space-y-4">
                <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-blue-400">Ingestion</h3>
                  <p className="text-sm text-gray-300">Documents → Parsing → Tagging → Storage</p>
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>• Multi-format document parsing</div>
                  <div>• LLM semantic annotation</div>
                  <div>• Hierarchical structure recognition</div>
                  <div>• Vector & keyword indexing</div>
                </div>
              </div>

              {/* Processing */}
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Brain className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-green-400">Processing</h3>
                  <p className="text-sm text-gray-300">Query → Search → Rank → Synthesize</p>
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>• Natural language understanding</div>
                  <div>• Hybrid search execution</div>
                  <div>• LLM-in-the-loop ranking</div>
                  <div>• Cross-document synthesis</div>
                </div>
              </div>

              {/* Output */}
              <div className="text-center space-y-4">
                <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-purple-400">Intelligence</h3>
                  <p className="text-sm text-gray-300">Insights → Confidence → Attribution</p>
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>• Executive-grade synthesis</div>
                  <div>• Confidence scoring</div>
                  <div>• Source attribution</div>
                  <div>• Actionable recommendations</div>
                </div>
              </div>
            </div>

            {/* Architecture Benefits */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-lg border border-gray-600">
              <h4 className="text-lg font-semibold text-gray-200 mb-4 text-center">
                Architectural Advantages
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Sub-second query processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">Scalable enterprise storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Advanced hybrid search</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">LLM-enhanced understanding</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Network className="h-4 w-4 text-indigo-400" />
                    <span className="text-gray-300">On-premise deployment ready</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ROI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/40">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl gradient-text">
              Enterprise Impact Analysis
            </CardTitle>
            <CardDescription className="text-lg text-gray-300">
              ZeroEntropy's architecture delivers measurable business value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold success-gradient">$2.16M</div>
                <div className="text-sm text-gray-400">Annual savings for enterprise customers</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold metric-gradient">99.9%</div>
                <div className="text-sm text-gray-400">Reduction in time-to-insight</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold success-gradient">10x</div>
                <div className="text-sm text-gray-400">Improvement in decision quality</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default EfficiencyAnalysis 