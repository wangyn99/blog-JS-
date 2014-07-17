Meteor.subscribe("posts") ;

/*BlogRouter = Backbone.Router.extend
	routes: {
	" ": "main",
	"new": "newPost"
	},
	newPost: () ->Session.set 'currentView' , 'newPostForm'*/
var BlogRouter = Backbone.Router.extend({
	routes:{
		"" :"main",
		"new" : "newPost",
		":slug" : "post"
	},
	main: function(){
		Session.set("currentView", "posts");
	},
	newPost: function(){
		Session.set("currentView", "newPostForm");
	},
	post: function(slug){
		Session.set("currentView","post");
		Session.set("currentPost", slug);
	}
});
/*
Meteor.startup ()  ->
		new BlogRouter
		Backbone.history.start pushState:true*/
Meteor.startup(function(){
	new BlogRouter;
	Backbone.history.start({pushState:true});
});