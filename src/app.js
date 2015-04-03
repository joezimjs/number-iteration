import range from './range';

function loop (iterable) {
    var arr = [];
    for (let i of iterable) {
        arr.push(i);
    }
    console.log(arr);
}

var x = 9;

// Iterate over a number range
loop(x);

// Iterate into negative numbers
loop(-x);

// spread a number range
console.log( ...x );

// spread into an array
console.log( [...x] );

// increment by more than 1
console.log( ...9[Symbol.iterator](3) );

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
console.log(iter.next());
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

// using Number.range for more clarity
console.log(...Number.range(5, x));
console.log(...Number.range(0, x, 3));

// Iterate over a Number.range, since it is an array
loop(Number.range(0, x, 3));

// Counting backwards
console.log([...0[Symbol.iterator](1, x)]);
console.log(...Number.range(x, 0));