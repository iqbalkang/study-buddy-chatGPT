/*
///returns a single question/// 
content = Entire response from openAI parsed with \n to NEwlInE
num = Which question from content you want extracted (Ex. If total is 5 and question 4 is wanted then num = 4)
total = The total amount of question in content
*/
function parsingMultipleMCQ(content, num, total) {
  let regex;
  if (total == 1) {
    return content; // return if only one question
  } else if (total == num) {
    regex = new RegExp(`Q${num}\\..*`);// expression for last question
  } else {
    regex = new RegExp(
      `Q${num.toString()}\\..*?(?=Q${(num + 1).toString()}\\.)`
    );// expression for questions that are not last
  }
  return content.match(regex)[0];
}

/*
///Parses a single question//
content = Entire response from openAI parsed with \n to NEwlInE
num = The question number of content (Ex. if Q1 then num = 1)
*/
function parsingMCQ(content, num) {
  let questionRegex = new RegExp(`Q${num.toString()}\\..*?(?=A\\.)`);
  let replaceRegex = new RegExp(`Q${num.toString()}\\.`); // expression for replacing Q(num) with ""
  const question = content
    .match(questionRegex)[0]
    .replace(/NEwlInE/g, "\n")
    .replace(replaceRegex, "")
    .trim();
  const option1 = content
    .match(/A\..*?(?=B\.)/g)[0]
    .replace(/NEwlInE/g, "")
    .replace(/A\./, "")
    .trim();
  const option2 = content
    .match(/B\..*?(?=C\.)/g)[0]
    .replace(/NEwlInE/g, "")
    .replace(/B\./, "")
    .trim();
  const option3 = content
    .match(/C\..*?(?=D\.)/g)[0]
    .replace(/NEwlInE/g, "")
    .replace(/C\./, "")
    .trim();
  const option4 = content
    .match(/D\..*?(?=Answer)/g)[0]
    .replace(/NEwlInE/g, "")
    .replace(/D\./, "")
    .trim();
  const answer = answerIndex(
    content
      .match(/Answer:.*/g)[0]
      .replace(/NEwlInE/g, "")
      .replace(/Answer:/g, "")
      .trim()
  );
  return [question, option1, option2, option3, option4, answer];
}

// returns index number associated with letter
function answerIndex(letter) {
  if (letter == "A") {
    return 0;
  } else if (letter == "B") {
    return 1;
  } else if (letter == "C") {
    return 2;
  } else return 3;
}

module.exports = {
  answerIndex,
  parsingMCQ,
  parsingMultipleMCQ,
};
