import {Component, OnInit} from '@angular/core';
import {Question} from "../../shared/question";
import {NgForm} from "@angular/forms";
import {QuestionService} from "../../services/data/question.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questions: Question[] = [];

  radioSelected: any;


  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
  }

  onClickAddQuestion(form: NgForm) {

    const question: Question = {
      quesId: 0,
      title: form.value.newQuestion,
      ans: form.value.enums,
      chosen: "",
      difficulty: form.value.difficulty,
      optionA: form.value.optionA,
      optionB: form.value.optionB,
      optionC: form.value.optionC,
      optionD: form.value.optionD,
    }

    this.questionService.addQuestion(question).subscribe(
      response => {
        console.log(response);
      },
      error => {
        alert("Something Went Wrong");
      }
    )


  }

  onClickRemoveQuestion() {

  }
}
