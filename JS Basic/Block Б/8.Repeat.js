function multiplyOrThrow(a, b) {
    if (Math.random() < 0.5) {
      return a * b;
    } else {
      throw 'MultiplicatorUnitFailure';
    }
}
function errCatch(a, b) {
    try {
        return multiplyOrThrow(a, b); 
    } catch(err) {
        return err;
    }
}
function success(a, b) {
    var Catch = errCatch(a, b);
    var d = typeof Catch;
    if (d == 'string') {
        return success(a, b);
    } else {
        return Catch;
    }
}
console.log(success(3, 5));