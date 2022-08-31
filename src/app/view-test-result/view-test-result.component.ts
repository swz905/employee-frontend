import { Component, OnInit } from '@angular/core';
import {TestService} from "../services/data/test.service";
import {Test} from "../shared/testmodel";
import {TestResult} from "../shared/testDto";
import {AdminEmployeeDto, EmployeeResultDto} from "../shared/employeeResultDto";

@Component({
  selector: 'app-view-test-result',
  templateUrl: './view-test-result.component.html',
  styleUrls: ['./view-test-result.component.css']
})
export class ViewTestResultComponent implements OnInit {

  constructor(private testService: TestService) { }

  tests:TestResult[] = [];
  managerEmployeeTestResult :EmployeeResultDto[]=[];
  adminEmployeeTestResult :AdminEmployeeDto[]=[];

  questionList: boolean = true;
  managerTestResults: boolean = true;

  managerShow:boolean = true;
  adminShow:boolean = true;
  employeeShow:boolean = true;

  ngOnInit(): void {
    if (sessionStorage.getItem("authenticatorRole") ==='employee'){
      this.testService.getTestsFromEmail(
        sessionStorage.getItem("authenticatorEmail")).subscribe(
        response => {
          this.tests = response;
          this.adminShow = false;
          this.managerShow = false;
        });
    }
    else if (sessionStorage.getItem("authenticatorRole") ==='manager'){
      this.testService.getAllEmployeesUnderManagerWithTestResult(
        sessionStorage.getItem("authenticatorEmail")).subscribe(
        response => {
          this.managerEmployeeTestResult = response;
          this.employeeShow = false;
          this.adminShow = false;
        });
    }
    else if (sessionStorage.getItem("authenticatorRole") ==='admin'){
      this.testService.getAllEmployeesUnderAdminWithTestREsult(
        sessionStorage.getItem("authenticatorEmail")).subscribe(
        response => {
          this.adminEmployeeTestResult = response;
          this.employeeShow = false;
          this.managerShow = false;
        });
    }
  }

  showQuestions() {
    this.questionList =!this.questionList;
  }

  showManagerEmployeeTestResults() {
    this.managerTestResults =!this.managerTestResults;
  }
}
