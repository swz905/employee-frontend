import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../../shared/employee";
import {Reportee} from "../../shared/reportee";
import {Manager} from "../../shared/manager";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiServerUrl  =environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEmployeeUnderAdmin(name: string):Observable<Reportee[]>{
    return this.http.get<Reportee[]>(`${this.apiServerUrl}/admin/${name}`);
  }


  getAllEmployeesUnderManager(name: string):Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/manager/${name}/employees`);
  }

  updateManagerUnderAdmin(name: string, managerId: number, manager: Manager):Observable<Manager>{
    return this.http.put<Manager>(`${this.apiServerUrl}/admin/${name}/manager/${managerId}`,manager);
  }

}
