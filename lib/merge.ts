// Deep merge + diff utilities for partial PageContent updates.
// Arrays are treated as scalars (replaced wholesale) — diffing/merging
// arrays would require positional semantics we don't need.

export function deepMerge<T extends Record<string, unknown>>(target: T, patch: Partial<T> | Record<string, unknown>): T {
  if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) {
    return patch as unknown as T;
  }
  const result: Record<string, unknown> = { ...target };
  for (const key of Object.keys(patch)) {
    const patchVal = (patch as Record<string, unknown>)[key];
    const targetVal = result[key];
    if (
      patchVal !== null &&
      typeof patchVal === 'object' &&
      !Array.isArray(patchVal) &&
      targetVal !== null &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = deepMerge(targetVal as Record<string, unknown>, patchVal as Record<string, unknown>);
    } else {
      result[key] = patchVal;
    }
  }
  return result as T;
}

// Returns only the keys whose values differ between `next` and `prev`.
// For nested objects, the diff is also nested. Arrays compared by JSON identity.
export function computeDiff(prev: unknown, next: unknown): Record<string, unknown> | unknown {
  if (prev === next) return undefined;
  if (
    prev === null ||
    next === null ||
    typeof prev !== 'object' ||
    typeof next !== 'object' ||
    Array.isArray(prev) ||
    Array.isArray(next)
  ) {
    return JSON.stringify(prev) === JSON.stringify(next) ? undefined : next;
  }

  const diff: Record<string, unknown> = {};
  const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)]);
  for (const key of allKeys) {
    const subDiff = computeDiff(
      (prev as Record<string, unknown>)[key],
      (next as Record<string, unknown>)[key]
    );
    if (subDiff !== undefined) diff[key] = subDiff;
  }
  return Object.keys(diff).length > 0 ? diff : undefined;
}

export function isEmptyPatch(patch: unknown): boolean {
  return patch === undefined || patch === null || (typeof patch === 'object' && !Array.isArray(patch) && Object.keys(patch as object).length === 0);
}
