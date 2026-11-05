import assert from "node:assert/strict";
import test from "node:test";
import { contactFromAddress, DEFAULT_CONTACT_FROM, isResendSandboxFrom } from "./contactFrom";

test("contact sender defaults to the SenseAgri domain, not the Resend sandbox", () => {
  assert.equal(contactFromAddress({} as NodeJS.ProcessEnv), DEFAULT_CONTACT_FROM);
  assert.equal(contactFromAddress({ CONTACT_FORM_FROM: "   " } as NodeJS.ProcessEnv), DEFAULT_CONTACT_FROM);
  assert.equal(DEFAULT_CONTACT_FROM.includes("@senseagriai.com"), true);
  assert.equal(isResendSandboxFrom(DEFAULT_CONTACT_FROM), false);
});

test("CONTACT_FORM_FROM overrides the default sender", () => {
  const from = contactFromAddress({
    CONTACT_FORM_FROM: "  SenseAgri AI <hello@senseagriai.com>  "
  } as NodeJS.ProcessEnv);
  assert.equal(from, "SenseAgri AI <hello@senseagriai.com>");
});

test("sandbox from-addresses are detectable", () => {
  assert.equal(isResendSandboxFrom("SenseAgri AI Website <onboarding@resend.dev>"), true);
});
