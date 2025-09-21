"use client"

import { useState } from 'react'
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { ChartContainer, ChartTooltipContent } from "@/Components/ui/chart"

// Helper function to count occurrences
const countOccurrences = (arr: string[]) => arr.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {} as Record<string, number>)

interface StatsChartsProps {
  clickCount: number;
  locations: string[];
  devices: string[];
}

export function StatsCharts({ clickCount, locations, devices }: StatsChartsProps) {
  const [activeTab, setActiveTab] = useState("clicks")

  // Process data for charts
  const deviceData = Object.entries(countOccurrences(devices)).map(([name, value]) => ({ name, value }))
  const locationData = Object.entries(countOccurrences(locations))
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value) // Sort locations by click count in descending order

  // Generate dummy data for click trends (assuming 7 days of data)
  const clickTrendData = Array.from({ length: 6 }, (_, i) => {
    // Generate a plausible, increasing number of clicks for the first 6 days
    const dayMultiplier = (i + 1) / 7;
    const randomFactor = (Math.random() - 0.2) * 0.5 + 1; // Introduce slight variance
    return {
      day: `Day ${i + 1}`,
      clicks: Math.floor(clickCount * dayMultiplier * randomFactor)
    };
  });

  // Add the final, accurate click count for the last day
  clickTrendData.push({
    day: 'Today',
    clicks: clickCount
  });

  // Chart configurations
  const clicksConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--chart-1))",
    },
  }

  const devicesConfig = deviceData.reduce((acc, { name }, index) => {
    acc[name.toLowerCase()] = {
      label: name,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  const locationsConfig = locationData.reduce((acc, { name }, index) => {
    acc[name.toLowerCase()] = {
      label: name,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  return (
    <Card className="w-full bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 text-white shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          URL Statistics
        </CardTitle>
        <CardDescription className="text-slate-400">
          Detailed analytics for your shortened URL
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/30 rounded-xl p-1 text-xs md:text-sm">
            <TabsTrigger value="clicks" className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
              <span className="hidden sm:inline">Click Trends</span>
              <span className="sm:hidden">Clicks</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
              Devices
            </TabsTrigger>
            <TabsTrigger value="locations" className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all duration-300">
              <span className="hidden sm:inline">Locations</span>
              <span className="sm:hidden">Places</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="clicks" className="mt-4 md:mt-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {clickCount}
                </div>
                <div className="text-slate-400 text-sm md:text-base font-medium mt-1">Total Clicks</div>
              </div>
              <ChartContainer config={clicksConfig} className="h-[250px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clickTrendData}>
                    <Line type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2} />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} stroke="#a1a1aa" />
                    <Tooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="text-center text-gray-300">Click Trend (Last 7 Days)</div>
            </div>
          </TabsContent>
          <TabsContent value="devices">
            <div className="mt-4 space-y-4">
              <ChartContainer config={devicesConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#14c24eff"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.toLowerCase()})`} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-4">
                {deviceData.map((entry, index) => (
                  <Card key={index} className="bg-[#2d3a4f] p-4">
                    <CardTitle className="text-lg text-white">{entry.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-white">{entry.value}</CardDescription>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="locations">
            <div className="mt-4 space-y-4">
              <ChartContainer config={locationsConfig} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} layout="vertical" margin={{ left: 100 }}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Bar dataKey="value">
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.toLowerCase()})`} />
                      ))}
                    </Bar>
                    <Tooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-4">
                {locationData.slice(0, 4).map((entry, index) => (
                  <Card key={index} className="bg-[#2d3a4f] p-4">
                    <CardTitle className="text-lg text-white">{entry.name}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-white">{entry.value}</CardDescription>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}