"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false},
	value: {
		type: String,
		required: false},
	target: {
		type: Array,
		required: false},
    user: {
        type: String,
        required: false}
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;