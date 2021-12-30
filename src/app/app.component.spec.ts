import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Operator } from './enums';
import { OpToken, NumToken, Token } from './classes'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })

  it('Should concat 2 strings', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.concat('Hello', 'there')).toEqual('Hellothere')
  })

  it('Should concat 2 strings, converting str1 to nothing because it equals "Error"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.concat('Error', 'there')).toEqual('there')
  })

  describe('Basic Math Functions', () => {
    it('Should add two numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.add(5,3)).toEqual(8)
    })

    it('Should subtract two numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.subtract(5,3)).toEqual(2)
    })

    it('Should multiply two numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.multiply(5,3)).toEqual(15)
    })

    it('Should divide two numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.divide(6,3)).toEqual(2)
    })

  })

  describe('Advanced Math Functions', () => {
    it('Should add multiple numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.calculate('3 + 4 + 5 + 3 + 8')).toEqual(23)
    })

    it('Should multiply multiple numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.calculate('3 * 4 * 5 * 2')).toEqual(120)
    })

    it('Should divide multiple numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.calculate('10 / 2 / 5')).toEqual(1)
    })

    it('Should subtract multiple numbers', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.calculate('10 - 2 - 5 - 1')).toEqual(2)
    })

    it('Should calculate correctly 25 * 2 / 5 + 18 - 3', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.calculate('25 * 2 / 5 + 18 - 3')).toEqual(25)
    })
  })

  describe('Token Checks', () => {
    it('Should convert a str into an array of str tokens', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.getStrTokens('This is a token')).toEqual(['This', 'is', 'a', 'token'])
    })

    it('Should convert a str into an array tokens of instance Token', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.getTokens('55 + 3')).toEqual([
        new NumToken('55', 55), 
        new OpToken('+', Operator.ADD), 
        new NumToken('3', 3)
      ])
    })

    it('Should attempt to convert a str into an array of instance Token but encounter an error', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.getTokens('55 hi 3')).toEqual(false)
    })

    it('Should ensure checkTokenPattern works if pattern is right, has atleast 3 tokens and the last token is a NumToken', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.checkTokenPattern([
        new NumToken('5', 5),
        new OpToken('+', Operator.ADD),
        new NumToken('323', 323)
      ])).toEqual(true)
    })

    it('Should ensure checkTokenPattern returns false if pattern is wrong', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.checkTokenPattern([
        new NumToken('5', 5),
        new NumToken('323', 323),
        new OpToken('+', Operator.ADD)
      ])).toEqual(false)
    })

    it('Should ensure checkTokenPattern returns false for patterns less than 3', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.checkTokenPattern([
        new NumToken('5', 5),
        new OpToken('+', Operator.ADD)
      ])).toEqual(false)
    })

    it('Should ensure checkTokenPattern returns false if last token isnt a NumToken', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const app = fixture.componentInstance
      expect(app.checkTokenPattern([
        new NumToken('5', 5),
        new OpToken('+', Operator.ADD),
        new NumToken('5', 5),
        new OpToken('*', Operator.MULTIPLY)
      ])).toEqual(false)
    })

  })
});
