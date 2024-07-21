/* eslint-disable react/prop-types */
function Progress({ curQuestion, maxQuestions, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={maxQuestions}
        value={curQuestion + Number(answer != null)}
      />
      <p>
        Question <strong>{curQuestion + 1}</strong> / {maxQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
