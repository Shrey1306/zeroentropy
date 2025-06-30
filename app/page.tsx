'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExecutiveAssistant from '@/components/ExecutiveAssistant'
import EfficiencyAnalysis from '@/components/EfficiencyAnalysis'
import FloatingElements from '@/components/FloatingElements'
import { zeroEntropyClient, type SynthesisResult } from 'lib/zeroentropy'

export default function Home() {
  const [documentsLoaded, setDocumentsLoaded] = useState(false)
  const [synthesisResult, setSynthesisResult] = useState<SynthesisResult | undefined>()
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleQuerySubmit = async (query: string) => {
    if (!documentsLoaded) return
    
    setIsProcessing(true)
    setCurrentQuery(query)
    
    try {
      const result = await zeroEntropyClient.synthesize(query, (message) => {
        // Progress is handled in ExecutiveAssistant component
        console.log('Query progress:', message)
      })
      setSynthesisResult(result)
    } catch (error) {
      console.error('Error synthesizing query:', error)
      // Error handling is done in ExecutiveAssistant component
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen relative bg-gray-900">
      <FloatingElements />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Tabs defaultValue="assistant" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700">
              <TabsTrigger 
                value="assistant" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Executive Assistant
              </TabsTrigger>
              <TabsTrigger 
                value="analysis"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Architecture Analysis
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="assistant" className="mt-0">
            <ExecutiveAssistant
              documentsLoaded={documentsLoaded}
              setDocumentsLoaded={setDocumentsLoaded}
              onQuerySubmit={handleQuerySubmit}
              synthesisResult={synthesisResult}
              currentQuery={currentQuery}
            />
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <EfficiencyAnalysis />
          </TabsContent>
        </Tabs>
      </div>

      {/* Processing overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800/90 border border-blue-500/40 rounded-lg p-8 text-center max-w-md mx-4">
            <div className="loading-shimmer rounded-full h-12 w-12 mx-auto mb-4"></div>
            <p className="text-gray-200 text-lg font-medium">
              Processing strategic query...
            </p>
            <p className="text-gray-400 text-sm mt-2">
              ZeroEntropy is analyzing your organizational data
            </p>
          </div>
        </div>
      )}
    </main>
  )
} 