console.log('my waist\n👌');

var TweetPanels = React.createClass({
    render: function() {
        return (
            <div> 
            	<TweetPanel tweets={this.props.tweets} />
            </div>
        );
    }
});

var TweetPanel = React.createClass({
	render: function () {
		var mapTweetToPanel = this.props.tweets.
			map( function(tweet) {
				return (
					<div className="panel tweets">
  						<div className="panel-heading panel-coral-tweets ">
                            <image src={tweet.profile_image_url} className="panel-image" />
                            <h2 className="panel-heading-text">{tweet.screen_name}</h2>
                        </div>
  						    
                        <div className="panel-body panel-coral-body">
    						<div>{tweet.text}</div>
  						     <DropDownLinks urls={tweet.urls} />
                        </div>
                        <div className="panel-footer panel-coral-body panel-coral-footer">
                            {tweet.hashtags}
                        </div>
					</div>
				)
		}); 
		console.log(mapTweetToPanel);
		return (
			<div>
				{mapTweetToPanel}
			</div>
			);
	},
});

var DropDownLinks = React.createClass({
    render: function () {
        console.log(this.props.urls);
        var mapLinksToMenu = this.props.urls.
            map( function(url) {
                console.log(url);
                var urlString = '"' + url + '"';
                return (
                    <a href= {urlString} >link</a>
                )
        });
        console.log(mapLinksToMenu);
        return (
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Links
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li>{mapLinksToMenu}</li>
              </ul>
            </div>
        );
    },
});

