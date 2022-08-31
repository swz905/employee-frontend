import { Injectable } from '@angular/core';
import {Quiz} from "../shared/quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  arrayCopy :Quiz[] = [];

  constructor() { }
  quizzes:Quiz[] = [
    new Quiz(
      'What is the longest that an elephant has ever lived? (That we know of)',
      1,
      'easy',
      [
        {option:'17 years',correct:false},
        {option:'49 years',correct:false},
        {option:'86 years',correct:true},
        {option:'142 years',correct:false}
      ]),
    new Quiz('How many rings are on the Olympic flag?',
      2,
      'easy',
      [
        {option:'None',correct:false},
        {option:'4',correct:false},
        {option:'5',correct:true},
        {option:'7',correct:false}
      ]),
    new Quiz(
      'What is a tarsier',
      3,
      'easy',
      [
        {option:'A primate',correct:true},
        {option:'A lizard',correct:false},
        {option:'A bird',correct:false},
        {option:'An owl',correct:false},

      ]),
    new Quiz(
    'How did Spider-Man get his powers?',
      4,
      'moderate',

      [
        {option:'Military Experiment gone wrong',correct:false},
        {option:'Bitten by a Radiactive spyder',correct:true},
        {option:'Woke up with them after a strage dream',correct:false},
        {option:'Born with them',correct:false}
      ]),
    new Quiz('In darts, what\'s the most points you can score with a single throw?',
      5,
      'moderate',
      [
        {option:'29',correct:false},
        {option:'50',correct:false},
        {option:'60',correct:true},
        {option:'100',correct:false}
      ]),

    new Quiz('Which of these animals does NOT appear in the Chinese zodiac?',
      6,
      'moderate',
      [
        {option:'Bear',correct:true},
        {option:'Rabbit',correct:false},
        {option:'Dragon',correct:false},
        {option:'Dog',correct:false}
      ]),
    new Quiz(
    'How many holes are on a standard bowling ball?',
      7,
      'challenging',
      [
        {option:'2',correct:false},
        {option:'3',correct:true},
        {option:'5',correct:false},
        {option:'10',correct:false}
      ]),
    new Quiz(
    'What are the main colors on the flag of Spain?',
      8,
      'challenging',
      [
        {option:'Black and Yellow',correct:false},
        {option:'Blue and White',correct:false},
        {option:'Red and Yellow',correct:true},
        {option:'Green and Orange',correct:false}
      ]),
    new Quiz('In the nursery rhyme, how many blackbirds were baked in a pie?',
      9,
      'challenging',
      [
        {option:'4',correct:false},
        {option:'11',correct:false},
        {option:'24',correct:true},
        {option:'99',correct:false}
      ]),

    new Quiz('Who killed Greedo?',
      10,
      'challenging',
      [
        {option:'Hannibal Lecter',correct:false},
        {option:'Han Solo',correct:true},
        {option:'Hermione Granger',correct:false},
        {option:'Hercules',correct:false}
      ]),
  ]

  getQuizzes(){
    return this.quizzes;
  }

  shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getShuffledQuiz():Quiz[]{
    this.shuffleArray(this.quizzes)
    return this.quizzes;
  }


}
