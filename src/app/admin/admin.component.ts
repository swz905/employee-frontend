import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  name =this.route.snapshot.params['name'];
  hideEmployeeList = true;

  ngOnInit(): void {
  }

  onClickCreate(){
    this.router.navigate(["./add-question"]);
  }

  showEmployees(){
    this.hideEmployeeList = false;
  }

  hideEmployees() {
    this.hideEmployeeList = true;
  }
}
