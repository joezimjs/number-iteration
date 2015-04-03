# Iterable Numbers

A tiny function that allows iterating over numbers and ranges of numbers. This work was inspired by (Iterating ES6 Numbers)[http://blog.getify.com/iterating-es6-numbers/].

## Augmenting the Prototype

By augmenting the prototype of the built-in `Number`, we can add an iterator to it (via [Symbol.iterator]). By doing this, anything that interacts directly with an iterator can get that iterator straight off of a number literal. The iterator is designed, by default, to use the number provided as the upper limit (or lower limit in the case of a negative number) of the number range, and will start from zero and increment (decrement for negatives) by 1 until it gets to the limit.

## Default Iteration

`for..of` loops and the spread operator (`...`) both interact implicitly with iterators. So we can do a simple `for..of` loop and "loop over an integer". For example:

```js
for (let i of 3) {
    console.log(i);
}

/* Outputs:
 * 0
 * 1
 * 2
 * 3
 */
```

The same thing works with `...`:

```js
console.log(...3);

/* Outputs:
 * 0 1 2 3
 */
```

This also works with negative numbers:

```js
for (let i of (-3)) {
    console.log(i);
}

/* Outputs:
 * 0
 * -1
 * -2
 * -3
 */

console.log(...(-3));

/* Outputs
 * 0 -1 -2 -3
 */
```

In general, you'll need to wrap the number in parenthesis to avoid a syntax error.

## Customized Iteration
If you want to customize the start value and/or the number you are incrementing by, you can call the `[Symbol.iterator]` method yourself and pass in some arguments to adjust it.

The first argument is the "step" size (e.g. the amount you are incementing/decrementing by) and the second argument is the starting value. To count from 0 to 9 by 3's, you can pass a 3 in as the first argument:

```js
console.log( ...9[Symbol.iterator](3) );

/* Outputs
 * 0 3 6 9
 */

console.log( ...(-9)[Symbol.iterator](3) );

/* Outputs
 * 0 -3 -6 -9
 */
```

You should always use a positive number for the step size. The step direction will be determined by the limit's value relative to the start value.

If you want to start at a number other than zero, specify the second argument. The default step size is 1, so make sure you put a 1 in for the first argument if you don't want to change it.

```js
console.log( ...9[Symbol.iterator](1, 3) );

/* Outputs
 * 3 4 5 6 7 8 9
 */

console.log( ...(-9)[Symbol.iterator](1, 3) );

/* Outputs
 * 3 2 1 0 -1 -2 -3 -4 -5 -6 -7 -8 -9
 */
```

## Building Arrays

If you use the spread operator inside an array literal, you can create an array of all the values in the range:

```js
console.log( [...9] );

/* Outputs
 * [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */

console.log( [...(-9)[Symbol.iterator](1, 3)] );

/* Outputs
 * [3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
 */
```

## `Number.range` Helper

Since writing `[...(-9)[Symbol.iterator](1, 3)]` is ugly and difficult to comprehend, I also created a helper method to make the edge cases more readable: `Number.range`. It can take 2 or 3 arguments:

1. The number you want to start the range at.
2. The number you want to end the range at.
3. (Optional, default = 1) The step size

The method will return an array with all the numbers in that range. This is far more readable and more terse than using `[Symbol.iterator]` on a numeric literal. You may need to explicitly state the start number, but it's clearer and making the step argument last tends to help limit the number of arguments you need to pass. Let's take a look at some equivalent examples:

```js
// If you don't need [Symbol.iterator], then the only reason you
// would use Number.range is clarity. Definitely not terseness.
[...5]
Number.range(0, 5);
// -> [0, 1, 2, 3, 4, 5]

[...(-9)[Symbol.iterator](1, 3)]
Number.range(3, -9)
// -> [3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9]

[...9[Symbol.iterator](3)]
Number.range(0, 9, 3)
// -> [0, 3, 6, 9]
```

You may note that `Number.range` is returning an array instead of just the iterator. This might seem like a nuisance at first, but it's actually a feature, since arrays are more readily usable, and they themselves are already iterable, so they can do the exact same thing as the iterable number: you can iterate over them in `for..of` loops and you can apply the spread operator to them as well.

As a final note, which may already have been obvious, you can iterate in any direction, regardless of whether there are any negative numbers in the range. If you want to count backwards from 10 down to 0, then just make 10 the start number and 0 the end number:

```js
[...0[Symbol.iterator](1, 10)]
// or
Number.range(10, 0);
```

## Installation and Execution

This module is written in ES6 aka ES2015 (of course), and there's honestly no reason for you to be using it without you yourself already writing ES6, so it remains uncompiled. If you're not using an ES6 workflow, don't use this!

To install, just clone the repo and then run `npm run setup`. If you want to execute a sample app that demos several ways of using this module, you can use `npm start` and the console should throw out a bunch of number lists and arrays of numbers.

This is currenlty not published on NPM, so if you want to use the module in your Node apps, then please just clone the repo and copy `src/range.js` to your js files, or just download the `src/range.js` file straight from the Github page to your projects.