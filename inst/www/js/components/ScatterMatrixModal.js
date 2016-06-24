var ScatterMatrixModal = React.createClass({
    render: function() {
        return (
          <div>
            <iframe
                    style={{overflow:"hidden", height:"500", width:"100%", position:"absolute"}}
                    src="./scatterPlotMatrix.html"
                    //src="http://localhost/Helikar/inst/www/dendogram.html{this.props.code}"
                    frameborder="0"
                    allowfullscreen>
            </iframe>
          </div>
        );
    }
});
React.render(<ScatterMatrixModal/>, document.body);
