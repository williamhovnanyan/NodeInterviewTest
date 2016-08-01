exports.isAuthorized = function(photo, user) {
    return photo.isPublic() || photo.user_id == user.id;
};
