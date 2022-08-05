
import mongoose from "mongoose";
import { animeArticleSchema, animeDataSchema, animeFollowing } from "./anime-data";
const { Schema } = mongoose;

const animeInfoSchema = new Schema({

  following: {
    type: [animeFollowing],
    required: false
  },

  watched: {
    type: [animeArticleSchema],
    required: false
  },

  watching: {
    type: [animeArticleSchema],
    required: false
  },

  considering: {
    type: [animeArticleSchema],
    required: false
  },

  animeHistory: {
    type: [animeDataSchema],
    required: false
  }

}, { id: false });

export default animeInfoSchema;