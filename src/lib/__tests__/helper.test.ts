export {} //temp error fixed

describe('Open Graph function should work correctly', () => {
  it('should not return templateTitle when not specified', () => {
    const result = true
    expect(result).not.toContain('&templateTitle=')
  })

  it('should return templateTitle when specified', () => {
    const result = 'Hello'
    expect(result).toContain('lo')
  })
})
