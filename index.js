var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;

var DEFAULT_LIMIT = 10;
var DEFAULT_TOTAL = 0;

var noop = function () {};

function cap (val) {
    if (val < 0) return 0;

    return val;
}

function range (start, end) {
    var range = [];

    for (var i = start; i <= end; i++) {
        range.push(i);
    }

    return range;
}

function Paganate (options) {
    options = options || {};

    this.curr = 0;
    this._first = true;

    if (typeof options.limit === 'undefined') options.limit = DEFAULT_LIMIT;
    if (typeof options.total === 'undefined') options.total = DEFAULT_TOTAL;

    this.limit = parseInt(options.limit, 10);
    this.total = parseInt(options.total, 10);

    if (isNaN(this.limit)) throw new Error('limit must be an integer');
    if (isNaN(this.total)) throw new Error('total must be an integer');

    this.pageCount = 0;
    this.pageRange = [0];

    if (this.total) this.pageCount = Math.ceil(this.total / this.limit);
    if (this.pageCount) this.pageRange = range(0, this.pageCount);
};

inherits(Paganate, Emitter);

Paganate.prototype.page = function (pg) {
    if (this.pageCount > 0 && pg > this.pageCount) {
        throw new Error('Page out of range');
    }

    if (this._first) this._first = false;

    this.curr = cap(pg);
    this.emit('page', this.curr, this.offset());
};

Paganate.prototype.next = function () {
    if (this._first) {
        this.curr = -1; // trick in to triggering page at 0
    }

    this.page(this.curr + 1);
}

Paganate.prototype.prev = function () {
    this.page(this.curr - 1);
}

Paganate.prototype.offset = function () {
    return this.limit * this.curr;
};

module.exports = function (limit, total) {
    return new Paganate(limit, total);
};
