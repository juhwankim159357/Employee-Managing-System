const Sequelize = require('sequelize');
var sequelize = new Sequelize('d80omoie4iqofv','gfvzeithykpvvi','6de257443fc51d10dc4249a7eda210a601e87d135a8225a24192eb48949dc8be',{
    host:'ec2-50-16-197-244.compute-1.amazonaws.com',
    dialect:'postgres',
    port: 5432,
    dialectOptions:{
        ssl: true
    }
});

var exports = module.exports = {};

// Crating Data Models
const Employee = sequelize.define('Employee', {
    employeeNum: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:Sequelize.STRING,
    SSN:Sequelize.STRING,
    addressStreet:Sequelize.STRING,
    addressCity:Sequelize.STRING,
    addressState:Sequelize.STRING,
    addressPostal:Sequelize.STRING,
    martialStatus:Sequelize.STRING,
    isManager:Sequelize.BOOLEAN,
    employeeManagerNum:Sequelize.INTEGER,
    status:Sequelize.STRING,
    department:Sequelize.INTEGER,
    hireDate:Sequelize.STRING,
});

 const Department = sequelize.define('Department',{
    departmentId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    departmentName: Sequelize.STRING
});

// Module initialize
exports.initialize = function() {
    return new Promise((resolve, reject) => {
        sequelize.sync()
        .then(() => resolve())
        .catch(() => reject("unable to sync the database"));
    });
};

// getAllEmployees
exports.getAllEmployees = function(){
    return new Promise((resolve, reject) => {
        Employee.findAll()
        .then(()=>resolve(Employee.findAll()))
        .catch(()=>reject("no results returned")) 
    });
};

// getEmployeesByStatus
exports.getEmployeesByStatus = function(status){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    status: status
                }}));
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

// getEmployeesByDepartment
exports.getEmployeesByDepartment = function(department){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    department: department
            }}));
        }).catch((err) => {
            reject("no results returned.");
        });
    });
}

// getEmployeesByManager
exports.getEmployeesByManager = function(manager){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeManagerNum: manager
                }
            }));
            }).catch((err) => {
                reject("no results returned.");
        });
    });
}

// getEmployeeByNum
exports.getEmployeeByNum = function(num){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.findAll({
                where:{
                    employeeNum: num
                }
            }));
            }).catch((err) => {
                reject("no results returned.");
        });
    });
}

// getDepartments
exports.getDepartments = function(){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Department.findAll());
        }).catch((err) => {
            reject("no results returned.");
        });
    });
};  

// addEmployee
exports.addEmployee = function(employeeData){
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            for (let x in employeeData) {
                if(employeeData[x] == ""){
                    employeeData[x] = null;
                }
            }
            resolve(Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                isManager: employeeData.isManager,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate}));
            }).catch(() => {
                reject("unable to create employee.");
            });
        }).catch(() => {
            reject("unable to create employee.");
    });
};

// updateEmployee
exports.updateEmployee = function(employeeData){
    employeeData.isManager = (employeeData.isManager) ? true : false;
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            for (let x in employeeData) {
                if(employeeData[x] == ""){
                    employeeData[x] = null;
                }
            }
            resolve(Employee.update({
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressPostal: employeeData.addressPostal,
                addressState: employeeData.addressPostal,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department
            }, { where: {
                employeeNum: employeeData.employeeNum
            }}));
        }).catch(() => {
            reject("unable to create employee.");
        });
    });
};

exports.addDepartment = function(departmentData){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            for(let x in departmentData){
                if(departmentData[x] == "") {
                    departmentData[x] = null;
                }
            }
            Department.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }).then(() => {
                resolve(Department);
            }).catch((err) => {
                reject("unable to create department.");
            });
        }).catch(() => {
            reject("unable to create department.");
        });
    });
};


exports.updateDepartment = function(departmentData){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            for(let x in departmentData){
                if(departmentData[x] == "") {
                    departmentData[x] = null;
                }
            }
            Department.update({
                departmentName: departmentData.departmentName
            }, { where: {
                departmentId: departmentData.departmentId
            }}).then(() =>{
                resolve(Department);
            }).catch((err) => {
                reject("unable to create department.");
            });
        }).catch(() => {
            reject("unable to create department.");
        });
    });
};

exports.getDepartmentById = function(id){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Department.findAll({
                where:{
                    departmentId: id
                }}));
        }).catch((err) => {
            reject("unable to find department");
        });
    });
}

exports.deleteEmployeeByNum = function(empNum){
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Employee.destroy({
                where:{
                    employeeNum: empNum
                }}));
        }).catch((err) => {
            reject();
        });
    });
};

exports.deleteDepartmentById = (id) =>{
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(Department.destroy({
                where:{
                    departmentId: id
                }}));
        }).catch((err) => {
            reject();
        });
    });
};