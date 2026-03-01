/**
 * Auth helper functions for client-side API calls with automatic token refresh
 */

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Get access token from localStorage
 */
function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('horizon_accessToken') || localStorage.getItem('accessToken');
}

/**
 * Get refresh token from localStorage
 */
function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('horizon_refreshToken') || localStorage.getItem('refreshToken');
}

/**
 * Set tokens in localStorage
 */
function setTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('horizon_accessToken', accessToken);
  localStorage.setItem('horizon_refreshToken', refreshToken);
}

/**
 * Clear tokens from localStorage
 */
function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('horizon_accessToken');
  localStorage.removeItem('horizon_refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('horizon_user');
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return null;
    }

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
}

/**
 * Authenticated fetch with automatic token refresh
 */
export async function authFetch(url: string, options: FetchOptions = {}): Promise<Response> {
  const { skipAuth = false, ...fetchOptions } = options;

  // Skip auth if requested
  if (skipAuth) {
    return fetch(url, fetchOptions);
  }

  let token = getAccessToken();

  // If no token, redirect to login
  if (!token) {
    if (typeof window !== 'undefined') {
      window.location.href = '/hzn-ctrl-x9k2/login';
    }
    throw new Error('No authentication token found');
  }

  // Make initial request
  let response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  // If 401, try to refresh token
  if (response.status === 401) {
    token = await refreshAccessToken();

    if (!token) {
      // Redirect to login if refresh failed
      if (typeof window !== 'undefined') {
        window.location.href = '/hzn-ctrl-x9k2/login';
      }
      throw new Error('Authentication failed');
    }

    // Retry request with new token
    response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  return response;
}

/**
 * Create a blob URL for preview (local file preview)
 */
export function createBlobUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke a blob URL to free memory
 */
export function revokeBlobUrl(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export { clearTokens, getAccessToken, getRefreshToken };
