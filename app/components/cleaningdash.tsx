'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import axios from "axios"

interface CleaningRecord {
  id: string
  name: string
  time: string
  roomNo: string
  email: string
  completed: boolean
}

interface CleaningDashboardProps {
  initialRecords: CleaningRecord[]
}

export default function CleaningDashboard({ initialRecords }: CleaningDashboardProps) {
  const [records, setRecords] = useState<CleaningRecord[]>(initialRecords)

  const toggleCompleted = async (email: string) => {
    // Update state optimistically
    setRecords(records.map(record =>
      record.email === email ? { ...record, completed: !record.completed } : record
    ))
  
    try {
      await axios.post("https://cleanit-backs.onrender.com/api/status", {
        
        email, // Use email to identify the user
        status: "completed", // Update status
        
      })
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }
  
   

  return (
    <div className="container mx-auto p-6">
      <Card className="border-[#87CEEB] border-2">
        <CardHeader className="bg-[#87CEEB]/20">
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Cleaning Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
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
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium text-black">{record.name}</TableCell>
                  <TableCell className="text-black">{record.time}</TableCell>
                  <TableCell className="text-black">{record.roomNo}</TableCell>
                  <TableCell className="text-black">{record.email}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={record.completed}
                      onCheckedChange={() => toggleCompleted(record.email)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-black">No cleaning requests at the moment.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

