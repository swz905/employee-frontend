import {Question} from "./question";
import {Result} from "./result";

export interface TestDto{
  title: string;
  difficulty: string;
  questions: Question[];
}

export interface TestDtoModified{
  title: string;
  difficulty: string;
  score:number;
  attempted:boolean;
  questions: Question[];
}

export interface TestResult{
  title: string;
  difficulty: string;
  score:number;
  results:Result[];
}

