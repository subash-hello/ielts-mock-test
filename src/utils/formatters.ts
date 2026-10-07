/**
 * Unified Formatting Utilities (Design Blueprint v2.0 - Consistency Rules)
 * Rule 8: One timestamp format across the product (e.g. "Oct 6, 2026 · 4:32 PM")
 * Rule 8: One time-spent value everywhere
 */

export function formatAppTimestamp(dateInput?: string | Date | number | null): string {
  if (!dateInput) return '—';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${month} ${day}, ${year} · ${hours}:${minutes} ${ampm}`;
}

export function formatTimeSpent(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '0 min';
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);

  if (mins === 0) return `${secs} sec`;
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}

export function formatRelativeTime(dateInput?: string | Date | number | null): string {
  if (!dateInput) return 'offline';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return 'offline';

  const diffMs = Date.now() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 15) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  return formatAppTimestamp(dateInput);
}
