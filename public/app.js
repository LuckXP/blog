console.log('my waist\n👌');

var App = React.createClass({
    render: function() {
        return (
                <h3> Hello World </h3>
        )
    }

});

React.render(<App url="/api/blogposts" />, document.getElementById('blogposts'));