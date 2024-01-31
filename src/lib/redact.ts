export default function redact(toRedact: string, redactFrom: string) {
  if (!toRedact || !redactFrom) {
    return '';
  }
  return redactFrom.replace(
    new RegExp(toRedact.replace(/[-/\\^$*+?.()|[\]{}]/gu, '\\$&'), 'giu'),
    '[REDACTED]'
  );
}
