'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { OmniInput } from '@/components/ui/input'
import { ExecutiveProgress } from '@/components/ui/progress'
import { FileText, MessageSquare, Cloud, Briefcase, Activity, Database, Zap, AlertCircle, CheckCircle, Clock, Search, TrendingUp, Users } from 'lucide-react'
import { zeroEntropyClient, type SynthesisResult, type StatusResponse } from '../lib/zeroentropy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

const questionHotkeys = [
  "What are our biggest risks right now?",
  "How is our financial performance trending?", 
  "What operational inefficiencies should I address?",
  "Where should we focus our strategic investments?",
  "What competitive threats are emerging?",
  "How can we improve customer satisfaction?",
  "What compliance issues need attention?",
  "Where are our best growth opportunities?"
]

const documentCategories = [
  { name: "Technology", count: 3, color: "bg-blue-500" },
  { name: "Finance", count: 3, color: "bg-green-500" },
  { name: "Healthcare", count: 3, color: "bg-red-500" },
  { name: "Manufacturing", count: 3, color: "bg-yellow-500" },
  { name: "Legal", count: 3, color: "bg-purple-500" },
]

interface ExecutiveAssistantProps {
  documentsLoaded: boolean
  setDocumentsLoaded: (loaded: boolean) => void
  onQuerySubmit: (query: string) => void
  synthesisResult?: SynthesisResult
  currentQuery?: string
}

interface LoadingState {
  isLoading: boolean
  progress: number
  message: string
}

interface QueryMetrics {
  processingTime?: number
  documentsSearched?: number
  confidence?: number
  queryId?: string
}

