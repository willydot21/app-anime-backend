
import { AnimeEpisodesUpdateParams } from "../../../@types";
import userModel from "../user.dao";

export async function addAnimeEpisodeHistory(userId: string, data: AnimeEpisodesUpdateParams) {

  const queryItemHistory = {
    _id: userId,
    'userAnimeInfo.animeHistory.id': { $ne: data.animeid }
  }
  // Find element.id that its not equals to data.animeid. ( In other words, avoid repeated elements ) 
  // Then create one later.

  const queryHistoryepisode = {
    _id: userId,
    'userAnimeInfo.animeHistory': {
      $elemMatch: {
        id: data.animeid,
        episodes: {
          $ne: data.episode // find element where data.episode not exists.
        }
      }
    }
  }

  try {

    await userModel.updateOne(queryItemHistory, {
      $push: { 'userAnimeInfo.animeHistory': { id: data.animeid, episodes: [] } }
    });

    await userModel.updateOne(queryHistoryepisode, {
      $push: { 'userAnimeInfo.animeHistory.$.episodes': data.episode }
    });

    return { success: true, data: 'Anime episodes are updated!' }

  } catch (err) { console.log(err); return { error: true, data: err } }


}

export async function removeAnimeEpisodeHistory(userId: string, data: AnimeEpisodesUpdateParams) {

  const query = {
    _id: userId,
    'userAnimeInfo.animeHistory': {
      $elemMatch: {
        id: data.animeid,
        episodes: data.episode // find element where data.episode exists.
      }
    }
  }

  try {

    await userModel.updateOne(query, {
      $pull: { 'userAnimeInfo.animeHistory.$.episodes': data.episode }
    });

    return {
      error: false,
      data: 'User is updated!'
    };

  } catch (err) { return { error: true, data: err } }

}

export async function getUserHistory(userId: string) {

  const userData = await userModel.findById(userId)
    .select('userAnimeInfo.animeHistory');

  return userData.userAnimeInfo.animeHistory;

}

export async function getAnimeHistory(userId: string, animeid: string) {

  const history = await getUserHistory(userId);

  return history.filter(item => item.id === animeid);

}