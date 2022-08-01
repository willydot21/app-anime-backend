
import mongoose from "mongoose";
import { animeArticleSchema, animeDataSchema } from "./anime-data";
const { Schema } = mongoose;

const animeInfoSchema = new Schema({

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