
import mongoose from "mongoose";
const { Schema } = mongoose;

export const animeDataSchema = new Schema({

  id: { type: String, trim: true },

  episodes: [Number]

}, { id: false });


export const animeArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  id: {
    type: String,
    required: true,
    trim: true
  },

  poster: {
    type: String,
    required: true,
    trim: true
  }

}, { id: false });