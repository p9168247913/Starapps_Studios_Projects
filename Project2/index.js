function min(fuel) {
    const n = fuel.length;
    if (n === 0) return -1;
    
    let hired = 0;
    let current = 0;
    let maximum = 0;
    let peviousPosition = 0;

    while (current < n - 1) {
        maximum = Math.max(maximum, current + fuel[current]);
        if (current === peviousPosition) {
            if (maximum <= current) {
                return -1;
            }
            hired++;
            peviousPosition = maximum;
            if (peviousPosition >= n - 1) {
                break;
            }
        }
        current++;
    }
    return hired;
}

console.log(min([2, 1, 2, 3, 1]));
console.log(min([1, 6, 3, 4, 5, 0, 0, 0, 6]));