// Global filters (not supported in Vue 3 — must convert to methods or computed)

export function currency(value) {
  if (!value) return '$0.00'
  return '$' + parseFloat(value).toFixed(2)
}

export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function truncate(value, length = 50) {
  if (!value) return ''
  if (value.length <= length) return value
  return value.substring(0, length) + '...'
}

export function dateFormat(value) {
  if (!value) return ''
  const date = new Date(value)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