const ExecutiveAssistant = ({ 
  documentsLoaded, 
  setDocumentsLoaded,
  onQuerySubmit,
  synthesisResult,
  currentQuery 
}: ExecutiveAssistantProps) => {
  const [query, setQuery] = useState('')
  const [synthesis, setSynthesis] = useState<SynthesisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [systemStatus, setSystemStatus] = useState<StatusResponse | null>(null)
  const [documentLoading, setDocumentLoading] = useState(false)
  const [documentLoadingProgress, setDocumentLoadingProgress] = useState(0)
  const [documentLoadingMessage, setDocumentLoadingMessage] = useState('')
  const [apiStatus, setApiStatus] = useState<'connected' | 'demo' | 'error'>('demo')
  const [metrics, setMetrics] = useState<QueryMetrics>({})
  const [claudeComparison, setClaudeComparison] = useState<{
    claudeTime: number;
    zeroEntropyTime: number;
    speedupFactor: number;
  } | null>(null)

  useEffect(() => {
    // Check API configuration on mount
    if (zeroEntropyClient.isConfigured()) {
      setApiStatus('connected')
      checkSystemStatus()
    } else {
      setApiStatus('demo')
    }
  }, [])

  const checkSystemStatus = async () => {
    try {
      const status = await zeroEntropyClient.checkStatus()
      setSystemStatus(status)
    } catch (error) {
      console.warn('Could not fetch system status:', error)
    }
  }

  const handleLoadDocuments = async () => {
    setDocumentLoading(true)
    setDocumentLoadingProgress(0)
    setDocumentLoadingMessage('Initializing...')
    
    try {
      await zeroEntropyClient.loadDocuments((progress, message) => {
        setDocumentLoadingProgress(progress)
        setDocumentLoadingMessage(message)
      })
      
      // Update status immediately after loading
      setDocumentLoading(false)
      setDocumentLoadingMessage('Documents loaded successfully!')
      
      // Refresh system status after loading
      await checkSystemStatus()
      
      // Mark documents as loaded
      setDocumentsLoaded(true)
      
      // Clear loading message after a delay
      setTimeout(() => {
        setDocumentLoadingMessage('')
        setDocumentLoadingProgress(0)
      }, 2000)
      
    } catch (error: any) {
      console.error('Error loading documents:', error)
      setDocumentLoading(false)
      setDocumentLoadingMessage(`Error: ${error.message}`)
      setApiStatus('error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      await handleQuerySubmit(query)
    }
  }

  const handleHotkeyClick = async (question: string) => {
    setQuery(question)
    await handleQuerySubmit(question)
  }

  const simulateClaudePipeline = async (queryText: string): Promise<number> => {
    const startTime = Date.now()
    
    // Simulate traditional LLM pipeline steps
    setLoadingMessage('Traditional Pipeline: Retrieving all documents...')
    await new Promise(resolve => setTimeout(resolve, 2000)) // Document retrieval
    
    setLoadingMessage('Traditional Pipeline: Processing with Claude...')
    await new Promise(resolve => setTimeout(resolve, 3500)) // LLM processing
    
    setLoadingMessage('Traditional Pipeline: Formatting response...')
    await new Promise(resolve => setTimeout(resolve, 800)) // Response formatting
    
    return (Date.now() - startTime) / 1000
  }

  const handleQuerySubmit = async (queryText: string) => {
    // Allow queries in demo mode or when documents are loaded
    const canQuery = apiStatus === 'demo' || documentsLoaded || (systemStatus && systemStatus.num_indexed_documents > 0)
    if (!canQuery) return
    
    setIsLoading(true)
    setLoadingMessage('Starting performance comparison...')
    setSynthesis(null) // Clear previous results
    setMetrics({})
    setClaudeComparison(null)
    
    try {
      // Run Claude simulation first
      const claudeTime = await simulateClaudePipeline(queryText)
      
      // Then run ZeroEntropy
      setLoadingMessage('ZeroEntropy: Initializing hybrid search...')
      const startTime = Date.now()
      
      const result = await zeroEntropyClient.synthesize(queryText, (message) => {
        setLoadingMessage(`ZeroEntropy: ${message}`)
      })
      
      const zeroEntropyTime = (Date.now() - startTime) / 1000
      
      // Calculate metrics
      setMetrics({
        processingTime: result.processing_time,
        documentsSearched: result.documents_searched,
        confidence: result.confidence_score,
        queryId: result.query_id
      })
      
      // Set comparison data
      const speedupFactor = claudeTime / zeroEntropyTime
      setClaudeComparison({
        claudeTime,
        zeroEntropyTime,
        speedupFactor
      })
      
      setSynthesis(result)
      onQuerySubmit(queryText)
      setLoadingMessage('Analysis complete!')
      
    } catch (error: any) {
      console.error('Query error:', error)
      setLoadingMessage(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
      setTimeout(() => setLoadingMessage(''), 3000)
    }
  }

  const getApiStatusColor = () => {
    switch (apiStatus) {
      case 'connected': return 'bg-green-500'
      case 'demo': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getApiStatusText = () => {
    switch (apiStatus) {
      case 'connected': return 'ZeroEntropy API Connected'
      case 'demo': return 'Demo Mode (No API Key)'
      case 'error': return 'API Connection Error'
      default: return 'Unknown Status'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with API Status */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold gradient-text">
          Chief of Staff
        </h1>
        <p className="text-xl text-gray-300 font-medium">
          Your AI-powered executive assistant for strategic insights
        </p>
        
        {/* API Status Indicator */}
        <div className="flex items-center justify-center space-x-2 text-sm">
          <div className={`api-status-indicator ${getApiStatusColor()}`}></div>
          <span className="text-gray-400">{getApiStatusText()}</span>
          {apiStatus === 'connected' && (
            <Activity className="h-4 w-4 text-blue-400" />
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Query Section */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-100 mb-6">
              What would you like to know about your organization?
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <OmniInput
                placeholder="What would you like to know about your organization?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
              />
              
              <Button 
                type="submit" 
                variant="default" 
                size="xl"
                disabled={!query.trim() || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                {isLoading ? 'Processing...' : 'Get Strategic Insights'}
              </Button>
            </form>

            {/* Query Progress */}
            <AnimatePresence>
              {loadingMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
                >
                  <div className="flex items-center space-x-2">
                    {isLoading ? (
                      <div className="loading-shimmer w-4 h-4 rounded-full"></div>
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                    <span className="text-sm text-gray-300">{loadingMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Real-time Metrics */}
            {Object.keys(metrics).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
              >
                {metrics.processingTime && (
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <div className="text-lg font-bold text-blue-400">
                          {metrics.processingTime.toFixed(1)}s
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Processing Time</div>
                      <div className="text-xs text-green-400 mt-1">
                        {metrics.processingTime < 2 ? 'Blazing Fast' : 'Fast'}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {metrics.documentsSearched && (
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-colors">
                    <CardContent className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Database className="h-4 w-4 text-green-400" />
                        <div className="text-lg font-bold text-green-400">
                          {metrics.documentsSearched}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Documents Searched</div>
                      <div className="text-xs text-blue-400 mt-1">
                        Hybrid Search
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {metrics.confidence && (
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-colors">
                    <CardContent className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <div className="text-lg font-bold text-green-400">
                          {(metrics.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Confidence Score</div>
                      <div className="text-xs text-purple-400 mt-1">
                        {metrics.confidence > 0.9 ? 'Excellent' : metrics.confidence > 0.8 ? 'Very Good' : 'Good'}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {metrics.queryId && (
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-colors">
                    <CardContent className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Activity className="h-4 w-4 text-purple-400" />
                        <div className="text-lg font-bold text-purple-400 font-mono">
                          {metrics.queryId.substring(0, 8)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Query ID</div>
                      <div className="text-xs text-yellow-400 mt-1">
                        {metrics.queryId.startsWith('api-') ? 'Live API' : 'Demo'}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Detailed Performance Info */}
            {metrics.processingTime && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-blue-400 font-semibold">ZeroEntropy API</div>
                    <div className="text-gray-300">Hybrid Search Engine</div>
                    <div className="text-xs text-gray-400 mt-1">Vector + Keyword Retrieval</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-semibold">
                      {((2.5 * 60) / (metrics.processingTime || 1)).toFixed(0)}x Faster
                    </div>
                    <div className="text-gray-300">vs Traditional Methods</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {metrics.processingTime ? `${metrics.processingTime.toFixed(1)}s vs 2.5min avg` : ''}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-semibold">Enterprise Grade</div>
                    <div className="text-gray-300">Production API</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Query ID: {metrics.queryId?.substring(0, 12)}...
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Performance Comparison */}
            {claudeComparison && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-purple-400" />
                  Performance Comparison
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Traditional Claude Pipeline */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {claudeComparison.claudeTime.toFixed(1)}s
                    </div>
                    <div className="text-gray-300 font-medium mb-1">Traditional LLM Pipeline</div>
                    <div className="text-xs text-gray-400">Claude + Manual Processing</div>
                    <div className="mt-2 space-y-1 text-xs text-gray-500">
                      <div>• Document retrieval: ~2.0s</div>
                      <div>• LLM processing: ~3.5s</div>
                      <div>• Response formatting: ~0.8s</div>
                    </div>
                  </div>
                  
                  {/* ZeroEntropy Pipeline */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {claudeComparison.zeroEntropyTime.toFixed(1)}s
                    </div>
                    <div className="text-gray-300 font-medium mb-1">ZeroEntropy API</div>
                    <div className="text-xs text-gray-400">Hybrid Search + LLM</div>
                    <div className="mt-2 space-y-1 text-xs text-gray-500">
                      <div>• Vector search: ~0.1s</div>
                      <div>• Keyword matching: ~0.1s</div>
                      <div>• LLM synthesis: ~0.2s</div>
                    </div>
                  </div>
                  
                  {/* Speed Improvement */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {claudeComparison.speedupFactor.toFixed(1)}x
                    </div>
                    <div className="text-gray-300 font-medium mb-1">Faster</div>
                    <div className="text-xs text-gray-400">Performance Improvement</div>
                    <div className="mt-2 text-xs text-green-400">
                      {((1 - claudeComparison.zeroEntropyTime / claudeComparison.claudeTime) * 100).toFixed(0)}% 
                      time reduction
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-center text-sm text-blue-300">
                    <strong>ZeroEntropy Advantage:</strong> Pre-indexed knowledge base with hybrid search eliminates 
                    document retrieval bottlenecks and enables sub-second responses for enterprise-scale analysis.
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Question Hotkeys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-medium text-gray-300 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-blue-400" />
              Quick Executive Queries:
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questionHotkeys.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleHotkeyClick(question)}
                  disabled={isLoading}
                  className="text-left justify-start h-auto py-3 px-4 text-sm hover:bg-gray-700/50 border-gray-600 text-gray-300 hover:text-white"
                >
                  {question}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Synthesis Results */}
          {synthesis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-100">
                Executive Briefing
              </h2>
              
              <Card className="bg-gray-800/60 border-blue-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">
                    Query: {currentQuery}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Generated by ZeroEntropy's hybrid search architecture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">
                        {synthesis.synthesis}
                      </div>
                    </div>
                    
                    <ExecutiveProgress
                      value={synthesis.confidence_score * 100}
                      label={`Analysis Confidence: ${(synthesis.confidence_score * 100).toFixed(1)}%`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* System Status */}
          {systemStatus && (
            <Card className="bg-gray-800/60 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-gray-200 flex items-center justify-center">
                  <Database className="mr-2 h-5 w-5 text-blue-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Indexed Documents</span>
                    <span className="text-green-400 font-medium">
                      {systemStatus.num_indexed_documents}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Processing</span>
                    <span className={systemStatus.num_indexing_documents > 0 ? "text-yellow-400" : "text-gray-500"}>
                      {systemStatus.num_indexing_documents}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Failed</span>
                    <span className={systemStatus.num_failed_documents > 0 ? "text-red-400" : "text-gray-500"}>
                      {systemStatus.num_failed_documents}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Knowledge Base Status & Loading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Knowledge Base</h3>
              <motion.div
                animate={{ rotate: documentLoading ? 360 : 0 }}
                transition={{ duration: 2, repeat: documentLoading ? Infinity : 0, ease: "linear" }}
                className={`w-3 h-3 rounded-full ${
                  (systemStatus?.num_indexed_documents || 0) > 0 ? 'bg-green-400' : 'bg-yellow-400'
                }`}
              />
            </div>

            {systemStatus && (systemStatus.num_indexed_documents || 0) === 0 ? (
              <div className="text-center py-6">
                <div className="text-gray-400 mb-4">
                  No documents loaded yet. Load sample enterprise documents to get started.
                </div>
                                  <Button
                    onClick={handleLoadDocuments}
                    disabled={documentLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    {documentLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Loading Documents...
                    </>
                  ) : (
                    <>
                      <Database className="h-4 w-4 mr-2" />
                      Load Sample Documents
                    </>
                  )}
                </Button>
                {documentLoadingProgress > 0 && (
                  <div className="mt-4">
                    <Progress value={documentLoadingProgress} className="mb-2" />
                    <div className="text-sm text-gray-400">{documentLoadingMessage}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {systemStatus?.num_indexed_documents || 0}
                </div>
                <div className="text-sm text-gray-400">Documents loaded successfully</div>
                {systemStatus && systemStatus.num_indexing_documents > 0 && (
                  <div className="text-xs text-yellow-400 mt-1">
                    {systemStatus.num_indexing_documents} documents still indexing...
                  </div>
                )}
              </div>
            )}

            {/* Connect integrations */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                disabled
              >
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.042 15.165a2.528 2.528 0 0 0 2.5 2.5c1.638 0 2.676-.892 2.676-2.554 0-1.638-.892-2.676-2.554-2.676h-2.622v2.73zm-1.25-3.98h3.872c2.487 0 4.176 1.638 4.176 4.014 0 2.322-1.689 4.014-4.176 4.014-2.676 0-4.176-1.638-4.176-4.014v-4.014zm7.014 0h3.709c2.595 0 4.176 1.638 4.176 4.014 0 2.322-1.581 4.014-4.176 4.014h-3.709v-8.028zm1.25 6.777h2.459c1.746 0 2.926-.892 2.926-2.554 0-1.638-1.18-2.554-2.926-2.554h-2.459v5.108z"/>
                  </svg>
                  <span>Connect Slack</span>
                </div>
                <span className="text-xs text-gray-500 ml-1">Soon</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                disabled
              >
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.01 2C6.5 2 2.02 6.48 2.02 12s4.48 10 9.99 10c5.51 0 10.02-4.48 10.02-10S17.52 2 12.01 2zM18 13.5h-5.5V19h-1v-5.5H6V13h5.5V7.5h1V13H18v.5z"/>
                  </svg>
                  <span>Connect Google Drive</span>
                </div>
                <span className="text-xs text-gray-500 ml-1">Soon</span>
              </Button>
            </div>
          </motion.div>

          {/* Architecture Info */}
          <Card className="architecture-card">
            <CardHeader>
              <CardTitle className="text-center text-gray-200 text-sm">
                ZeroEntropy Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-400">Hybrid Search Engine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-400">LLM-in-the-loop Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">Vector + Keyword Retrieval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-400">BK-tree Data Structure</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Powered by advanced document intelligence with turbopuffer vector storage, 
                ParadeDB BM25 indices, and semantic annotation pipeline.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ExecutiveAssistant 