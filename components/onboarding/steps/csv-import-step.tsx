"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle2 } from "lucide-react"
import { useSubscriptions } from "@/components/subscriptions-provider"
import { parseSubscriptionsCsv } from "@/lib/csv-import"
import { toast } from "sonner"

type CsvImportStepProps = {
  onNext: () => void
  onBack: () => void
  onSkip: () => void
}

export function CsvImportStep({ onNext, onBack, onSkip }: CsvImportStepProps) {
  const { addSubscription } = useSubscriptions()
  const [isImporting, setIsImporting] = useState(false)
  const [importedCount, setImportedCount] = useState<number | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file")
      return
    }

    setIsImporting(true)
    try {
      const text = await file.text()
      const subscriptions = parseSubscriptionsCsv(text)

      if (subscriptions.length === 0) {
        toast.error("No valid subscriptions found in CSV")
        setIsImporting(false)
        return
      }

      for (const sub of subscriptions) {
        await addSubscription({
          name: sub.name,
          price: sub.price,
          status: sub.status as "active" | "canceled" | "past_due",
          category: sub.category,
          renewalDate: sub.renewalDate,
        })
      }

      setImportedCount(subscriptions.length)
      toast.success(`Imported ${subscriptions.length} subscription${subscriptions.length !== 1 ? "s" : ""}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to import CSV")
    } finally {
      setIsImporting(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  if (importedCount !== null) {
    return (
      <div className="space-y-5 text-center py-8">
        <div className="flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>
        <div>
          <p className="text-lg font-semibold">Imported {importedCount} subscription{importedCount !== 1 ? "s" : ""}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your subscriptions have been added to your dashboard.
          </p>
        </div>
        <Button onClick={onNext} className="btn-gradient glow-hover rounded-full px-6">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Have a spreadsheet of subscriptions? Import them all at once.
        </p>
        <p className="text-xs text-muted-foreground">
          CSV format: Name, Price, Category, Renewal Date (optional), Status (optional)
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          dragActive
            ? "border-emerald-500 bg-emerald-500/5"
            : "border-border/50 hover:border-emerald-500/30 hover:bg-accent/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          {isImporting ? (
            <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-medium">
              {isImporting ? "Importing..." : "Drop your CSV here or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports .csv files with Name and Price columns
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted/50 p-4">
        <div className="flex items-start gap-3">
          <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Expected CSV format:</p>
            <code className="block bg-background/50 p-2 rounded text-[11px]">
              Name,Price,Category,Renewal Date<br />
              Netflix,15.99,Entertainment,2025-01-15<br />
              Spotify,9.99,Music,2025-02-01
            </code>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onSkip} className="text-muted-foreground">
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}
