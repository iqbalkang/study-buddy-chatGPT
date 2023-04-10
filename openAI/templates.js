// const templateMCQ = `Example of a multiple choice question:\n
//                     Q. What is the syntax for a for loop in Javascript?\n
//                     A. for(i=0, i < 10, i++)\n
//                     B.\n
//                     C.\n
//                     D.\n
//                     Answer: B\n\n
                      
//                     On a scale from 1 to 10 with 10 being the hardest and 1 being the easiest, 
//                     Using the formatting of the example above, 
//                     generate one multiple choice 7 out of 10 difficulty javascript question.`

// module.exports = { templateMCQ }

exports.mcqTemplate = `
Example of a multiple choice question:
Q1. What is the syntax for a for loop in Javascript?
A. for(i = 0, i < 10, i++
B. for (i = 0; i < 10; i++)
C. for i = 1 to 10
D. for (i <= 10; i++)
Answer: B

Q2. Which of the following is the correct way to declare a variable in JavaScript?
A. variable x = 5;
B. var x = "5";
C. let x = true;
D. const x = [1, 2, 3];
Answer: B
  
`;

exports.tfTemplate = `
Example of a true or false question:
Q1. Javascript is a compiled language.
Answer: False

Q2. JavaScript supports multi-threaded programming.
Answer: False

Q3. JavaScript is a statically-typed language. 
Answer: False
  
`;

exports.customTemplate = (quest_num, quest_type, difficulty, subject) => {
  return (
`
On a scale from 1 to 10 with 1 being the easiest and 10 being the hardest, 
Using the formatting of the example above, generate ${quest_num}, 
${quest_type} ${difficulty} out of 10 difficulty ${subject} question${quest_num > 1 ? 's' : ''}.
`
  );
};
