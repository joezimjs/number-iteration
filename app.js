Number.prototype[Symbol.iterator] = function* (incrementBy = 1, start = 0){
    var i = start,
        max = parseInt(this),
        step = 1;

    // iterate positively or negatively based on max
    incrementBy = Math.abs(parseInt(incrementBy) || 1) * (max < 0 ? -1 : 1);

    step = Math.abs((yield i) || 1);

    while ( i != max ) {
        if (max > 0)
            i = Math.min(max, i + incrementBy * step);
        else
            i = Math.max(max, i + incrementBy * step);

        step = Math.abs((yield i) || 1);
    }
};

Number.range = function (start, end, incrementBy = 1) {
    start = parseInt(start)
    end = parseInt(end)
    incrementBy = parseInt(incrementBy)

    return [...end[Symbol.iterator](incrementBy, start)];
}

var x = 9;

// Iterate over a number range
var arr = []
for (let i of x) {
    arr.push(i);
}
console.log(arr);

// Iterate into negative numbers
arr = []
for (let i of (-x)) {
    arr.push(i);
}
console.log(arr);

// spread a number range
console.log( ...x );

// spread into an array
console.log( [...x] );

// increment by more than 1
console.log( ...x[Symbol.iterator](3) );

// set starting number
console.log( ...x[Symbol.iterator](1, 5) );
console.log( ...(-x)[Symbol.iterator](1, 5) );

// increment manually
var iter = x[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

// increment by multiple steps at a time
var iter = x[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next(3)); // 3 = number of steps
console.log(iter.next(3));
console.log(iter.next(3));
console.log(iter.next(3));

console.log(Number.range(0, 48, 4));

// Iterate over a number range
arr = []
for (let i of Number.range(1, 10)) {
    arr.push(i);
}
console.log(arr);

export default {};