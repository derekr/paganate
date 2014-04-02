var test = require('tap').test;
var paganate = require('./');

test('test page', function (t) {
    var wanted = [
        [0,0],
        [1,15],
        [2,30],
        [1,15],
        [0,0],
        [0,0]
    ];

    var p = paganate({
        limit: 15,
        total: 100
    });

    var call = 0;

    p.on('page', function (page, offset) {
        var w = wanted[call];

        t.equal(w[0], page, 'page number');
        t.equal(w[1], offset, 'offset');

        call++;
    });

    t.plan(12);

    p.next();
    p.next();
    p.next();
    p.prev();
    p.prev();
    p.prev();
});
