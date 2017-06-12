/**
 * Created by SeedofWind on 6/12/17.
 */
var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref:"PageModel"},
    type: String,
    name: String,
    text: String,
    order: Number,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "widget"});

module.exports = widgetSchema;