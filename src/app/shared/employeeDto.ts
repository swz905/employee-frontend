
export class EmployeeDto {

  employee_id:number;
  name:string;
  email:string;
  password:string;
  phoneNumber:number;
  empType:string;



  constructor(employee_id: number, name: string, email: string, password: string, phoneNumber: number, empType: string) {
    this.employee_id = employee_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.empType = empType;
  }

}

