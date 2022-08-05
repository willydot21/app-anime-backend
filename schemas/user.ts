
import mongoose from "mongoose";
import animeInfoSchema from "./anime-info";
const { Schema } = mongoose;

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  userAnimeInfo: {
    type: animeInfoSchema,
    default: {
      following: [],
      watched: [],
      watching: [],
      considering: [],
      animeHistory: []
    }
  }

}, { timestamps: true });

export default userSchema;