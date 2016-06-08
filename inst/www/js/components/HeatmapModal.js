var HeatmapModal = React.createClass({
    render: function() {
        return (

          <div>
            <iframe
                    style={{overflow:"hidden", height:"500", width:"100%", position:"absolute"}}
                    src="./heatmap.html"
                    frameborder="0"
                    allowfullscreen>
            </iframe>
          </div>
        );
    }
});
React.render(<HeatmapModal/>, document.body);
