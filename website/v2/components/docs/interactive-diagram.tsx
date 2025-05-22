"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { AnimatedSection } from "@/components/ui/animated-section"
import { motion } from "framer-motion"

interface DiagramNode {
  id: string
  label: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  x: number
  y: number
  color: string
  connections: string[]
}

interface InteractiveDiagramProps {
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  nodes: DiagramNode[]
}

export function InteractiveDiagram({ title, description, nodes }: InteractiveDiagramProps) {
  const { language } = useLanguage()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const c = {
    en: {
      clickNode: "Click on a component to learn more",
    },
    pt: {
      clickNode: "Clique em um componente para saber mais",
    },
  }[language]

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId)
  }

  const getConnectionPath = (from: DiagramNode, to: DiagramNode) => {
    const fromX = from.x + 50
    const fromY = from.y + 30
    const toX = to.x + 50
    const toY = to.y + 30

    // Calculate control points for a curved line
    const dx = toX - fromX
    const dy = toY - fromY
    const controlX = fromX + dx / 2
    const controlY = fromY + dy / 2

    return `M${fromX},${fromY} Q${controlX},${controlY} ${toX},${toY}`
  }

  const isHighlighted = (nodeId: string) => {
    if (!selectedNode && !hoveredNode) return true
    if (selectedNode === nodeId) return true
    if (hoveredNode === nodeId) return true

    const selectedNodeObj = nodes.find((n) => n.id === selectedNode)
    if (selectedNodeObj && selectedNodeObj.connections.includes(nodeId)) return true

    const hoveredNodeObj = nodes.find((n) => n.id === hoveredNode)
    if (hoveredNodeObj && hoveredNodeObj.connections.includes(nodeId)) return true

    return false
  }

  const isConnectionHighlighted = (fromId: string, toId: string) => {
    if (!selectedNode && !hoveredNode) return true
    if (selectedNode === fromId || selectedNode === toId) return true
    if (hoveredNode === fromId || hoveredNode === toId) return true
    return false
  }

  return (
    <AnimatedSection animation="fadeIn" className="my-8">
      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader>
          <CardTitle>{title[language]}</CardTitle>
          <CardDescription>{description[language]}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[500px] bg-gray-950 rounded-md border border-gray-800 overflow-hidden">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {nodes.map((fromNode) =>
                fromNode.connections.map((toId) => {
                  const toNode = nodes.find((n) => n.id === toId)
                  if (!toNode) return null

                  const isHighlighted = isConnectionHighlighted(fromNode.id, toId)

                  return (
                    <path
                      key={`${fromNode.id}-${toId}`}
                      d={getConnectionPath(fromNode, toNode)}
                      stroke={isHighlighted ? "#a855f7" : "#3f3f46"}
                      strokeWidth={isHighlighted ? 2 : 1}
                      fill="none"
                      strokeDasharray={isHighlighted ? "none" : "4,4"}
                      className="transition-all duration-300"
                    />
                  )
                }),
              )}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHighlighted(node.id) ? 1 : 0.5,
                  scale: isHighlighted(node.id) ? 1 : 0.9,
                  x: node.x,
                  y: node.y,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute w-[100px] h-[60px] rounded-md flex items-center justify-center text-center p-2 cursor-pointer transition-all duration-300 border-2 ${
                  selectedNode === node.id || hoveredNode === node.id
                    ? `border-${node.color}-500 shadow-lg shadow-${node.color}-500/20`
                    : `border-${node.color}-700`
                }`}
                style={{
                  backgroundColor: `rgb(var(--${node.color}-900))`,
                  borderColor:
                    selectedNode === node.id || hoveredNode === node.id
                      ? `rgb(var(--${node.color}-500))`
                      : `rgb(var(--${node.color}-700))`,
                  boxShadow:
                    selectedNode === node.id || hoveredNode === node.id
                      ? `0 4px 20px -2px rgb(var(--${node.color}-500) / 0.2)`
                      : "none",
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <span className="text-sm font-medium text-white">{node.label[language]}</span>
              </motion.div>
            ))}

            {/* Description panel */}
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm p-4 border-t border-gray-800"
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  {nodes.find((n) => n.id === selectedNode)?.label[language]}
                </h3>
                <p className="text-gray-300">{nodes.find((n) => n.id === selectedNode)?.description[language]}</p>
              </motion.div>
            )}

            {!selectedNode && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">{c.clickNode}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}
