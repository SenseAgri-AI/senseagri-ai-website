import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  province?: string;
  farmType?: string;
  birdCount?: string;
  message?: string;
};

// Escape user input before placing it inside the HTML email body.
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!data.name || !data.company || !data.email || !data.message) {
    return NextResponse.json({ ok: false, error: "Missing fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact enquiry.");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone || "—"],
    ["Province", data.province || "—"],
    ["Farm type", data.farmType || "—"],
    ["Bird count", data.birdCount || "—"]
  ];

  const detailRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6B7C80;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(
          label
        )}</td><td style="padding:6px 0;color:#191C1D;font-size:14px;font-weight:600;">${esc(
          value
        )}</td></tr>`
    )
    .join("");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#002E35;padding:18px 22px;">
      <div style="color:#D4AF37;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
        New pilot enquiry
      </div>
      <div style="color:#ffffff;font-size:18px;font-weight:700;margin-top:4px;">
        ${esc(data.name)} · ${esc(data.company)}
      </div>
    </div>
    <div style="border:0.5px solid #BEC8CA;border-top:none;padding:20px 22px;">
      <table style="border-collapse:collapse;width:100%;">${detailRows}</table>
      <div style="margin-top:16px;padding-top:16px;border-top:0.5px solid #BEC8CA;">
        <div style="color:#6B7C80;font-size:13px;margin-bottom:6px;">Message</div>
        <div style="color:#191C1D;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(
          data.message
        )}</div>
      </div>
    </div>
    <div style="color:#6B7C80;font-size:12px;padding:14px 22px;">
      Sent from the SenseAgri AI website contact form.
    </div>
  </div>`;

  // Where the enquiry is delivered. Falls back to the public contact address,
  // but until a domain is verified in Resend this must be the Resend account email.
  const recipient = process.env.CONTACT_FORM_TO || siteConfig.links.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "SenseAgri AI Website <onboarding@resend.dev>",
        to: [recipient],
        reply_to: data.email,
        subject: `Pilot enquiry — ${data.name} (${data.company})`,
        html
      })
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend send failed:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "Could not send your enquiry. Please email us directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your enquiry. Please email us directly." },
      { status: 502 }
    );
  }
}
