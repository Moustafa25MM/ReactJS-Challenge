const ActionBar = (props) => {
  return (
    <>
      <button className="purpleButton" onClick={props.onPreviousClick}>
        Previous
      </button>
      <button className="purpleButton" onClick={props.onNextClick}>
        Next
      </button>
    </>
  );
};

export default ActionBar;
