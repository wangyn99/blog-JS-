//Meteor.publish "posts", () -> Posts.find()
Meteor.publish("posts", function(){
	return Posts.find();
})

/*Meteor.methods
	post:(content,title,slug) ->
		if adminLoggedIn()
			Posts.insert
				content: content
				title: title
				slug: slug
				createOn: new Date*/

Meteor.methods({
	post: function(content,title,slug){
		if(adminLoggedIn()){
			console.log("posts method call");
			var id =Posts.insert({
				content: content,
				title: title,
				slug: slug,
				createdOn: new Date()
			});
			return id;
		}
	}
});

function adminLoggedIn(){
	return Meteor.user() && Meteor.user().emails[0].address === "joe@blog.com"
}