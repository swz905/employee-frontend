import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Reportee} from "../../shared/reportee";
import {Question} from "../../shared/question";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Test} from "../../shared/testmodel";
import {TestDto, TestDtoModified} from "../../shared/testDto";
import {Employee} from "../../shared/employee";
import {EmployeeDto} from "../../shared/employeeDto";
import {EmployeeResultDto} from "../../shared/employeeResultDto";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiServerUrl  =environment.apiBaseUrl;


  constructor(private http:HttpClient) { }

  getQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/getAll`);
  }
  getShuffledQuestions():Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/getShuffled`);
  }

  getShuffledQuestionsByDifficulty(difficulty:string):Observable<Question[]>{
    return this.http.get<Question[]>(`${this.apiServerUrl}/question/${difficulty}`);
  }

  addQuestion(question :Question):Observable<Question>{
    return this.http.post<Question>(`${this.apiServerUrl}/question/add`,question);
  }

  removeQuestion(title :string){
    return this.http.delete<void>(`${this.apiServerUrl}/question/delete/${title}`);
  }

  // Test Service Methods
  getTestsFromMail(email: string | null):Observable<TestDtoModified[]>{
    return this.http.get<TestDtoModified[]>(`${this.apiServerUrl}/test/getByEmail/${email}`);
  }

  addTest(test :Test):Observable<Test>{
    return this.http.post<Test>(`${this.apiServerUrl}/test/addTest`,test);
  }

  addScore(email: string | null, test: TestDtoModified){
    return this.http.post(`${this.apiServerUrl}/test/modifyScore/${email}`,test);
  }







}
