# paganate
#### Pagination event emitter.

EventEmitter for pagination data. Only handle pagination logic and leaves
what to do on paging to the caller.

# Installation

```
npm install paganate
```

# Usage

```
var p = paganate({ limit: 5 });

p.on('page', function (page, offset) { ... });

p.next(); // 0, 0 - first call emits at 0, 0
p.next(); // 1, 5
p.next(); // 2, 10
p.next(); // 3, 15
p.prev(); // 2, 10
```

# API

## var p = paganate(options)

```js
var options = {
    limit: 10, // items per page
    total: 100 // optional total
}
```

## p.next()

Will increment the current page and emit a `page` event.

## p.prev()

Will decrement the current page and emit a `page` event.
Will not decrement past 0.

# Events

## p.on('page', page, offset)

Emitted whenever `next` or `prev` are called.
