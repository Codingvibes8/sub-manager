"use client"

import { FileText, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSubscriptions } from "@/components/subscriptions-provider"
import { downloadCsv, generatePdfReport } from "@/lib/export"
import { toast } from "sonner"

export function ExportButtons() {
  const { subscriptions } = useSubscriptions()

  const handleCsvExport = () => {
    if (subscriptions.length === 0) {
      toast.error("No subscriptions to export")
      return
    }
    downloadCsv(subscriptions)
    toast.success(`Exported ${subscriptions.length} subscriptions to CSV`)
  }

  const handlePdfExport = () => {
    if (subscriptions.length === 0) {
      toast.error("No subscriptions to export")
      return
    }
    generatePdfReport(subscriptions)
    toast.success("PDF report generated")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export Data</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCsvExport}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePdfExport}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
