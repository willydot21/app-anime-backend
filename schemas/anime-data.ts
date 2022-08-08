
import mongoose from "mongoose";
const { Schema } = mongoose;

export const animeFollowing = new Schema({

  id: { type: String, trim: true },

  poster: { type: String, trim: true },

  name: { type: String, trim: true },

  playlist: { type: [String], trim: true }

}, { id: false });

export const animeDataSchema = new Schema({

  id: { type: String, trim: true },

  episodes: [Number]

}, { id: false });

export const animeArticleSchema = new Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  id: {
    type: String,
    required: true,
    trim: true,
  },

  poster: {
    type: String,
    required: true,
    trim: true,
  }

}, { id: false });