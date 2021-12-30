import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Operator } from './enums'
import { Token, NumToken, OpToken } from './classes'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public get Operator(){ return Operator }
  
  output: string = ''

  concat = (str1: string, str2: string): string => {
    if(str1 === 'Error') str1 = ''
    return str1 + str2
  }

  clear = (): void => { this.output = '' }

  getStrTokens = (str: string): string[] => str.split(' ')

  getTokens = (tokens: string[] | string): Token[] | boolean => {
    let result: Token[] = []
    if(typeof tokens == 'string') tokens = this.getStrTokens(tokens)
    for(let str of tokens) {
      let token:OpToken | NumToken
      if(/^-?\d+$/.test(str) == false) {
        const opToken: OpToken =  new OpToken(str, Operator.UNKNOWN)
        switch(str) {
          case '+':
            opToken.operator = Operator.ADD
            break
          case '-':
            opToken.operator = Operator.SUBTRACT
            break
          case '*':
            opToken.operator = Operator.MULTIPLY
            break
          case '/':
            opToken.operator = Operator.DIVIDE
            break
          default:
            opToken.operator = Operator.UNKNOWN
            return false
        }
        token = opToken
      }
      else { // Number
        const numToken: NumToken = new NumToken(str, +str)
        token = numToken
      }
      result.push(token)
    }
    return result
  }

  /* Returns true if matches correct pattern of numToken -> opToken -> numToken opToken ... */
  checkTokenPattern = (tokens: Token[]): boolean => {
    return tokens.length >= 3 &&  // Make sure 3 tokens are present
      tokens[tokens.length-1] instanceof NumToken && // Make sure last element is a number not operator
      tokens.every((token:Token, i:number) => { // Make sure token type alternates
        if(i%2 == 0) return token instanceof NumToken
        else return token instanceof OpToken
      })
  }

  calculate = (equation: string): number | boolean => {

    let result = 0

    const strTokens: string[] = this.getStrTokens(equation)
    const tokens: Token[] | boolean = this.getTokens(strTokens)

    if(tokens) {
      const tkns: Token[] = tokens as Token[]
      if(this.checkTokenPattern(tkns)) { // If pattern passes
        for(let i = 0; i < tkns.length; i++) {
          if(i%2 == 1) { // Every other token is an operator token...
            const num1 = i == 1 ? (tkns[i-1] as NumToken).value : result
            const num2 = (tkns[i+1] as NumToken).value
            switch((<OpToken>tkns[i]).operator) {
              case Operator.ADD:
                result = this.add(num1, num2)
                break
              case Operator.SUBTRACT:
                result = this.subtract(num1, num2)
                break
              case Operator.MULTIPLY:
                result = this.multiply(num1, num2)
                break
              case Operator.DIVIDE:
                if(num2 == 0) {
                  this.output = 'Error'
                  return false
                }
                result = this.divide(num1, num2)
                break
              case Operator.UNKNOWN:
                return false
            }
          }
        }
        this.output = result.toString()
        return result
      } 
    } 
    this.output = 'Error'
    return false
  }

  add = (x:number, y:number): number => x+y
  subtract = (x:number, y:number): number => x-y
  multiply = (x:number, y:number): number => x*y
  divide = (x:number, y:number): number => x/y

}
