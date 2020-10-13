module.exports.isObject = function isObject(obj) {
    if ((typeof obj == "object") & (obj != null)) return true;
    else return false;
}