var TwitterApp = React.createClass({
    getInitialState: function () {
    	return { tweets: []}
    },
    propTypes: {
        url: React.PropTypes.string.isRequired,
    },
    loadTweetsFromServer: function() {
    	var self = this;
    	$.ajax({
    		url: this.props.url,
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
    	this.loadTweetsFromServer();
    },
    
    render: function() {
        return (
            <div>
                <h3> TwitterApp </h3>
            	<TwitterSearchBar />
            	<TweetPanels tweets={this.state.tweets} />
            </div>
            )
    }

});

React.render(<TwitterApp url="/api/tweets/mountain bike" />, document.getElementById('twitterapp'));