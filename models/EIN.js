'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema

const EIN = new Schema({
  name: { type: String },
  amazon: { type: String },
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  type: { type: String, index: true },
  description: { type: String },
  phone: { type: String },
  size: { type: String },
  active: { type: Boolean }
})

export default EIN