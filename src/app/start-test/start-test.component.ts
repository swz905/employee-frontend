import {Component, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import {Quiz} from "../shared/quiz";
import {FormGroup} from "@angular/forms";
import {timer} from 'rxjs';
import {takeWhile, tap} from "rxjs/operators";
import {QuestionService} from "../services/data/question.service";
import {Test} from "../shared/testmodel";
import {Question} from "../shared/question";
import {TestDtoModified} from "../shared/testDto";
import {Result} from "../shared/result";
import {TestService} from "../services/data/test.service";

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {

  myForm: FormGroup | undefined;
  question!: Quiz;
  newQuiz: Quiz[] = [];
  difficulty = 'Easy';


  isShow = true;
  showQuiz = true;
  showTestResult = true;

  index = 0;
  length: number = 15;

  timeLeft: number = 15 * 60;

  timerSubscription: any;
  userAns: string = '';
  questionIds = new Set();
  totalScore = 0;
  attemptedQuiz = false;

  test: Test = {
    difficulty: "",
    email: "",
    title: "",
    attempted: false
  }

  result: Result[] = [];
  eachResult: Result = {
    question: "",
    correct: "",
    answerOfUser: "",
  }
  titleOfTest: any

  tests: TestDtoModified[] = [];
  shuffledQuestions: Question[] = [];
  shuffledQuestionsFromDifficulty: Question[] = [];
  testQuestions: Question[] = [];
  showEachQuestions: Question = {
    ans: 0,
    chosen: "",
    difficulty: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    quesId: 0,
    title: ""
  }
  testIndex = -1;


  constructor(private quizService: QuizService,
              private questionService: QuestionService,
              private testService: TestService) {
  }

  ngOnInit(): void {
    // this.newQuiz = this.quizService.getShuffledQuiz();
    // this.question = this.newQuiz[0];
    // this.length = this.newQuiz.length;
    // this.index = 0;
    this.index = 0;
    this.questionIds = new Set();


    let item = sessionStorage.getItem("authenticatorEmail");
    this.questionService.getTestsFromMail(item).subscribe(
      response => {
        this.tests = response;
        for (let i = 0; i < this.tests.length; i++) {
          this.attemptedQuiz = this.tests[i].attempted;
          console.log(this.attemptedQuiz);
          this.questionService.getShuffledQuestionsByDifficulty(this.tests[i].difficulty).subscribe(
            response => {
              this.tests[i].questions = response;
            });
        }
      }
    );

  }

  public getShuffledQuestionsByDifficulty(difficulty: string) {
    this.questionService.getShuffledQuestionsByDifficulty(difficulty).subscribe(
      response => {
        this.shuffledQuestionsFromDifficulty = response;
      },
      error => {
        console.log("Something Went Wrong");
      }
    )
    return this.shuffledQuestionsFromDifficulty;
  }


  onshow() {
    this.newQuiz.filter(q => q.difficulty = this.difficulty)
    this.isShow = !this.isShow;
  }

  passIndex(index: number, title: string) {
    this.testIndex = index;
    this.testQuestions = this.tests[index].questions;
    this.showEachQuestions = this.testQuestions[0];
    this.titleOfTest = title;

  }

  showQuestionForm() {
    this.showQuiz = false;
    this.showTestResult = true;
    this.timerForQuiz();
  }

  nextQuestion() {
    this.index++
    this.checkAnswer();
    this.showEachQuestions = this.testQuestions[this.index];
  }

  prevQuestion() {
    this.index--
    this.showEachQuestions = this.testQuestions[this.index];
  }

  submitTest() {
    this.showTestResult = false;
    this.showQuiz = true;
    alert("Time is Over")
    this.timerSubscription.unsubscribe();
    // this.index = 0;
    this.attemptedQuiz = true;
    this.index++;
    this.checkAnswer();
    this.addResultToTest();
    console.log(this.result);
  }

  timerForQuiz() {
    let counter = 15 * 60;
    this.timerSubscription = timer(1000, 1000) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile(() => counter > 0),
        tap(() => counter--)
      )
      .subscribe((response) => {
        this.timeLeft = counter
        if (this.timeLeft === 0) {
          this.submitTest();
        }
      });
  }


  checkAnswer() {
    if (this.questionIds.has(this.index)) {
    } else if (this.showEachQuestions.ans === parseInt(this.userAns)) {

      this.questionIds.add(this.index);
      this.totalScore += 1;
    }
    this.saveToResult();

  }

  addResultToTest() {
    this.tests[this.testIndex].score = this.totalScore;
    this.tests[this.testIndex].attempted = this.attemptedQuiz;
    this.questionService.addScore(
      sessionStorage.getItem("authenticatorEmail"),
      this.tests[this.testIndex]).subscribe(
      response => {
        alert("Updated Score")
      },
      error => {
        alert("cant Update Test Score");
      }
    );
  }


  saveToResult() {
    this.eachResult.question = this.showEachQuestions.title;
    switch (this.showEachQuestions.ans) {
      case 1: {
        this.eachResult.correct = this.showEachQuestions.optionA;
        this.convertUserAnsToString(this.userAns);
        break;
      }
      case 2: {
        this.eachResult.correct = this.showEachQuestions.optionB;
        this.convertUserAnsToString(this.userAns);
        break;
      }
      case 3: {
        this.eachResult.correct = this.showEachQuestions.optionC;
        this.convertUserAnsToString(this.userAns);
        break;
      }
      case 4: {
        this.eachResult.correct = this.showEachQuestions.optionD;
        this.convertUserAnsToString(this.userAns);
        break;
      }
    }
    this.result[this.index] = this.eachResult;

    this.testService.addQuestionAndAnswersToResult(
      sessionStorage.getItem("authenticatorEmail"),
      this.titleOfTest, this.eachResult).subscribe(
      response => {
      },
      error => {
        alert("Cant Add Result")
      }
    )

  }


  convertUserAnsToString(userEntry: string) {
    switch (userEntry) {
      case '1':
        this.eachResult.answerOfUser = this.showEachQuestions.optionA;
        break;
      case '2':
        this.eachResult.answerOfUser = this.showEachQuestions.optionB;
        break;
      case '3':
        this.eachResult.answerOfUser = this.showEachQuestions.optionC;
        break;
      case '4':
        this.eachResult.answerOfUser = this.showEachQuestions.optionD;
        break;
    }
  }

}
