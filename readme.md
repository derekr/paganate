![](https://raw.githubusercontent.com/derekr/paganate/master/paganate.png)

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

## p.page(pg)

Will jump to the provided page. If `total` is provided in the options then
this will throw an error if the page is larger than the calculated pages.

```
var p = paganate({ limit: 15, total: 30 });

p.page(2); // last page
p.page(3): // throws error
```

## p.pageCount

If `total` is provided in the options then this will be a the number of
calculated pages.

## p.pageRange

If `total` is provided in the options then this will be an array of all
page numbers. Convenient for rendering a list of pages for ui pagination.

# Events

## p.on('page', page, offset)

Emitted whenever `next` or `prev` are called.

# License

MIT

# Note

Not sure where the pizza pentagram img comes from, but if you
know I'd like to credit them!
