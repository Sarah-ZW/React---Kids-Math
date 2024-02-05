import { useContext, useRef } from "react"
import { MathTypeContext, SkillContext } from "../App"

export function CalculationForm() {
  const { skillLevel, setSkillLevel } = useContext(SkillContext)
  const { mathType, setMathType } = useContext(MathTypeContext)
  const answerRef = useRef(null)

  const randomNumber1 = Math.floor(Math.random() * skillLevel.multiplier)
  const randomNumber2 = Math.floor(Math.random() * skillLevel.multiplier)
  const operation = mathType.operation

  function onSubmit(e) {
    e.preventDefault()
    
    let correctResult

    switch(operation) {
      case '+':
        correctResult = randomNumber1 + randomNumber2
      break
      case '-':
        correctResult = randomNumber1 - randomNumber2
        break
      case '*':
        correctResult = randomNumber1 * randomNumber2
        break
      case '/':
        correctResult = randomNumber1 / randomNumber2
        break
    }

    if (parseInt(answerRef.current.value, 10) === correctResult) {
      alert("You're correct!")
    } else {
      alert("Whoops try again!")
    }
    answerRef.current.value = ''
    //todo refresh the page
  }

  return (
    <>
    <div>{mathType.type}</div>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="box1">Number</label>
        <input value={randomNumber1} type="number" disabled id="box1" />
        <label htmlFor="box2">Number</label>
        <input type="number" value={randomNumber2} disabled id="box2" />
        <div>=</div>
        <label htmlFor="answerBox">Answer (numbers only)</label>
        <input type="number" id="answerBox" ref={answerRef} />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}
