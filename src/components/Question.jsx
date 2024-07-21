/* eslint-disable react/prop-types */

export default function Question({ question, answer, dispatch }) {
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

const Options = ({ question, answer, dispatch }) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${option === answer ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => {
            dispatch({
              type: "setAnswer",
              payLoad: {
                option,
                point:
                  question.correctOption === i ? Number(question.points) : 0,
              },
            });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
