import { Resend } from "resend"

const getResend = () => {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured")
  }
  return new Resend(key)
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "SubManager <hello@submanager.app>"

export async function sendRenewalReminderEmail({
  to,
  subscriptionName,
  renewalDate,
  daysUntil,
  price,
  category,
}: {
  to: string
  subscriptionName: string
  renewalDate: string
  daysUntil: number
  price: number
  category: string
}) {
  const formattedDate = new Date(renewalDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const urgency =
    daysUntil <= 1
      ? "urgent"
      : daysUntil <= 3
        ? "warning"
        : "info"

  const urgencyColor =
    urgency === "urgent" ? "#dc2626" : urgency === "warning" ? "#f59e0b" : "#10b981"

  const urgencyLabel =
    urgency === "urgent"
      ? "Renews tomorrow!"
      : urgency === "warning"
        ? `Renews in ${daysUntil} days`
        : `Renews in ${daysUntil} days`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renewal Reminder</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background-color:#10b981;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">SubManager</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:32px;">
              <div style="background-color:${urgencyColor}15;border-left:4px solid ${urgencyColor};padding:12px 16px;margin-bottom:24px;border-radius:4px;">
                <p style="margin:0;color:${urgencyColor};font-weight:600;font-size:14px;">${urgencyLabel}</p>
              </div>
              <h2 style="margin:0 0 8px;color:#1e293b;font-size:24px;font-weight:700;">${subscriptionName}</h2>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;">${category}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="color:#64748b;font-size:13px;">Renewal date</span>
                  </td>
                  <td align="right" style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="color:#1e293b;font-size:14px;font-weight:600;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="color:#64748b;font-size:13px;">Monthly price</span>
                  </td>
                  <td align="right" style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                    <span style="color:#1e293b;font-size:14px;font-weight:600;">$${price.toFixed(2)}/mo</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="color:#64748b;font-size:13px;">Days until renewal</span>
                  </td>
                  <td align="right" style="padding:12px 0;">
                    <span style="color:#1e293b;font-size:14px;font-weight:600;">${daysUntil} day${daysUntil !== 1 ? "s" : ""}</span>
                  </td>
                </tr>
              </table>
              <a href="${APP_URL}/dashboard/subscriptions" style="display:inline-block;background-color:#10b981;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
                View in Dashboard
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">
                You're receiving this email because you enabled renewal reminders in SubManager.
              </p>
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                <a href="${APP_URL}/dashboard/settings?tab=notifications" style="color:#64748b;text-decoration:underline;">Manage notification preferences</a>
                &middot;
                <a href="${APP_URL}/privacy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const { data, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Renewal Reminder: ${subscriptionName} renews ${daysUntil <= 1 ? "tomorrow" : `in ${daysUntil} days`}`,
    html,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SubManager</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background-color:#10b981;padding:24px 32px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">Welcome to SubManager</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;color:#1e293b;font-size:22px;font-weight:700;">Hi ${name || "there"}!</h2>
              <p style="margin:0 0 16px;color:#64748b;font-size:14px;line-height:1.6;">
                Thanks for signing up. SubManager helps you track every SaaS subscription, catch renewals before they hit, and cut the tools nobody uses.
              </p>
              <p style="margin:0 0 24px;color:#64748b;font-size:14px;line-height:1.6;">
                Get started by adding your first subscription — it takes less than 30 seconds.
              </p>
              <a href="${APP_URL}/dashboard" style="display:inline-block;background-color:#10b981;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
                Go to Dashboard
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                <a href="${APP_URL}/privacy" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
                &middot;
                <a href="${APP_URL}/terms" style="color:#64748b;text-decoration:underline;">Terms of Service</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const { data, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Welcome to SubManager",
    html,
  })

  if (error) {
    throw new Error(`Failed to send welcome email: ${error.message}`)
  }

  return data
}
