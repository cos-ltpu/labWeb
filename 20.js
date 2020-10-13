module.exports.Sync = async function Async(arr,str) {

    for (let i = 0; i < arr.length; i++){
        let p = new Promise( (resolve, reject ) => {
            arr[i](str)
            resolve(i+1)
        });
        const promisValue = await p;
        console.log("Step", promisValue)

    }

    return str
}