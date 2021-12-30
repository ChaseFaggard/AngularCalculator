import { Operator } from "./enums";

export abstract class Token { constructor(public str: string) { } }
  
export class NumToken extends Token {
    constructor(
        str: string, 
        public value: number
    ) { super(str) }
}
  
export class OpToken extends Token {
    constructor(
        str: string,
        public operator: Operator
    ) { super(str) }
}