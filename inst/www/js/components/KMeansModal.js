var KMeansModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Kmeans Clustering">

				<div className='modal-body'>
					Input format: The input csv file should contain only two columns of data points.
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this);
		}
});
