import { useContext } from "react"
import { MathTypeContext } from "../App"

export function ChooseMathType() {
  const { mathType, setMathType } = useContext(MathTypeContext)

  return (
    <div id="chooseMathType" className="flex">
      <button
        onClick={() => setMathType({ type: "addition", operation: "+" })}
        className={`${mathType.type == "beginner" && "active"} button`}
      >
        Addition
      </button>
      <button
        onClick={() => setMathType({ type: "subtraction", operation: "-" })}
        className="button"
      >
        Subtraction
      </button>
      <button
        onClick={() => setMathType({ type: "multiplication", operation: "*" })}
        className="button"
      >
        Multiplication
      </button>
      <button
        onClick={() => setMathType({ type: "division", operation: "*" })}
        className="button"
      >
        Division
      </button>
    </div>
  )
}
