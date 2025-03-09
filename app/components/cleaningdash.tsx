'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import axios from "axios"

interface RequestRecord {
  id: string
  name: string
  time: string
  roomNo: string
  email: string
  completed: boolean
  requestType: "Cleaning" | "Maintenance"
}

interface CleaningDashboardProps {
  initialCleaningRecords: RequestRecord[]
  initialMaintenanceRecords: RequestRecord[]
}

export default function CleaningDashboard({ 
  initialCleaningRecords, 
  initialMaintenanceRecords 
}: CleaningDashboardProps) {
  const [cleaningRecords, setCleaningRecords] = useState<RequestRecord[]>(initialCleaningRecords)
  const [maintenanceRecords, setMaintenanceRecords] = useState<RequestRecord[]>(initialMaintenanceRecords)
  const [activeTab, setActiveTab] = useState<string>("cleaning")

  const toggleCompleted = async (email: string, requestType: "Cleaning" | "Maintenance") => {
    if (requestType === "Cleaning") {
      // Update cleaning records
      setCleaningRecords(cleaningRecords.map(record =>
        record.email === email ? { ...record, completed: !record.completed } : record
      ))
    } else {
      // Update maintenance records
      setMaintenanceRecords(maintenanceRecords.map(record =>
        record.email === email ? { ...record, completed: !record.completed } : record
      ))
    }
  
    try {
      await axios.post("https://cleanit-backs.onrender.com/api/status", {
        email, // Use email to identify the user
        status: "completed", // Update status
        requestType // Include request type
      })
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }
  
  const currentRecords = activeTab === "cleaning" ? cleaningRecords : maintenanceRecords
  const dashboardTitle = activeTab === "cleaning" ? "Cleaning Dashboard" : "Maintenance Dashboard"

  return (
    <div className="container mx-auto p-6">
      <Card className="border-[#87CEEB] border-2">
        <CardHeader className="bg-[#87CEEB]/20">
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            {dashboardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="cleaning" className="flex-1">Cleaning Requests</TabsTrigger>
              <TabsTrigger value="maintenance" className="flex-1">Maintenance Requests</TabsTrigger>
            </TabsList>
          </Tabs>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-[#87CEEB]/20 text-black font-semibold">
                  NAME
                </TableHead>
                <TableHead className="bg-[#87CEEB]/20 text-black font-semibold">
                  TIME
                </TableHead>
                <TableHead className="bg-[#87CEEB]/20 text-black font-semibold">
                  ROOM NO.
                </TableHead>
                <TableHead className="bg-[#87CEEB]/20 text-black font-semibold">
                  EMAIL
                </TableHead>
                <TableHead className="bg-[#87CEEB]/20 text-black font-semibold">
                  COMPLETED
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium text-black">{record.name}</TableCell>
                  <TableCell className="text-black">{record.time}</TableCell>
                  <TableCell className="text-black">{record.roomNo}</TableCell>
                  <TableCell className="text-black">{record.email}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={record.completed}
                      onCheckedChange={() => toggleCompleted(record.email, record.requestType)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {currentRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-black">
                    No {activeTab === "cleaning" ? "cleaning" : "maintenance"} requests at the moment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

