import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {ResetPasswordDto} from "./ResetPasswordDto";
import {EmployeeService} from "../services/data/employee.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm!: FormGroup;
  public showSuccess!: boolean;
  public showError!: boolean;
  public errorMessage!: string;
  private _token!: string;
  private _email!: string;

  constructor(private employeeService: EmployeeService,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
    // @ts-ignore
    this.resetPasswordForm.get('confirm').setValidators([Validators.required,
      this.validateConfirmPassword]);

    this._token = this._route.snapshot.queryParams['token'];
    this._email = this._route.snapshot.queryParams['email'];
  }



  validateConfirmPassword: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    // @ts-ignore
    let pass = this.resetPasswordForm.get('password').value;
    console.log(pass);
    // @ts-ignore
    let confirmPass = this.resetPasswordForm.get('confirm').value
    console.log(confirmPass);
    return pass === confirmPass ? null : { notSame: true }
  }

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.controls[controlName].hasError(errorName)
  }
  public resetPassword = (resetPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const resetPass = {...resetPasswordFormValue};
    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      token: this._token,
      email: this._email
    }
    console.log(resetPassDto)
    this.employeeService.resetPassword(resetPassDto)
      .subscribe(_ => {
          this.showSuccess = true;
        },
        error => {
          this.showError = true;
          this.errorMessage = error;
        })
  }


}
