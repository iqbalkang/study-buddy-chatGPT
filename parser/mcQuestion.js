class MCQuestion {
  constructor(num, data) {
      this.type = 'mcq';
      this.data = data;
      this.num = num;
  }

  parse() {

    let questionRegex = new RegExp(`Q?${this.num.toString()}\\..*?(?=A\\.)`);
    let replaceRegex = new RegExp(`Q?${this.num.toString()}\\.`); 
    
    const content = this.data.replace(/\n/g, "NEwlInE");
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
    const answer = this.answerIndex(
      content
        .match(/Answer:.*/g)[0]
        .replace(/Answer:/g, "")
        .trim()
    );

    return {
      type: this.type,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
    };
  }

  answerIndex(letter) {
    if (letter == 'A') {
      return 0;
    } else if (letter == 'B') {
      return 1;
    } else if (letter == 'C') {
      return 2;
    } else return 3;
  }
}

module.exports = MCQuestion;