import { useCallback, useSyncExternalStore } from 'react'

/**
 * Multi-step form data store backed by sessionStorage.
 * Survives full page navigations (Back button <a> links, refreshes)
 * within the same browser tab.
 *
 * Note: This is intentionally NOT React Context (per spec: no React Context
 * for booking state). It's a module-level singleton with sessionStorage backup.
 */

type FormData = Record<string, string>

const STORAGE_KEY = 'weddings-form-data'

function loadFromStorage(): FormData {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveToStorage(data: FormData) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Silently fail if storage is full/unavailable
  }
}

let store: FormData = loadFromStorage()
const listeners: Set<() => void> = new Set()

function emitChange() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): FormData {
  return store
}

function getServerSnapshot(): FormData {
  return {}
}

export function setFormValues(values: FormData) {
  store = { ...store, ...values }
  saveToStorage(store)
  emitChange()
}

export function getFormValues(): FormData {
  return store
}

export function resetFormStore() {
  store = {}
  saveToStorage(store)
  emitChange()
}

/**
 * React hook to read from the form store.
 * Returns stable references and a setter for batch updates.
 */
export function useFormStore() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const set = useCallback((values: FormData) => {
    setFormValues(values)
  }, [])

  return { data, set }
}
