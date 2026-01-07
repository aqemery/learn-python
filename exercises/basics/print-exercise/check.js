if (code.includes("print('123')") || code.includes('print("123")')) {
  return "That's almost right! But try printing 123 without quotes"
}
if (code.includes("print('1.234')") || code.includes('print("1.234")')) {
  return "That's almost right! But try printing 1.234 without quotes"
}
