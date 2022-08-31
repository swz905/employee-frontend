import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "../../shared/employee";
import {EmployeeService} from "../../services/data/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Location} from "@angular/common";
import {EmployeeDto} from "../../shared/employeeDto";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeDto[] = [];
  id!: number;
  @Input()
  name !: string;
  user = sessionStorage.getItem('authenticatorUser');
  nameFromUrl = this.route.snapshot.params['name']

  editEmployeeName: any;
  editEmployeeEmail: any;
  editEmployeePhone: any;

  employee = new EmployeeDto(0,'','','',0,'');


  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,) {
  }

  ngOnInit(): void {
    if (this.name === this.nameFromUrl) {
      this.getEmployees();
    }
  }

  public getEmployees(): void {
    this.employeeService.getAllEmployeesUnderManager(this.name).subscribe(
      response => {
        this.employees = response;
      },
      err => {
        if(err.status==404){
          alert("No Employee Found Under You");
        }
        else{
          this.router.navigate(['/error']);
        }
      });
  }

  onClickBack() {
    this.location.back();
  }

  private updateEmployee(employeeId: number, employee: EmployeeDto) {
    this.employeeService.updateEmployeeUnderManager(employeeId, employee).subscribe(
      (response: Employee) => {
        this.getEmployees()
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/error']);
      });

  }

  editEmployee(employee1: EmployeeDto) {

    this.employee.employee_id = employee1.employee_id;


  }

  onEmployeeModalSubmit(addEmployeeForm: NgForm) {

    this.employee.name = this.editEmployeeName;
    this.employee.email = this.editEmployeeEmail;
    this.employee.phoneNumber = this.editEmployeePhone;
    // console.log(this.employee.phoneNumber)

    this.updateEmployee(this.employee.employee_id, this.employee);


  }
}
