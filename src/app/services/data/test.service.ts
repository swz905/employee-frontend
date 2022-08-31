import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestDtoModified, TestResult} from "../../shared/testDto";
import {Test} from "../../shared/testmodel";
import {Result} from "../../shared/result";
import {AdminEmployeeDto, EmployeeResultDto} from "../../shared/employeeResultDto";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiServerUrl  =environment.apiBaseUrl;

  constructor(private http:HttpClient) { }


  getTestsFromEmail(email: string | null):Observable<TestResult[]>{
    return this.http.get<TestResult[]>(`${this.apiServerUrl}/view-test-page/employee/${email}`);
  }

  addQuestionAndAnswersToResult(email: string | null, title:string,body: Result){
    return this.http.post(`${this.apiServerUrl}/view-test-page/employee/${email}/${title}`, body);
  }


  getAllEmployeesUnderManagerWithTestResult(email: string | null):Observable<EmployeeResultDto[]> {
    return this.http.get<EmployeeResultDto[]>(`${this.apiServerUrl}/manager/${email}/employees-with-results`);
  }

  getAllEmployeesUnderAdminWithTestREsult(email: string | null):Observable<AdminEmployeeDto[]> {
    return this.http.get<AdminEmployeeDto[]>(`${this.apiServerUrl}/admin/${email}/employees`);
  }
}
