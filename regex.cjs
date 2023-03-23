//// Regex test for parsing more than one multiple choice questions (not finished)
const originalContent =
  'Q1. Which keyword is used to declare a variable in JavaScript?\n' +
  'A. int\n' +
  'B. var\n' +
  'C. let\n' +
  'D. const\n' +
  'Answer: B\n' +
  '\n' +
  'Q2. What is the output of the following code?\n' +
  '\n' +
  '```\n' +
  'console.log(10 + "20");\n' +
  '```\n' +
  '\n' +
  'A. 1020\n' +
  'B. 30\n' +
  'C. "1020"\n' +
  'D. "30"\n' +
  'Answer: C\n' +
  '\n' +
  'Q3. What is the output of the following code?\n' +
  '\n' +
  '```\n' +
  'console.log(typeof NaN);\n' +
  '```\n' +
  '\n' +
  'A. "number"\n' +
  'B. "string"\n' +
  'C. "undefined"\n' +
  'D. "NaN"\n' +
  'Answer: A\n' +
  '\n' +
  'Q4. Which of the following is not a JavaScript data type?\n' +
  'A. Boolean\n' +
  'B. String\n' +
  'C. Symbol\n' +
  'D. Float\n' +
  'Answer: D\n' +
  '\n' +
  'Q5. What is the output of the following code?\n' +
  '\n' +
  '```\n' +
  'let arr = [1, 2, 3];\n' +
  'console.log(arr instanceof Array);\n' +
  '```\n' +
  '\n' +
  'A. true\n' +
  'B. false\n' +
  'C. TypeError\n' +
  'D. undefined\n' +
  'Answer: A'

const newContent = originalContent.replace(/\n/g, 'NEwlInE')

function parsingMultipleMCQ(content, num, total) {
  let regex
  if (total == 1) {
    return content
  } else if (total == num) {
    regex = new RegExp(`Q${num}\\..*`)
  } else {
    regex = new RegExp(`Q${num.toString()}\\..*?(?=Q${(num + 1).toString()}\\.)`)
  }
  return content.match(regex)[0]
}

function parsingMCQ(content, num) {
  let regex = new RegExp(`Q${num.toString()}\\..*?(?=A\\.)`)
  const question = content.match(regex)[0].replace(/NEwlInE/g, '\n')
  const option1 = content
    .match(/A\..*?(?=B\.)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/A\./, '')
    .trim()
  const option2 = content
    .match(/B\..*?(?=C\.)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/B\./, '')
    .trim()
  const option3 = content
    .match(/C\..*?(?=D\.)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/C\./, '')
    .trim()
  const option4 = content
    .match(/D\..*?(?=Answer)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/D\./, '')
    .trim()
  const answer = answerIndex(
    content
      .match(/Answer:.*/g)[0]
      .replace(/Answer:/g, '')
      .trim()
  )
}

let total = 5
for (let i = 1; i <= total; i++) {
  const question = parsingMultipleMCQ(newContent, i, total)
  parsingMCQ(question, i)
}

function answerIndex(letter) {
  if (letter == 'A') {
    return 0
  } else if (letter == 'B') {
    return 1
  } else if (letter == 'C') {
    return 2
  } else return 3
}
