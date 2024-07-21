import { useFetch } from "../hooks/useFetch.jsx";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Timer from "./Timer.jsx";

const getLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  if (Number(JSON.parse(storedValue)) === 0) {
    return 0;
  } else {
    return Number(JSON.parse(storedValue));
  }
};

const initialState = {
  index: 0,
  answer: null,
  points: 0,
  highScore: getLocalStorage("high Score"),
};

const reducer = (curState, action) => {
  switch (action.type) {
    case "setAnswer":
      return {
        ...curState,
        answer: action.payLoad.option,
        points: curState.points + action.payLoad.point,
      };
    case "next":
      return {
        ...curState,
        index: curState.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...curState,
        highScore:
          curState.points > curState.highScore
            ? curState.points
            : curState.highScore,
      };
    case "reset":
      return {
        ...initialState,
      };
    default:
      throw new Error("Invalid Action");
  }
};
export default function App() {
  const [questions, status, secondsRemaining, dispatchFetch] = useFetch(
    "https://mocki.io/v1/67d38f0a-7e54-4708-9f26-d5afc41b1e85"
  );

  const [{ index, answer, points, highScore }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    localStorage.setItem("high Score", JSON.stringify(highScore));
  }, [highScore]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "success" && (
          <StartScreen
            numQuestions={questions.length}
            dispatch={dispatchFetch}
          />
        )}
        {status === "start" && (
          <>
            <Progress
              curQuestion={index}
              maxQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              answer={answer}
              dispatch={dispatch}
              index={index}
              maxQuestions={questions.length}
              dispatchFetch={dispatchFetch}
            />
            <Timer
              dispatch={dispatchFetch}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
            dispatchFetch={dispatchFetch}
          />
        )}
      </Main>
    </div>
  );
}
