/* eslint-disable react/prop-types */
function NextButton({ answer, dispatch, index, maxQuestions, dispatchFetch }) {
  if (index < maxQuestions - 1)
    return (
      <>
        {answer != null && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "next" })}
          >
            Next Question
          </button>
        )}
      </>
    );
  else if (index === maxQuestions - 1) {
    return (
      <>
        {answer != null && (
          <button
            className="btn btn-ui"
            onClick={() => {
              dispatchFetch({ type: "finish" });
              dispatch({ type: "finish" });
            }}
          >
            Finish
          </button>
        )}
      </>
    );
  }
}

export default NextButton;
