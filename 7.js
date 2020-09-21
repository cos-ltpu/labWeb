function merge(arr1, arr2) {
    let arr = [];
    arr.concat(arr1, arr2);
    arr = Array.from(new Set(arr));
}