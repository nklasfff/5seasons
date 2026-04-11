// Simple localStorage-backed journal store keyed by season + question number.
// Schema: { [seasonId]: { [number]: string } }

const STORAGE_KEY = 'fiveseasons:journal'

function readAll() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeAll(obj) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  } catch {
    // ignore (quota full, disabled, etc.)
  }
}

export function getEntry(seasonId, number) {
  const all = readAll()
  return all[seasonId]?.[number] ?? ''
}

export function setEntry(seasonId, number, value) {
  const all = readAll()
  if (!all[seasonId]) all[seasonId] = {}
  if (value && value.trim().length > 0) {
    all[seasonId][number] = value
  } else {
    // empty values clean themselves up
    delete all[seasonId][number]
    if (Object.keys(all[seasonId]).length === 0) delete all[seasonId]
  }
  writeAll(all)
}

export function clearEntry(seasonId, number) {
  const all = readAll()
  if (all[seasonId]) {
    delete all[seasonId][number]
    if (Object.keys(all[seasonId]).length === 0) delete all[seasonId]
    writeAll(all)
  }
}

export function clearAll() {
  writeAll({})
}

export function getAllEntries() {
  return readAll()
}
