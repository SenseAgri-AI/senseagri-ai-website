import { loadWikiEntities, WikiValidationError } from "../lib/wiki/load";

try {
  const entities = loadWikiEntities();
  console.log(`ok    ${entities.length} wiki entities`);
} catch (error) {
  const message = error instanceof WikiValidationError ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
