var DendogramModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Choose data">

				<div className='modal-body'>
          Plot Dendogram
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
