const _ = require("lodash");

class TimeoutError extends Error {}

const pipeline = async (configurations) => {
  let payload = _.get(configurations, "startedValue");
  const layers = _.get(configurations, "layers", []);

  for (const layer of layers) {
    const { executor, timeoutInMilliseconds, name } = layer;

    const values = [executor(payload)];

    if (timeoutInMilliseconds) {
      const timeout = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new TimeoutError(name));
        }, timeoutInMilliseconds);
      });

      values.push(timeout);
    }

    payload = await Promise.race(values);
  }

  return payload;
};

module.exports = {
  pipeline,
  TimeoutError,
};
