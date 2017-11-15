import Company from './company.model';
import User from './user.model';
import Role from './role.model';

const plainLoading = () => Company.all()
  .then(companies => companies.forEach(company => {
    const {name, address, employees} = company.dataValues;
    console.log({name, address, employees}); // employees should be undefined
  }))
  .catch(err => console.log(err));

const lazyLoading = () => Company.all()
  .then(companies => companies.forEach(company => {
      company.getEmployees({attributes: ['id', 'name', 'email', 'role_id']}).then(employees =>
        employees.forEach(employee =>
          employee.getRole().then(role => {
            const {
              id, name, email
            } = employee.dataValues;
            const user = {id, name, email, role: role.dataValues.name, company: company.dataValues.name};
            console.log(user);
          })
        )
      )
    }));

const eagerLoading = () => Company.all({include: 'employees'})
  .then(companies => companies.forEach(company => {
    const {name, address, employees} = company.dataValues;
    console.log({name, address, employeesCount: employees.length});
  }))
  .catch(err => console.log(err));

const eagerLoading2 = () => Company.all({
  include: {
    model: User,
    as: 'employees',
    include: {
      model: Role
    }
  }
})
.then(companies => companies.forEach(company =>
  console.log(JSON.stringify(company))));

const allLoading = () => Company.all({include: [{all: true}]})
  .then(companies => companies.forEach(company =>
    console.log(JSON.stringify(company))));

//plainLoading();
//lazyLoading();
//eagerLoading();
eagerLoading2();
//allLoading();
