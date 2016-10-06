let queueRunner = require('queue-runner').default;

function qRunnerfn(item, next) {
  console.log('queue length: ' + queue.length + '. run item: ' + item);
  setTimeout(() => {
    next();
  }, 100);
}

let queue = new queueRunner(qRunnerfn, () => {
  console.log('queue finish!');
});

for(let item = 0; item < 5; item++) {
  console.log('-> queue item: ' + item);
  queue.push(item);
}
