/**
 * Truncates a string to some provided length (defaults to 16 chars) and returns the shortened string
 *
 * @param str input string
 * @param len maximum length of the returned string
 */
const truncateText = (str: string, len = 16) => {
  if (str.length > len) {
    return str.substring(0, len - 3).concat('...')
  }

  return str
}

export default truncateText
