/**
 * Created by SeedofWind on 6/11/17.
 */
var mongoose = require('mongoose');

var shelfSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    books:[{type: mongoose.Schema.Types.ObjectId, ref: "BookModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "shelf"});



module.exports = shelfSchema;










// var Schema = Mongoose.Schema;
//
// var employeeSchema = new Schema({
//         name: String,
//         address: String
//     }
// );
//
// employeeSchema.plugin(regexSearch);
// employeeSchema.index({ name: 'text' });
// employeeSchema.index({ address: 'text' });
//
// var employeeModel = Mongoose.model('employee', employeeSchema);
//
//
// // Create sample table 'employee' with some documents
// employeeModel.create([
//     {
//         name: 'Jack',
//         address: '189 W Ave, San Bruno, CA 94066'
//     },
//     {
//         name: 'William',
//         address: '500 W Ave, Atlanta, CA 30080'
//     }
// ]
//     // , function (err, data) {
//     // if (err) {
//     //     return done(err);
//     // }
//     // done(data);
// // }
// );
//
//
// // set the options for mongoose-regex
// var searchOptions = {
//     fieldToSearch: 'name', // which field you want to search
//     caseSensitive: false // apply case sensitivity to your search
// };
//
// // regex now
// employeeModel.regexSearch('JA',searchOptions,function(err, result){
//
//     console.log(result);
//
// });