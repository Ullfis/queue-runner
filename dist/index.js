"use strict";
var default_1 = (function () {
    function default_1(fnRunner, fnEnd, fnPause) {
        this.fnRunner = fnRunner;
        this.fnEnd = fnEnd;
        this.fnPause = fnPause;
        this.items = [];
        this.queueRunning = false;
        this.pauseQueue = false;
    }
    default_1.prototype.push = function (item) {
        this.items.push(item);
        this.startQueue();
    };
    Object.defineProperty(default_1.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    default_1.prototype.pause = function () {
        this.pauseQueue = true;
    };
    default_1.prototype.resume = function () {
        this.pauseQueue = this.queueRunning = false;
        this.startQueue();
    };
    default_1.prototype.startQueue = function () {
        if (this.queueRunning)
            return;
        this.queueRunning = true;
        var that = this;
        function stopQueue() {
            that.queueRunning = false;
            if (that.fnEnd)
                that.fnEnd();
        }
        function queue() {
            if (that.items.length < 0) {
                stopQueue();
                return;
            }
            if (that.pauseQueue) {
                if (that.fnPause)
                    that.fnPause();
                return;
            }
            var item = that.items.shift();
            if (item === undefined) {
                stopQueue();
                return;
            }
            that.fnRunner(item, queue);
        }
        queue();
    };
    return default_1;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
