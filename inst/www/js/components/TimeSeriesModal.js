var TimeSeriesModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Time Series Analysis">

				<div className='modal-body'>
          Input format: The csv file of data should contain a column of rows that determines the time.
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
