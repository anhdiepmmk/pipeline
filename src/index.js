const _ = require("lodash");

const pipeline = async (configurations) => {
  let payload = _.get(configurations, "startedValue");
  const layers = _.get(configurations, "layers", []);

  for (const layer of layers) {
    const executor = layer.executor;
    payload = await executor(payload);
  }
};

module.exports = {
  pipeline,
};
