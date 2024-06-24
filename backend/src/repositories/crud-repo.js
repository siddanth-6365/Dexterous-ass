// const { Logger } = require("../config")
// const { AppErrors } = require("../utils/index")
// const { StatusCodes } = require('http-status-codes')

// class CrudOperations {

//     constructor(model) {
//         this.model = model;
//     }

//     async create(data) {
//         try {
//             console.log("we are inside crud-repo");
//             const responce = await this.model.create(data)//data from airline-child and model from airline-repo super to parent constructor
//             return responce; // responce goes to airline service where the function called
//         }
//         catch (error) {
//             Logger.error("error while creating crud", error);
//             throw error;
//         }
//     }

//     async destroy(data) {
//         const response = await this.model.destroy({
//             where: {
//                 id: data
//             }
//         });
//         if (!response) {
//             throw new AppErrors('Not able to find the resource', StatusCodes.NOT_FOUND);
//         }
//         return response;
//     }


//     async get(id) {

//         const responce = await this.model.findByPk(id);   // find by primary key
//         if (!responce) {
//             throw new AppErrors("error id not found", StatusCodes.NOT_FOUND)
//         }
//         return responce;

//     }

//     async getAll(data) {
//         try {
//             const responce = await this.model.findAll();
//             return responce;
//         }
//         catch (error) {
//             Logger.error("error while getAll in crud-repo", error);
//             throw error;
//         }
//     }
    

//     async update(id, data) {
//         try {
//             const responce = await this.model.update(data, {
//                 where: {
//                   id
//                 }
//               });

//             return responce;
//         }
//         catch (error) {
//             Logger.error("error while update in crud-repo", error);
//             throw error;
//         }
//     }
// }

// module.exports = CrudOperations;