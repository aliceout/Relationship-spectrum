import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string"

const newShareId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const encodeState = (state) => {
  try {
    return compressToEncodedURIComponent(JSON.stringify(state))
  } catch (error) {
    console.error("Failed to encode state", error)
    return null
  }
}

export const decodeState = (encoded) => {
  if (!encoded) return null

  try {
    const json = decompressFromEncodedURIComponent(encoded)
    if (!json) {
      return null
    }
    return JSON.parse(json)
  } catch (error) {
    console.error("Failed to decode state", error)
    return null
  }
}

export const createSharePayload = ({ values, lang, presetId }) => ({
  id: newShareId(),
  lang,
  presetId: presetId ?? null,
  values
})

export const buildShareUrl = (payload) => {
  const encoded = encodeState(payload)
  if (!encoded) {
    return window.location.href
  }

  const url = new URL(window.location.href)
  url.searchParams.set("s", encoded)
  return url.toString()
}
