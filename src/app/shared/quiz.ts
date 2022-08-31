export class Quiz{
   question:string;
   id:number;
   difficulty:string;
   answer:{option:string , correct:boolean} [];


  constructor(question: string, id:number,difficulty: string, answer: { option: string; correct: boolean }[]) {
    this.question = question;
    this.id = id;
    this.difficulty = difficulty;
    this.answer = answer;
  }
}
