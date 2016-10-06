import queueRunner from '../../index';
import * as os from 'os';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('queue', () => {

  it("run", (done) => {

    // queue runner
    let queue = new queueRunner((item, next) => {

      setTimeout(() => {
        next();
      }, 500);

    }, done);

    // push items to queue
    for(let item = 0; item < 5; item++) {
      queue.push(item);
    }
  });

  it("example", (done) => {

    function qRunnerfn(item, next) {
      console.log('queue length: ' + queue.length + '. run item:', item);
      setTimeout(() => {
        next();
      }, 500);
    }

    let queue = new queueRunner(qRunnerfn, () => {
      console.log('queue finish!');
      done();
    });

    for(let item = 0; item < 5; item++) {
      console.log('-> queue item:', item);
      queue.push(item);
    }
  });

  it("pause/resume example", (done) => {
    let queue = new queueRunner((item, next) => {
      // queue function
      console.log(item);
      setTimeout(() => {
        if (item == 3) queue.pause();
        next();
      }, 500);

    }, () => {
      // end function
      done();

    }, () => {
      // pause function
      setTimeout(() => {
        queue.resume();
      }, 1500);
    });

    for(let item = 0; item < 5; item++) {
      queue.push(item);
    }
  });
});
