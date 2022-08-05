
import userModel from "../user.dao";
import { AnimeArticle, AnimeFollowingItem } from "../../../@types";

export async function getPlaylist(userId: string, playlist: string) {

  const selectOptions = playlist === '*'
    ? 'userAnimeInfo.watched userAnimeInfo.watching userAnimeInfo.considering'
    : `userAnimeInfo.${playlist}`

  const user = await userModel.findById(userId)
    .select(selectOptions);

  return user.userAnimeInfo;

}

export async function removeAnimeFromPlaylist(userid: string, playlist: string, animeid: string) {

  const query = {
    _id: userid,
    [`userAnimeInfo.${playlist}.id`]: { $eq: animeid }
  }

  const data = await userModel.updateOne(query, {
    $pull: { [`userAnimeInfo.${playlist}`]: { id: animeid } }
  });

  if (data.modifiedCount === 1) return { success: true, data: `${animeid} id, is deleted from ${playlist}!` };

  return { success: false, data: `${animeid} id, is not exist` }

}

export async function addAnimeToPlaylist(userid: string, playlist: string, animeArticle: AnimeArticle) {

  const query = {
    _id: userid,
    [`userAnimeInfo.${playlist}.id`]: { $ne: animeArticle.id }
  }

  const data = await userModel.updateOne(query, {
    $push: {
      [`userAnimeInfo.${playlist}`]: animeArticle
    }
  });

  if (data.modifiedCount === 1) return { success: true, data: `${animeArticle.id} id, is added from ${playlist}!` }

  return { success: false, data: `${animeArticle.id} id, is already in ${playlist}` }

}