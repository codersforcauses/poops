export const canDelete = (mut: Record<string, unknown>, id?: string) => {
  return Object.keys(mut).length === 0 && id
}
