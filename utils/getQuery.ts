export const getQuery = (
  query: string | (string | null)[] | undefined
): string => {
  if (!query) {
    return ''
  }
  if (Array.isArray(query)) {
    return query.join(',')
  }
  return query as string
}
