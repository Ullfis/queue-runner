# queue-runner

A module to run queue on items.<br />
Define function to run for each item.
You can also add a function to run after queue is finish. Push items and queue will
start.


[Changelog](CHANGELOG.md)

## Install

```bash
npm i queue-runner --save
```

## Overview

```javascript
// constructor
let queue = new queueRunner(qRunnerFunction, qEndFunction?, qPauseFunction?);

// add item to queue and start if not running
queue.push(item);

// number of items in queue
let length = queue.length;

// pause queue
queue.pause();

// resume queue
queue.resume();

// set functions
queue.fnRunner = (item, next) => { next(); };
queue.fnEnd = () => {};
queue.fnPause = () => {};
```

## Example

```javascript
import queueRunner from 'queue-runner';

function qRunnerfn(item, next) {
  console.log('queue length: ' + queue.length + '. run item:', item);
  setTimeout(() => {
    next();
  }, 500);
}

let queue = new queueRunner(qRunnerfn, () => {
  console.log('queue finish!');
});

for(let item = 0; item < 5; item++) {
  console.log('-> queue item:', item);
  queue.push(item);
}
```

## Pause/resume

```javascript
import queueRunner from 'queue-runner';

let queue = new queueRunner((item, next) => {
  // queue function
  setTimeout(() => {
    if (item == 3) queue.pause();
    next();
  }, 500);

}, () => {
  // end function

}, () => {
  // pause function
  setTimeout(() => {
    queue.resume();
  }, 1500);
});

for(let item = 0; item < 5; item++) {
  queue.push(item);
}
```

## Project commands

#### Install dev dependencies

```bash
npm install
```

#### Build debug

```bash
npm run build
npm test
```

#### Build release

```bash
npm run build:prod
```

#### Bumping version and generate changelog

```bash
npm run release
git push --follow-tags origin
```

#### Commit Guidelines

See [standard-version](https://github.com/conventional-changelog/standard-version)
