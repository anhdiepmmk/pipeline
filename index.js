const pipe =
  (...functions) =>
  (startedValue) => {
    functions.reduce((currentValue, currentFunction) => {
      return currentFunction(currentValue);
    }, startedValue);
  };

const pipeAsync =
  (...functions) =>
  (startedValue) =>
    functions.reduce(
      (currentValue, currentFunction) => currentValue.then(currentFunction),
      Promise.resolve(startedValue)
    );

module.exports = {
  pipe,
  pipeAsync,
};
