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
    let isCorrect

    switch (operation) {
      case "+":
        correctResult = randomNumber1 + randomNumber2
        break
      case "-":
        correctResult = randomNumber1 - randomNumber2
        break
      case "x":
        correctResult = randomNumber1 * randomNumber2
        break
      case "/":
        correctResult = randomNumber1 / randomNumber2
        break
    }

    if (parseInt(answerRef.current.value, 10) === correctResult) {
      isCorrect = true
      alert("You're correct!")
    } else {
      isCorrect = false
      alert("Whoops try again!")
    }
    answerRef.current.value = ""

    if (isCorrect) {
      //setting state just to force rerender to create new random #'s
      setSkillLevel({ ...skillLevel })
    }
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <div className="labelInput">
          <label htmlFor="box1">Number</label>
          <input value={randomNumber1} type="number" disabled id="box1" />
        </div>

        <div className="operator">{operation}</div>

        <div className="labelInput">
          <label htmlFor="box2">Number</label>
          <input type="number" value={randomNumber2} disabled id="box2" />
        </div>

        <div className="operator">=</div>

        <div className="labelInput">
          <label htmlFor="answerBox">Answer</label>
          <input type="number" id="answerBox" ref={answerRef} />
        </div>

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}
