import {Employee} from "./employee";
import {EmployeeDto} from "./employeeDto";

export class Reportee {

  manager_id:number;
  name:string;
  email:string;
  password:string;
  phone:number;
  empType:string;
  manager:number;
  reportees:EmployeeDto[];


  constructor(manager_id: number, name: string, email: string, password: string, phone: number, empType: string, manager: number, reportees: EmployeeDto[]) {
    this.manager_id = manager_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.empType = empType;
    this.manager = manager;
    this.reportees = reportees;
  }
}
