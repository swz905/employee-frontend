import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {AdminService} from "../../services/data/admin.service";
import {Employee} from "../../shared/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {Reportee} from "../../shared/reportee";
import {NgForm} from "@angular/forms";
import {Manager} from "../../shared/manager";
import {EmployeeService} from "../../services/data/employee.service";
import {EmployeeDto} from "../../shared/employeeDto";
import {Test} from "../../shared/testmodel";
import {QuestionService} from "../../services/data/question.service";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  employees: Reportee[] = [];
  // employee!: Employee;
  editEmail: any;
  editName: any;
  editPhone: any;

  manager = new Manager(0,'','','',0,'',[]);
  employee = new EmployeeDto(0,'','','',0,'');

  id!: number;
  @Input()
  name !: string;
  user = sessionStorage.getItem('authenticatorUser');
  nameFromUrl = this.route.snapshot.params['name']
  editEmployeeName: any;
  editEmployeeEmail: any;
  editEmployeePhone: any;
  emailOfEmployee :any;


  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute,
              private employeeService: EmployeeService ,
              private questionService: QuestionService,) {
  }

  ngOnInit(): void {
    if (this.name === this.nameFromUrl) {
      this.getEmployees();

    }
  }

  onSubmitAddTest(form:NgForm){

    const test:Test = {
      difficulty: form.value.difficulty,
      title: form.value.title,
      email:this.emailOfEmployee,
      attempted:false
    }
    this.questionService.addTest(test).subscribe(
      response => {
        alert("Test is created Successfully")
      },
      err => {
        alert("Can't Create Test")
      }
    );
  }

  public getEmployees(): void {
    this.adminService.getEmployeeUnderAdmin(this.name).subscribe(
      response => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/error']);
      });
  }

  public updateManager(name: string, managerId: number, employee: Manager):any{
    this.adminService.updateManagerUnderAdmin(name,managerId,employee).subscribe(
      (response:Manager) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/error']);
      });
  }

  private updateEmployee( employeeId: number, employee: EmployeeDto) {
    this.employeeService.updateEmployeeUnderManager(employeeId,employee).subscribe(
      (response:Employee) => {
        this.getEmployees()
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/error']);
      });

  }

  onModalSubmit(ngForm:NgForm) {
    this.manager.name = this.editName;
    this.manager.email = this.editEmail;
    this.manager.phoneNumber = this.editPhone;

    this.updateManager(this.name,this.manager.manager_id,this.manager)

  }


  editManager(manager1: Reportee) {

    this.manager.manager_id = manager1.manager_id;


  }

  onAddEmployee(addForm: NgForm) {

    // console.log(addForm.value);

  }


  editEmployee(employee1: EmployeeDto) {

    // console.log(employee1);
    this.employee.employee_id= employee1.employee_id;


  }

  onEmployeeModalSubmit(addEmployeeForm: NgForm) {

    this.employee.name = this.editEmployeeName;
    this.employee.email = this.editEmployeeEmail;
    this.employee.phoneNumber= this.editEmployeePhone;
    // console.log(this.employee.phoneNumber)

    this.updateEmployee(this.employee.employee_id,this.employee);


  }


  getEmployeeEmail(innerText: string) {
    this.emailOfEmployee = innerText;
  }
}
