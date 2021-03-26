const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const addNewPost = require('./addNewPost')
const onCreatedNewUserAccount = require('./onCreatedNewUserAccount')
const addNewComment = require('./addNewComment')
const likeUnlikePost = require('./likeUnlikePost')
const followUnfollowPost =  require('./followUnfollowPost')
const setUserInfo = require('./setUserInfo.js')
const submitGetHelpForm = require('./submitGetHelpForm')

exports.followUnfollowPost = followUnfollowPost.followUnfollowPost
exports.addNewPost = addNewPost.addNewPost
exports.onCreatedNewUserAccount = onCreatedNewUserAccount.onCreatedNewUserAccount
exports.addNewComment = addNewComment.addNewComment
exports.likeUnlikePost = likeUnlikePost.likeUnlikePost
exports.setUserInfo = setUserInfo.setUserInfo
exports.submitGetHelpForm = submitGetHelpForm.submitGetHelpForm