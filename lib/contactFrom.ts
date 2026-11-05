/** Sender on the SenseAgri domain. Resend only delivers this after the domain is verified. */
export const DEFAULT_CONTACT_FROM = "SenseAgri AI Website <website@senseagriai.com>";

export function contactFromAddress(env: NodeJS.ProcessEnv = process.env): string {
  const configured = env.CONTACT_FORM_FROM?.trim();
  return configured || DEFAULT_CONTACT_FROM;
}

export function isResendSandboxFrom(from: string): boolean {
  return from.toLowerCase().includes("@resend.dev");
}
