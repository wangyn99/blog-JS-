
//ifViewing = (viewName) -> Session.get("currentView") is viewName
function ifViewing(viewName){
	return Session.get("currentView") == viewName;
}

/*Template.header.adminLoggedIn = () -> adminLoggedIn()
Template.header.events
	'click button': () -> Backbone.history.navigate '/new', true

adminLoggedIn = () -> Meteor.user()?.emails[0].address is "joe@blog.com"*/
Template.main.events({
	"click a[href^='/']" :  function(e,t){
		Backbone.history.navigate(e.currentTarget.pathname,true);
		e.preventDefault();
	}
});
Template.header.adminLoggedIn = function(){
	return adminLoggedIn();
};
Template.header.events({
	'keyup #title': function(e,t){
		console.log("keyup");
		t.find("#slug").value = t.find("#title").value.toLowerCase().split(' ').join('-');
	},
	'click button': function(){
		Backbone.history.navigate("/new",true);
	}
});

function adminLoggedIn(){
	return Meteor.user() && Meteor.user().emails[0].address === "joe@blog.com"
}

//Template.newPostForm.show = () -> ifViewing "newPostForm"
Template.newPostForm.show = function(){
	return ifViewing("newPostForm");
}

Template.newPostForm.events({
	'keyup #title': function(e, t){
		t.find("#slug").value = t.find("#title").value.toLowerCase().split(' ').join('-');
	},
	'click button': function(e,t){
		var slug = t.find("#slug").value,
		title = t.find("#title").value,
		content = t.find("#content").value;
		Meteor.call('post',content,title,slug, function(err, id){
			//navigate to the new submit post page
			//Backbone.history.navigate pushes page when change url
			//instead of refresh the full page.
			Backbone.history.navigate("/"+slug, true);
		});
	}
});

Template.posts.show = function(){
	return ifViewing("posts")||ifViewing("post");
};
Template.posts.posts = function(){
	if(ifViewing("post")){
		console.log("show single post");
		return Posts.find({slug: Session.get("currentPost")});
	}
	else{
		console.log("show post list");
		return Posts.find({}, {sort:{createdOn: -1}});
		}
	
}
			