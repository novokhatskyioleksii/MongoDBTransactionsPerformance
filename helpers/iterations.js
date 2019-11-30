const iterations300 = [...Array(300).keys()];
const iterations = [...Array(process.env.ITERATIONS_NUMBER).keys()];

module.exports = {
  iterations300,
  iterations,
};