import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../services/data/employee.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  name =this.route.snapshot.params['name'];

  user = sessionStorage.getItem('authenticatorUser');
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {

  }

}
