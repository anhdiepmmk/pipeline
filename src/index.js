const _ = require("lodash");

const pipeline = (configurations) => {
  const startedValue = _.get(configurations, "startedValue");
  const layers = _.get(configurations, "layers", []);

  const executors = _.map(layers, "executor");

  return executors.reduce((currentValue, currentExecutor) => {
    return currentValue.then(currentExecutor);
  }, Promise.resolve(startedValue));
};

module.exports = {
  pipeline,
};
