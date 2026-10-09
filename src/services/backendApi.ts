/**
 * Master IELTS AI - Backend API Client
 * Seamlessly interfaces the React frontend with the FastAPI backend hosted on Hugging Face Spaces.
 */

import type { IELTSMockTest } from '../types/ielts';

const getEnv = (key: string): string | undefined => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env[key];
    }
  } catch {}
  try {
    const globalObj = globalThis as unknown as { process?: { env?: Record<string, string> } };
    if (globalObj?.process?.env) {
      return globalObj.process.env[key];
    }
  } catch {}
  return undefined;
};

// Base URL for the Hugging Face Spaces backend API
export const BACKEND_BASE_URL: string = (
  getEnv('VITE_BACKEND_API_URL') ||
  getEnv('VITE_BACKEND_URL') ||
  'https://subash2064-ielts-mock-backend.hf.space'
).replace(/\/$/, '');

export const isBackendConfigured = (): boolean => {
  return Boolean(BACKEND_BASE_URL && BACKEND_BASE_URL.trim().length > 0);
};

/**
 * Health check to verify Hugging Face backend connection
 */
export async function checkBackendHealth(): Promise<{ healthy: boolean; data?: any }> {
  if (!isBackendConfigured()) return { healthy: false };
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/health`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      return { healthy: true, data };
    }
  } catch (err) {
    console.warn('[Backend] Health check failed, falling back to local mode:', err);
  }
  return { healthy: false };
}

/**
 * Fetch all mock tests from FastAPI Backend
 */
export async function fetchTestsFromBackend(): Promise<IELTSMockTest[] | null> {
  if (!isBackendConfigured()) return null;
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/tests`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const summaries = await res.json();
      return summaries;
    }
  } catch (err) {
    console.warn('[Backend] Failed to load tests from backend:', err);
  }
  return null;
}

/**
 * Fetch single full test with sections and questions from backend
 */
export async function fetchTestByIdFromBackend(testId: string): Promise<IELTSMockTest | null> {
  if (!isBackendConfigured()) return null;
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/tests/${encodeURIComponent(testId)}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`[Backend] Failed to load test ${testId}:`, err);
  }
  return null;
}

/**
 * Send live workstation heartbeat to backend
 */
export async function sendHeartbeatToBackend(cid: string, payload: {
  station_id: string;
  station_name?: string;
  consultancy_id: string;
  status: string;
  current_candidate?: string;
  candidate_number?: string;
  current_test_id?: string;
  current_module?: string;
  answers_count?: number;
  remaining_seconds?: number;
  browser?: string;
  os?: string;
}): Promise<boolean> {
  if (!isBackendConfigured()) return false;
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/consultancies/${encodeURIComponent(cid)}/stations/heartbeat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000)
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch active lab test launch session from backend
 */
export async function fetchActiveLaunchFromBackend(cid: string): Promise<{ isActive: boolean; launch?: any } | null> {
  if (!isBackendConfigured()) return null;
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/consultancies/${encodeURIComponent(cid)}/active-launch`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[Backend] Failed to check active launch:', err);
  }
  return null;
}

/**
 * Grade writing essay via backend AI examiner
 */
export async function gradeWritingViaBackend(taskType: string, promptText: string, essayText: string): Promise<any | null> {
  if (!isBackendConfigured()) return null;
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/ai/grade-writing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_type: taskType,
        prompt_text: promptText,
        essay_text: essayText
      }),
      signal: AbortSignal.timeout(15000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[Backend] AI writing evaluation request failed:', err);
  }
  return null;
}
