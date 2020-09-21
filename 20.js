function Async(arr) {
    for (let i=0; i!=arr.length; i++) arr[i]().then(result => alert(result), error => alert(error));
}