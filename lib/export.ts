import type { Subscription } from "@/components/subscriptions-provider"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function generateCsv(subscriptions: Subscription[]): string {
  const headers = ["Name", "Status", "Category", "Price", "Next Renewal"]
  const rows = subscriptions.map((sub) => [
    escapeCsv(sub.name),
    sub.status,
    sub.category,
    sub.price.toFixed(2),
    sub.renewalDate,
  ])

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
  return csvContent
}

export function downloadCsv(subscriptions: Subscription[], filename = "subscriptions.csv") {
  const csv = generateCsv(subscriptions)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function generatePdfReport(subscriptions: Subscription[]) {
  const total = subscriptions.reduce((sum, s) => sum + s.price, 0)
  const active = subscriptions.filter((s) => s.status === "active")
  const activeTotal = active.reduce((sum, s) => sum + s.price, 0)

  const categoryMap = new Map<string, number>()
  for (const sub of subscriptions) {
    const cat = sub.category || "Uncategorized"
    categoryMap.set(cat, (categoryMap.get(cat) ?? 0) + sub.price)
  }
  const categories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1])

  const now = new Date()
  const reportDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>SubManager Spend Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1a1a1a; }
    .header { border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { font-size: 28px; color: #10b981; }
    .header p { color: #666; margin-top: 5px; }
    .summary { display: flex; gap: 30px; margin-bottom: 30px; }
    .summary-card { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
    .summary-card .label { font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .summary-card .value { font-size: 24px; font-weight: 700; margin-top: 5px; }
    .section { margin-bottom: 30px; }
    .section h2 { font-size: 18px; margin-bottom: 15px; color: #334155; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    th { background: #f1f5f9; font-weight: 600; color: #475569; }
    .text-right { text-align: right; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge-active { background: #d1fae5; color: #065f46; }
    .badge-canceled { background: #f1f5f9; color: #64748b; }
    .badge-past_due { background: #fef2f2; color: #991b1b; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>SubManager Spend Report</h1>
    <p>Generated on ${reportDate}</p>
  </div>

  <div class="summary">
    <div class="summary-card">
      <div class="label">Total Monthly Spend</div>
      <div class="value">${formatCurrency(total)}</div>
    </div>
    <div class="summary-card">
      <div class="label">Active Subscriptions</div>
      <div class="value">${active.length}</div>
    </div>
    <div class="summary-card">
      <div class="label">Active Monthly Spend</div>
      <div class="value">${formatCurrency(activeTotal)}</div>
    </div>
  </div>

  <div class="section">
    <h2>Category Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th class="text-right">Monthly Spend</th>
          <th class="text-right">% of Total</th>
        </tr>
      </thead>
      <tbody>
        ${categories.map(([cat, amount]) => `
          <tr>
            <td>${cat}</td>
            <td class="text-right">${formatCurrency(amount)}</td>
            <td class="text-right">${total > 0 ? ((amount / total) * 100).toFixed(1) : 0}%</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>All Subscriptions</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Category</th>
          <th class="text-right">Price</th>
          <th>Next Renewal</th>
        </tr>
      </thead>
      <tbody>
        ${subscriptions.map((sub) => `
          <tr>
            <td>${sub.name}</td>
            <td><span class="badge badge-${sub.status}">${sub.status}</span></td>
            <td>${sub.category}</td>
            <td class="text-right">${formatCurrency(sub.price)}</td>
            <td>${formatDate(sub.renewalDate)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>

  <div class="footer">
    Generated by SubManager — submanager.app
  </div>

  <script>window.onload = function() { window.print(); }</script>
</body>
</html>
  `.trim()

  const win = window.open("", "_blank")
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
