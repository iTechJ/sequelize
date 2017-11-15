import Company from './company.model';

Company.all({include: 'employees'})
  .then(companies => companies.forEach(company => {
    const {name, address, employees} = company.dataValues;
    console.log({name, address, employeesCount: employees.length});
  }))
  .catch(err => console.log(err));
