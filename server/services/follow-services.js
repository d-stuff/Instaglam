const Follow = require('../models/Follow.js');

async function getUserFollowing(userId) {
  const following = await Follow.find({ user: userId }).populate('following');
  return following.map(followee => ({
    username: followee.following.username,
    fullName: followee.following.fullName,
    profilePic: followee.following.profilePic,
    created: followee.created
  }));
}

async function getUserFollowers(userId) {
  const followers = await Follow.find({ following: userId }).populate('user');
  return followers.map(follower => ({
    username: follower.user.username,
    fullName: follower.user.fullName,
    profilePic: follower.user.profilePic,
    created: follower.created
  }));
}

async function addFollowToUser(follow) {
  const { user, following } = follow;
  const doesFollowExist = await Follow.findOne({
    user,
    following
  });
  if (doesFollowExist) {
    return;
  }
  if (follow.user === follow.following) {
    return 'You cannot follow yourself.';
  }
  follow = new Follow(follow);
  return follow.save();
}

function removeFollowFromUser(userId, userFollowingId) {
  return Follow.findOneAndRemove({
    user: userFollowingId,
    following: userId
  });
}

function removeAllUserFollowings(userId) {
  return Follow.deleteMany({ following: userId });
}

function removeAllUserFollowers(userId) {
  return Follow.deleteMany({ user: userId });
}

module.exports = {
  getUserFollowers,
  getUserFollowing,
  addFollowToUser,
  removeFollowFromUser,
  removeAllUserFollowings,
  removeAllUserFollowers
};
