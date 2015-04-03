Number.prototype[Symbol.iterator] = function* (incrementBy = 1, start = 0){
    var end = +this; // convert this Number object to a number primitive
    var step = 1;
    var current = start;
    var direction = end > current ? 1 : -1;

    // iterate positively or negatively based on end
    incrementBy = Math.abs(incrementBy || 1) * direction;

    // yield the initial value before incrementing
    step = Math.abs((yield current) || 1);

    // continue incrementing until we've reached `end`
    while ( current != end ) {
        if (direction === 1)
            current = Math.min(end, current + incrementBy * step);
        else
            current = Math.max(end, current + incrementBy * step);

        step = Math.abs((yield current) || 1);
    }
};

Number.range = function (start, end, incrementBy = 1) {
    return [...end[Symbol.iterator](incrementBy, start)];
}

export default Number.range;