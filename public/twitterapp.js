var TwitterApp = React.createClass({
    getInitialState: function () {
    	return { 
    		tweets: [],
    		keyword: "bears facts",
    	}
    
    },
    onKeyWordSubmit: function(newKeyword) {
    	this.setState({keyword: newKeyword});
    	this.loadTweetsFromServer(newKeyword);
    },
    propTypes: {
        url: React.PropTypes.string.isRequired,
    },
    loadTweetsFromServer: function(keyword) {
    	var self = this;
    	$.ajax({
    		url: this.props.url + keyword,
    		method: 'GET',
    	}).done(function(data) {
    		console.log(data);
    		self.setState({
    			tweets: data,
    		});
    	});
    },
    componentDidMount: function() {
    	console.log("componentDidMount fired");
    	this.loadTweetsFromServer(this.state.keyword);
    },
    
    render: function() {
        return (
            <div>
                <h3> Twitter App </h3>
            	<div className="container">
            		<TwitterSearchBar onKeyWordSubmit={this.onKeyWordSubmit} />
            	</div>
            	<div className="container">
            		<TweetsBox tweets={this.state.tweets} />
            	</div>
            </div>
            )
    }

});

React.render(<TwitterApp url="/api/tweets/" />, document.getElementById('twitterapp'));