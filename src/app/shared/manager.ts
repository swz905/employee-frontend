import {Employee} from "./employee";
import {EmployeeDto} from "./employeeDto";

export class Manager {

  manager_id:number;
  name:string;
  email:string;
  password:string;
  phoneNumber:number;
  empType:string;
  reportees:EmployeeDto[];


  constructor(manager_id: number, name: string, email: string, password: string, phoneNumber: number, empType: string, reportees: EmployeeDto[]) {
    this.manager_id = manager_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.empType = empType;
    this.reportees = reportees;
  }
}
