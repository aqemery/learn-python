if (!code.includes("print(\"comment this line out\")") || !code.includes('print("also comment this line out")')) {
  return "hmm, looks like you deleted some lines instead of commenting them out"
}
