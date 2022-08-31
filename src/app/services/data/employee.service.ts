import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../shared/employee";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {EmployeeDto} from "../../shared/employeeDto";
import {ForgotPasswordDto} from "../../forgot-password/common/ForgotPasswordDto";
import {ResetPasswordDto} from "../../reset-password/ResetPasswordDto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl  =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEmployeeByEmail(email: string, password: string):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/employees/${email}/${password}`);
  }


  getAllEmployeesUnderManager(name: string):Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(`${this.apiServerUrl}/manager/${name}/employees`);
  }


  addNewEmployee( employee: EmployeeDto):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employees/addEmployee`,employee);
  }

  deleteEmployeeUnderManager(manager: number, employeeId:number) {
    return this.http.delete<void>(`${this.apiServerUrl}/manager/${manager}/employees/${employeeId}`);
  }


  getEmployeeUnderManager(manager: number, employeeId:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiServerUrl}/manager/${manager}/employee/${employeeId}`)
  }

  updateEmployeeUnderManager(employeeId: number, employee: EmployeeDto):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employees/${employeeId}`,employee);
  }

  createEmployeeUnderManager(manager: number,employee: Employee):Observable<Employee>{

    return this.http.post<Employee>(`${this.apiServerUrl}/manager/${manager}/employees`,employee);
  }


  forgotPassword(body: ForgotPasswordDto){
    return this.http.post(`${this.apiServerUrl}/changePassword`,body);
  }

  resetPassword(body: ResetPasswordDto){
    return this.http.post(`${this.apiServerUrl}/resetPassword`,body);
  }
}
