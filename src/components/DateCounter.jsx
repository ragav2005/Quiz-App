import { useReducer } from "react";
const initialValue = { count: 0, step: 1 };
const reducer = (currState, action) => {
  try {
    switch (action.type) {
      case "inc":
        return { ...currState, count: currState.count + currState.step };
      case "dec":
        return { ...currState, count: currState.count - currState.step };
      case "setCount":
        return { ...currState, count: action.payload };
      case "setStep":
        return { ...currState, step: action.payload };
      case "reset":
        return initialValue;
      default:
        throw new Error("Undefined action type in reducer");
    }
  } catch (err) {
    console.log(err);
  }
};
function DateCounter() {
  const [combinedState, dispatch] = useReducer(reducer, initialValue);
  const { count, step } = combinedState;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
