var TwitterSearchBar = React.createClass({
    getInitialState: function() {
    	return {newKeyword: ''}
    },
    handleKeywordChange: function(e) {
    	this.setState({
    		newKeyword: e.target.value
    	})
    },
    handleFormSubmit: function(e) {
    	e.preventDefault();

    	var newKeyword = this.state.newKeyword.trim();

    	this.props.onKeyWordSubmit(newKeyword);
    },
    render: function() {
        return (
            <form onSubmit={this.handleFormSubmit} >
            
            	<div class="form-group">
            		<input onChange={this.handleKeywordChange} value={this.state.keyword} type="text" placeholder="Search..." />
            	</div>
            
            	
            
            	<button type="submit" class="btn btn-primary">GO!</button>
            </form>
        );
    }

});

