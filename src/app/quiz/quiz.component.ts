import { Component, OnInit } from '@angular/core';
import {Quiz} from "../shared/quiz";
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  Quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  this.Quizzes = this.quizService.quizzes;
  }

}
