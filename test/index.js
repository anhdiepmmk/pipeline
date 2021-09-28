const { pipeline } = require("../src/index");

const configurations = {
  name: 'an example pipe',
  startedValue: {
    message: "Hello",
  },
  hooks: {
    before: () => {},
    after: () => {},
    beforeEach: () => {},
    afterEach: () => {},
  },
  excuteStrategy: 'fifo', // fifo, lifo, parallel
  layers: [
    {
      name: "Layer 1",
      active: true,
      timeoutInMilliseconds: 3000,
      executor: (payload) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("this code run from layer 1", payload);
            return resolve(payload);
          }, 2000);
        });
      },
    },
    {
      name: "Layer 2",
      active: true,
      timeoutInMilliseconds: 3000,
      executor: (payload) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("this code run from layer 2", payload);
            return resolve(payload);
          }, 2000);
        });
      },
    },
  ],
};

pipeline(configurations)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
