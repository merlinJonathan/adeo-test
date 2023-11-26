const mainData = require('../adeo-test/resources/data.js');

main();

function getFilterValue() {
    const args = process.argv.slice(2);
    const filterArg = args.find(arg => arg.startsWith('--filter='));
    return filterArg ? filterArg.split('=')[1] : '';
}

function verifyAnimal(animalName, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(animalName);
}

function main() {
    const filterValue = getFilterValue();
    if(filterValue.length === 0) {
        return [];
    }

    let countriesConfirmed = [];
    for(let country of mainData.data) {
        let confirmedPeople = getConfirmedPeople(country.people, filterValue);

        if(confirmedPeople.length > 0) {
            let countryName = getName(country.name, confirmedPeople.length);
            let finalCountry = {
                name: countryName,
                people: confirmedPeople
            }
            countriesConfirmed.push(finalCountry);
        }
    }

    console.log(JSON.stringify(countriesConfirmed));
    return countriesConfirmed;
}

function getConfirmedPeople(peopleArray, filterValue) {
    if(peopleArray === null) {
        return [];
    }

    let confirmedPeople = [];
    for(let people of peopleArray) {
        let confirmedAnimal = getConfirmedAnimal(people.animals, filterValue);

        if(confirmedAnimal.length > 0) {
            let finalPeople = {
                name: getName(people.name, confirmedAnimal.length),
                animals: confirmedAnimal
            }
            confirmedPeople.push(finalPeople);
        }
    }
    return confirmedPeople;
}

function getConfirmedAnimal(animalArray, filterValue) {
    if(animalArray === null) {
        return [];
    }

    let confirmedAnimal = [];
    for(let animal of animalArray) {
        if(verifyAnimal(animal.name, filterValue)) {
                confirmedAnimal.push(animal);
        }
    }

    return confirmedAnimal;
}

function getName(originalName, counter) {
    return originalName + ' [' + counter + ']'
}

module.exports = {
    verifyAnimal,
    main
};