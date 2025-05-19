// var timeLimit = function (fn, t) {
//   return async function (...args) {
//     return new Promise((resolve, reject) => {
//       const id = setTimeout(() => {
//         reject("Time exceeded Limit");
//       }, t);
//       fn(...args)
//         .then((value) => {
//           resolve(value);
//         })
//         .catch((err) => reject(err))
//         .finally(() => clearTimeout(id));
//     });
//   };
// };

// const fn1 = async (n) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(n * n);
//     }, 100);
//   });
// };
// const inputs = [5];
// const t = 50;

// const limited = timeLimit(fn1, t);

// limited(...inputs)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// var timeLimit = function (fn, t) {
//   return async function (...args) {
//     return new Promise((resolve, reject) => {
//       const id = setTimeout(() => {
//         reject("Time Limit Exeeded");
//       }, t);

//       fn(...args)
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           clearTimeout(id);
//         });
//     });
//   };
// };

// const fn1 = async (n) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(n * n);
//     }, 100);
//   });
// };

// const t = 150;
// const inputs = [5];

// const limited = timeLimit(fn1, t);

// limited(...inputs)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//using async/await inside

var timeLimit = function (fn, t) {
  return async function (...args) {
    return new Promise(async (resolve, reject) => {
      const id = setTimeout(() => {
        reject("Time Limit Exeeded");
      }, t);
      try {
        const res = await fn(...args);
        resolve(res);
      } catch (error) {
        reject(error);
      }
      clearTimeout(id);
    });
  };
};

const fn = async (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 120);
  });
};

const inputs = [5, 10];
const t = 150;

const limited = timeLimit(fn, t);
const start = performance.now();

let result;

const run = async () => {
  try {
    const res = await limited(...inputs);
    result = {
      resolved: res,
      time: Math.floor(performance.now() - start),
    };
  } catch (error) {
    result = {
      rejected: error,
      time: Math.floor(performance.now() - start),
    };
  }
  console.log(result);
};

run();
