
import mongoose from "mongoose";
const { Schema } = mongoose;

export const animeFollowing = new Schema({

  id: { type: String, trim: true, unique: true },

  playlist: { type: [String], trim: true }

}, { id: false });

export const animeDataSchema = new Schema({

  id: { type: String, trim: true, unique: true },

  episodes: [Number]

}, { id: false });

export const animeArticleSchema = new Schema({

  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  poster: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }

}, { id: false });