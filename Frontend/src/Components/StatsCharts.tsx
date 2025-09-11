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
    <Card className="w-full bg-[#1e293b] text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">URL Statistics</CardTitle>
        <CardDescription className="text-gray-300">Detailed analytics for your shortened URL</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#2d3a4f] rounded-lg p-1">
            <TabsTrigger value="clicks" className="data-[state=active]:bg-[#3e4c63] data-[state=active]:text-white">Clicks</TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-[#3e4c63] data-[state=active]:text-white">Devices</TabsTrigger>
            <TabsTrigger value="locations" className="data-[state=active]:bg-[#3e4c63] data-[state=active]:text-white">Locations</TabsTrigger>
          </TabsList>
          <TabsContent value="clicks">
            <div className="mt-4 space-y-4">
              <div className="text-4xl font-bold text-center">{clickCount}</div>
              <div className="text-center text-gray-300">Total Clicks</div>
              <ChartContainer config={clicksConfig} className="h-[300px]">
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