const iterations300 = [...Array(300).keys()];
const iterations = [...Array(Number(process.env.ITERATIONS_NUMBER)).keys()];

module.exports = {
  iterations300,
  iterations,
};