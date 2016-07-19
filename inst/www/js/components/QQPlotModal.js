var QQPlotModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="QQ Plot">

				<div className='modal-body'>
          Input format: The csv file of data should contain only two columns.
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
