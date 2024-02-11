import { useContext, useEffect, useRef } from "react"
import { MathTypeContext, SkillContext } from "../App"

export function CalculationForm() {
  const { skillLevel, setSkillLevel } = useContext(SkillContext)
  const { mathType, setMathType } = useContext(MathTypeContext)
  const answerRef = useRef(null)

  useEffect(() => {
    answerRef.current.focus()
  }, [setSkillLevel])

  const randomNumber1 = Math.floor(Math.random() * skillLevel.multiplier)
  const randomNumber2 = Math.floor(Math.random() * skillLevel.multiplier)
  const operation = mathType.operation
  const divisibleNumber = generateDivisibleNumber()

  function generateDivisibleNumber() {
    let divisibleNumber
    do {
      divisibleNumber = generateRandomNumber()
    } while (randomNumber1 % divisibleNumber != 0)
    return divisibleNumber
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * skillLevel.multiplier)
  }

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
        correctResult = randomNumber1 / divisibleNumber
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
    console.log(correctResult)

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
          <input
            type="number"
            value={operation === "/" ? divisibleNumber : randomNumber2}
            disabled
            id="box2"
          />
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
