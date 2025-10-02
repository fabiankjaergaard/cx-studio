// Utility function to generate unique 4-digit access codes
export function generateUniqueAccessCodes(count: number = 20): string[] {
  const codes = new Set<string>()

  while (codes.size < count) {
    // Generate a random 4-digit number (1000-9999)
    const code = Math.floor(1000 + Math.random() * 9000).toString()
    codes.add(code)
  }

  return Array.from(codes)
}

// Generate SQL insert statements for access codes
export function generateAccessCodeSQL(codes: string[]): string {
  const values = codes.map(code => `('${code}')`).join(',\n  ')

  return `-- Insert generated access codes
INSERT INTO access_codes (code) VALUES
  ${values}
ON CONFLICT (code) DO NOTHING;`
}

// Example usage:
// const codes = generateUniqueAccessCodes(20)
// console.log('Generated codes:', codes)
// console.log('SQL:', generateAccessCodeSQL(codes))