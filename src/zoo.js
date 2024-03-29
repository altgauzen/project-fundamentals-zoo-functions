const { species, prices, hours } = require('./data');
const data = require('./data');

const { employees } = data;

function getSpeciesByIds(...ids) {
  return ids.map((id) => data.species.find((specie) => specie.id === id));
  // rest transforma em um array
  // map criou outro array
  // para tirar um único e determinado elemento do array usei o find
}

function getAnimalsOlderThan(animal, age) {
  const residentAges = data.species.find(
    (specie) => specie.name === animal,
  ).residents;
  return residentAges.every((resident) => resident.age >= age);
  // data é objeto, .species retorna array.
  // Fiz este requisito acompanhando o raciocinio do Nikolai no plantão do Panta no dia 30/06.
}

function getEmployeeByName(employeeName) {
  // Inspirado em Code Review do Rafael Nery Machado
  // entender melhor a desestruturacao
  // const { employees } = data;
  // console.log(employees);
  return (
    employees.find(
      ({ firstName, lastName }) =>
        firstName === employeeName || lastName === employeeName,
    ) || {}
  );
}

function createEmployee(personalInfo, associatedWith) {
  // executado acompanhando mentoria do Cajueiro dia 1.
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // o some percorre cada funcionario
  // executado acompanhando mentoria do Cajueiro dia 1.
  // fiz destructuring no managers para fazer
  // verificacao se inclui o id passado pela funcao.
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // executado acompanhando mentoria do Cajueiro dia 1.
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function countAnimals(speciesPar) {
  // Me inspirei na primeira metade do meu código com o código de Rafael Nery Machado, no Github.
  if (!speciesPar) {
    return species.reduce((acc, { name, residents }) =>
      ({ ...acc, [name]: residents.length }),
    {});
  }
  return species.find(({ name }) => name === speciesPar).residents.length;
}

function calculateEntry({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  // mind blowing na sala do Panta para usar default values
  return (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function getAnimalMap(options) {
  // seu código aqui
}

//  const { open, close } = hours;
/*  const cronogram = ({ open, close }) => {
  if (open === close) {
    return `CLOSED`;
  }
  return `Open from ${open}am until ${close - 12}pm`;
};  */

function getSchedule(dayName) {
  // seu código aqui
  if (!dayName) {
    return {
      Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
      Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
      Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
      Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
      Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
      Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
      Monday: 'CLOSED',
    };
  }
  if (dayName === 'Monday') return { Monday: 'CLOSED' };
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  /*  const firstSpecies = employees.find(({ id: currId }) => currId === id).responsibleFor[0];
  const {name, sex, age} = residents;
  const oldestSpecies = [firstSpecies.residents.name, firstSpecies.residents.sex, firstSpecies.residents.age];
  return oldestSpecies;  */
}

function increasePrices(percentage) {
  // Forma que o Rafael Nery Machado fez bem simples:
  /*  prices.Adult = Math.ceil(prices.Adult * (100 + percentage)) / 100;
  prices.Senior = Math.ceil(prices.Senior * (100 + percentage)) / 100;
  prices.Child = Math.ceil(prices.Child * (100 + percentage)) / 100;
  */
  // Dica do Mayu ao usar Object.entries:
  Object.entries(prices).forEach((element) => {
    const key = element[0];
    prices[key] = Math.ceil(element[1] * (100 + percentage)) / 100;
  });
}

function getEmployeeCoverage(idOrName) {
  // acompanhei Filipe Guto na mentoria do Cajueiro e segui o mesmo raciocinio, porem fiquei com algumas dificuldades de entendimento do código
  const newObj = {};
  species.forEach((specie) => { newObj[specie.id] = specie.name; });
  const obj = {};
  employees.forEach((emp) => {
    obj[`${emp.firstName} ${emp.lastName}`] = emp.responsibleFor.map((name) => newObj[name]);
  });
  if (!idOrName) return obj;
  const empSelec = employees
    .find(({ id, firstName, lastName }) => idOrName === id
    || idOrName === firstName || idOrName === lastName);
  return {
    [`${empSelec.firstName} ${empSelec.lastName}`]: empSelec.responsibleFor.map(
      (name) => newObj[name],
    ),
  };
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
