import {Result} from "./result";
import {TestResult} from "./testDto";

export interface EmployeeResultDto{
  name: string;
  tests:TestResult[];
}

export interface AdminEmployeeDto{
  name:string;
  employeeResults: EmployeeResultDto[];
}
