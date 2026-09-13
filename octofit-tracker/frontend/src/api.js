const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''

export function apiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['items', 'results', 'data']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
    }
  }

  return []
}

export async function getCollection(resource, signal) {
  const response = await fetch(apiUrl(resource), { signal })

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }

  return collectionFromResponse(await response.json())
}
