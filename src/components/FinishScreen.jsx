/* eslint-disable react/prop-types */
function FinishScreen({
  points,
  maxPoints,
  highScore,
  dispatch,
  dispatchFetch,
}) {
  const percentage = Math.ceil((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <div className="result">
        <p>
          <span>{emoji}</span>
          {`You got ${points} out of ${maxPoints} points that is ${percentage} percentage !`}{" "}
          <br />
        </p>
      </div>
      <p className="highscore">High Score: {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatchFetch({ type: "reset" });
          dispatch({ type: "reset" });
        }}
      >
        Reset
      </button>
    </>
  );
}

export default FinishScreen;
