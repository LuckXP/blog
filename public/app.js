console.log('my waist\n👌');

var App = React.createClass({
    getInitialState: function () {
    	return { blogPosts: []}
    },
    propTypes: {
    	url: React.PropTypes.string.isRequired,
  	},
    loadBlogPostsFromServer: function() {
    	var self = this;
    	$.ajax({
    		url: this.props.url,
    		method: 'GET',
    	}).done(function(data) {
    		console.log(data);
    		self.setState({
    			blogPosts: data,
    		});
    	});
    },
    componentDidMount: function() {
    	console.log("componentDidMount fired");
    	this.loadBlogPostsFromServer();
    },
    render: function() {
        return (
            <div> 
            	<BlogPostPanels blogPosts={this.state.blogPosts} />
            </div>
        );
    }
});

var BlogPostPanels = React.createClass({
	render: function () {
		var mapBlogPostToPanel = this.props.blogPosts.
			map( function(blogPost) {
				return (
					<div className="panel panel-coral">
  						<div className="panel-heading coral">{blogPost.postDate}</div>
  						<div className="panel-body">
    						{blogPost.postBody}
  						</div>
					</div>
				)
		}); 
		console.log(mapBlogPostToPanel);
		return (
			<div>
				{mapBlogPostToPanel}
			</div>
			);
	},
});

React.render(<App url="/api/blogposts" />, document.getElementById('blogposts'));