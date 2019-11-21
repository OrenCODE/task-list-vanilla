const arr = [100, 50, 20];

function atm(num) {
    let resultArr = [];

    for (let i = 0; i < arr.length; i++) {
        let x = num / arr[i];
        x = Math.floor(x);
        resultArr.push(x);
        num = num - x * arr[i];
    }
    return resultArr;
}

console.log(atm(590));
