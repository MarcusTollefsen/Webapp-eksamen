// generateId.ts
function randomLetters(length: number): string {
  const characters = "abcdefghijklmnopqrstuvwxyz"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function randomNumbers(length: number): string {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
  ).toString()
}

export function generateUniqueId(): string {
  return `${randomLetters(3)}-${randomNumbers(3)}-${randomNumbers(3)}`
}
