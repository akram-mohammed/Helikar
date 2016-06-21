var DendogramModal = React.createClass({
    render: function() {
        return (
          <div>
            <iframe
                    style={{overflow:"hidden", height:"100%", width:"100%", position:"absolute"}}
                    src="./dendogram.html"
                    //src="http://localhost/Helikar/inst/www/dendogram.html{this.props.code}"
                    frameborder="0"
                    allowfullscreen>
            </iframe>
          </div>
        );
    }
});
React.render(<DendogramModal/>, document.body);
//React.render(<DendogramModal code="IytNBm8WA1c" />, document.body);
