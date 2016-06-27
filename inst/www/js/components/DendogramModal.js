var DendogramModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Dendogram">

				<div className='modal-body'>
          Input format: The csv file of data should contain a column of rows.
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
