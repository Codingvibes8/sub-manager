export type CsvSubscription = {
  name: string
  price: number
  category: string
  renewalDate: string
  status: string
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        current += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ",") {
        result.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
  }
  result.push(current.trim())
  return result
}

export function parseSubscriptionsCsv(csvContent: string): CsvSubscription[] {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim())
  if (lines.length < 2) return []

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim())

  const nameIdx = headers.findIndex((h) => h === "name" || h === "subscription" || h === "service")
  const priceIdx = headers.findIndex((h) => h === "price" || h === "cost" || h === "amount")
  const categoryIdx = headers.findIndex((h) => h === "category" || h === "type")
  const dateIdx = headers.findIndex(
    (h) => h === "renewal_date" || h === "renewal" || h === "next_renewal" || h === "date"
  )
  const statusIdx = headers.findIndex((h) => h === "status")

  if (nameIdx === -1 || priceIdx === -1) {
    throw new Error("CSV must have at least 'Name' and 'Price' columns")
  }

  const subscriptions: CsvSubscription[] = []

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const name = cols[nameIdx]?.trim()
    const priceStr = cols[priceIdx]?.trim()

    if (!name || !priceStr) continue

    const price = parseFloat(priceStr.replace(/[$,]/g, ""))
    if (isNaN(price)) continue

    const category = categoryIdx >= 0 ? cols[categoryIdx]?.trim() || "Other" : "Other"
    const renewalDate =
      dateIdx >= 0 && cols[dateIdx]?.trim()
        ? cols[dateIdx].trim()
        : (() => {
            const d = new Date()
            d.setDate(d.getDate() + 30)
            return d.toISOString().split("T")[0]
          })()
    const status = statusIdx >= 0 ? cols[statusIdx]?.trim() || "active" : "active"

    subscriptions.push({ name, price, category, renewalDate, status })
  }

  return subscriptions
}
