
module.exports.merge = function merge(arr1, arr2) {
    let arr = [];
    arr=arr1.concat(arr2);
    return Array.from(new Set(arr));
}
