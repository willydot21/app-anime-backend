
import userModel from '../user.dao';
import { AnimeFollowingItem } from '../../../@types/index';

async function animeInFollowing(userId: string, animeId: string) {

  const matchAnimeId = {
    _id: userId,
    [`userAnimeInfo.following.id`]: animeId
  }

  const numberOfDocuments = await userModel.countDocuments(matchAnimeId);

  return numberOfDocuments > 0;

}

// playlist 
export async function addAnimeFollowingPlaylist(animeId: string, playlist: string, userId: string) {

  const inFollowing = await animeInFollowing(userId, animeId);

  if (!inFollowing) {
    return addAnimeToFollowing(userId, { id: animeId, playlist: [playlist] });
  };

  const matchPlaylist = {
    _id: userId,
    'userAnimeInfo.following': {
      $elemMatch: {
        id: animeId,
        playlist: { $ne: playlist }
      }
    }
  }

  const updateOptions = {
    $push: {
      'userAnimeInfo.following.$.playlist': playlist
    }
  }

  try {

    const updateResult = await userModel.updateOne(matchPlaylist, updateOptions);

    const data = updateResult.modifiedCount > 0
      ? 'Playlist is added!'
      : 'Playlist is already in list';

    return { success: true, data };

  } catch (error) { return { error: true, data: error as Error } }

}

export async function removeAnimeFollowingPlaylist(animeId: string, playlist: string, userId: string) {

  const inFollowing = await animeInFollowing(userId, animeId);

  if (!inFollowing) return new Error(`Anime: "${animeId}" is not in following.`);

  const matchPlaylist = {
    _id: userId,
    'userAnimeInfo.following': {
      $elemMatch: {
        id: animeId,
        playlist
      }
    }
  }

  const updateOptions = {
    $pull: {
      'userAnimeInfo.following.$.playlist': playlist
    }
  }

  try {

    const updateResult = await userModel.updateOne(matchPlaylist, updateOptions);

    const data = updateResult.modifiedCount > 0
      ? 'Playlist is removed!'
      : 'Playlist is not in list';

    return { success: true, data }

  } catch (error) { return { error: true, data: error as Error } }

}
//

// following list
async function addAnimeToFollowing(userId: string, anime: AnimeFollowingItem) {

  const filterAnime = {
    _id: userId,
    'userAnimeInfo.following.id': { $ne: anime.id }
  }

  const updateOptions = {
    $push: {
      'userAnimeInfo.following': anime
    }
  }

  try {

    const updateResults = await userModel.updateOne(filterAnime, updateOptions);

    return updateResults;

  } catch (error) { return { error: true, data: error as Error } }

}

export async function removeAnimeFromFollowing(userId: string, animeId: string) {

  const filterAnime = {
    _id: userId,
    'userAnimeInfo.following.id': animeId
  }

  const updateOptions = {
    $pull: {
      'userAnimeInfo.following': { id: animeId }
    }
  }

  try {

    const updateResults = await userModel.updateOne(filterAnime, updateOptions);

    return updateResults;

  } catch (error) { return { error: true, data: error as Error } }

}
// 