
export class Employee {

  id:number;
  name:string;
  email:string;
  password:string;
  phoneNumber:number;
  firstLogin:boolean;
  empType:string;
  manager:number;
  token:string;

  constructor(id: number, name: string, email: string,
              password: string, phoneNumber: number,
              firstLogin:boolean,empType: string, manager: number, token:string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.firstLogin = firstLogin;
    this.empType = empType;
    this.manager = manager;
    this.token = token;
  }

}
