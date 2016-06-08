var KMeansModal = React.createClass({

    render: function() {
        return (
          <div>
            <iframe
                    style={{overflow:"hidden", height:"500", width:"100%", position:"absolute"}}
                    src="./kmeans.html"
                    frameborder="0"
                    allowfullscreen>
            </iframe>
          </div>
        );
    }
});

React.render(<KMeansModal/>, document.body);
