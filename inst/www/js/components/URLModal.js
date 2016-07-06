var URLModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Input URL">

        <div className='modal-body'>
					<Input type='url' label='JSON file' ref='url' />
				</div>

        <div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this, this.refs.url.getValue());
	}
});
