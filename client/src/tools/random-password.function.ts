export function generatePassword(length: number = 12): string {
  // Define character sets
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()-_+=|\\:;\"'<>,.?/";

  // Ensure at least one character from each set
  let password = randomString(Math.floor(length / 4), lowerCaseLetters) +
    randomString(Math.floor(length / 4), upperCaseLetters) +
    randomString(Math.floor(length / 4), numbers) +
    randomString(Math.floor(length / 4), specialCharacters);

  // Shuffle the characters for better randomness
  password = password.split("").sort(() => Math.random() - 0.5).join("");

  // Ensure password length is at least desired length
  while (password.length < length) {
    password += randomString(1, lowerCaseLetters + upperCaseLetters + numbers + specialCharacters);
  }

  // Truncate if password exceeds desired length
  password = password.slice(0, length);

  return password;
}

// Helper function to generate random string of specified length from a character set
function randomString(length: number, charset: string): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}
