class TFQuestion {
  constructor(num, data) {
    this.type = 'tf';
    this.data = data;
    this.num = num;
  }
  
  parse() {
    let questionRegex = new RegExp(`Q?${this.num.toString()}\\..*(?=Answer:)`);
    let replaceRegex = new RegExp(`Q?${this.num.toString()}\\.`); 

    const content = this.data.replace(/\n/g, 'NEwlInE');

    const question = content
      .match(questionRegex)[0]
      .replace(/NEwlInE/g, '\n')
      .replace(replaceRegex, '')
      .trim();
    const option1 = 'True';
    const option2 = 'False';
    const answer = this.answerIndex(
      content
        .match(/Answer:.*/g)[0]
        .replace(/Answer:/g, '')
        .trim()
    );

    return {
      type: this.type,
      question,
      option1,
      option2,
      option3: null,
      option4: null,
      answer,
    };
  }

  answerIndex(answer) {
    console.log('answerIndex', answer);
    if (answer == 'True') {
      return 0;
    } else 
      return 1;
    }
}

module.exports = TFQuestion;