Posts = new Meteor.Collection("posts");

//adminLoggedIn = () -> Meteor.user()?.emails[0].address is "joe@blog.com"

function adminLoggedIn(){
	return Meteor.user() && Meteor.user().emails[0].address === "joe@blog.com"
}