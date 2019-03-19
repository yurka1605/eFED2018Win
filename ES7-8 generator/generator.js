function * generateCityId(arrCity) {
    for (let i = 0; i <= arrCity.length-1; i++) {
        let id = i + 1;
        let city = arrCity[i];
        yield { id, city };
    }
}
const citys = ['London', 'Kursk', 'Minsk', 'Moscow', 'Paris'];
let generatorId = [...generateCityId(citys)];

for (let cityObj of generatorId) {
    console.log(cityObj);
}
