import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Employee} from "../shared/employee";
import {EmployeeService} from "../services/data/employee.service";
import {EmployeeDto} from "../shared/employeeDto";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  managers =['balaji', 'ameen','abhiram']
  employee = new EmployeeDto(0,'','','',0,'');

  name :any
  email :any;
  empType:any;
  phoneNumber :any;


  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  unamePattern = '^[a-z0-9_-]{8,15}$';
  phonePattern = '[- +()0-9]{6,12}';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  addEmployee(f:NgForm):void {

    console.log(f.value);

    this.employee.name = this.name;
    this.employee.email = this.email;
    this.employee.phoneNumber = this.phoneNumber;
    this.employee.empType = this.empType;

    this.employeeService.addNewEmployee(this.employee).subscribe(
      response => {
        // if (!response) {
        //   this.showLoader();
        // }
        alert("Check Your Mail For Login Credentials");
        this.router.navigate(['']);
      },
      error => {
        this.router.navigate(['/error']);
      }
    )


  }

  initialCountry =  'in';

  onCountryChange(event: any) {
    console.log(event.dialCode);

  }

  private showLoader() {
    document.getElementById("exampleModal");
    // @ts-ignore
    document.getElementById("showmodal").click();
  }
}
