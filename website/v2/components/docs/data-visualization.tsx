"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { AnimatedSection } from "@/components/ui/animated-section"
import { BarChart, LineChart, PieChart, Activity, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface DataVisualizationProps {
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  endpoint: string
  refreshInterval?: number
}

export function DataVisualization({ title, description, endpoint, refreshInterval = 0 }: DataVisualizationProps) {
  const { language } = useLanguage()
  const [data, setData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar")

  const content = {
    en: {
      loading: "Loading data...",
      error: "Error loading data",
      refresh: "Refresh Data",
      barChart: "Bar Chart",
      lineChart: "Line Chart",
      pieChart: "Pie Chart",
      noData: "No data available",
    },
    pt: {
      loading: "Carregando dados...",
      error: "Erro ao carregar dados",
      refresh: "Atualizar Dados",
      barChart: "Gráfico de Barras",
      lineChart: "Gráfico de Linha",
      pieChart: "Gráfico de Pizza",
      noData: "Nenhum dado disponível",
    },
  }

  const c = content[language]

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const result = await response.json()
      setData(result.data || [])
    } catch (err: any) {
      console.error("Failed to fetch data:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [endpoint, refreshInterval])

  const getMaxValue = () => {
    if (data.length === 0) return 100
    return Math.max(...data.map((d) => d.value)) * 1.2
  }

  const renderBarChart = () => {
    const maxValue = getMaxValue()
    const barWidth = 100 / (data.length * 2)

    return (
      <div className="w-full h-[300px] flex flex-col">
        <div className="flex-1 flex items-end relative">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end h-full"
              style={{ width: `${barWidth * 2}%` }}
            >
              <div
                className="w-[80%] rounded-t-md relative group"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || `hsl(${(index * 360) / data.length}, 70%, 60%)`,
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                </div>
              </div>
              <div className="text-xs mt-2 text-gray-400 truncate w-full text-center">{item.label}</div>
            </div>
          ))}
          {/* Y-axis lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-0 border-t border-gray-800 relative">
                <span className="absolute -top-2 -left-8 text-xs text-gray-500">
                  {Math.round((maxValue * (4 - i)) / 4)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderLineChart = () => {
    if (data.length < 2) return <div className="h-[300px] flex items-center justify-center">{c.noData}</div>

    const maxValue = getMaxValue()
    const points = data
      .map((item, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (item.value / maxValue) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="w-full h-[300px] relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 25}
              x2="100"
              y2={i * 25}
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}
          {/* Line chart */}
          <polyline
            points={points}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - (item.value / maxValue) * 100
            return (
              <g key={index} className="group">
                <circle cx={x} cy={y} r="2" fill="#a855f7" />
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#d1d5db"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {item.value}
                </text>
              </g>
            )
          })}
        </svg>
        {/* X-axis labels */}
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <div key={index} className="text-xs text-gray-400 truncate" style={{ width: `${100 / data.length}%` }}>
              {item.label}
            </div>
          ))}
        </div>
        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="text-xs text-gray-500 -ml-8">
              {Math.round((maxValue * (4 - i)) / 4)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let cumulativePercent = 0

    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="relative w-[200px] h-[200px]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, index) => {
              const percent = (item.value / total) * 100
              const startPercent = cumulativePercent
              cumulativePercent += percent

              // Calculate the coordinates on the circle
              const startX = 50 + 50 * Math.cos(2 * Math.PI * (startPercent / 100))
              const startY = 50 + 50 * Math.sin(2 * Math.PI * (startPercent / 100))
              const endX = 50 + 50 * Math.cos(2 * Math.PI * (cumulativePercent / 100))
              const endY = 50 + 50 * Math.sin(2 * Math.PI * (cumulativePercent / 100))

              // Create the arc path
              const largeArcFlag = percent > 50 ? 1 : 0
              const pathData = [
                `M 50 50`,
                `L ${startX} ${startY}`,
                `A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `Z`,
              ].join(" ")

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color || `hsl(${(index * 360) / data.length}, 70%, 60%)`}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                  data-tip={`${item.label}: ${item.value} (${percent.toFixed(1)}%)`}
                />
              )
            })}
            <circle cx="50" cy="50" r="25" fill="#111827" />
          </svg>
        </div>
        <div className="ml-8 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color || `hsl(${(index * 360) / data.length}, 70%, 60%)` }}
              ></div>
              <div className="text-sm text-gray-300">
                {item.label} ({((item.value / total) * 100).toFixed(1)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <AnimatedSection animation="fadeIn" className="my-8">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-purple-400" />
                {title[language]}
              </CardTitle>
              <CardDescription>{description[language]}</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {c.refresh}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={chartType} onValueChange={(value) => setChartType(value as any)} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="bar" className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                {c.barChart}
              </TabsTrigger>
              <TabsTrigger value="line" className="flex items-center">
                <LineChart className="mr-2 h-4 w-4" />
                {c.lineChart}
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center">
                <PieChart className="mr-2 h-4 w-4" />
                {c.pieChart}
              </TabsTrigger>
            </TabsList>

            <div className="border border-gray-800 rounded-md bg-gray-950 p-4">
              {loading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <RefreshCw className="h-6 w-6 text-purple-400 animate-spin mr-2" />
                  <span>{c.loading}</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-[300px] text-red-400">
                  <span>
                    {c.error}: {error}
                  </span>
                </div>
              ) : data.length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                  <span>{c.noData}</span>
                </div>
              ) : (
                <>
                  <TabsContent value="bar" className="mt-0">
                    {renderBarChart()}
                  </TabsContent>
                  <TabsContent value="line" className="mt-0">
                    {renderLineChart()}
                  </TabsContent>
                  <TabsContent value="pie" className="mt-0">
                    {renderPieChart()}
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
