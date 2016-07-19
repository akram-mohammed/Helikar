var ComatrixModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Correlation and Covariance Plots">

        <div className='modal-body'>

					Input format: The csv file of data should contain a column of rows.

					<Input type='select' label='Choose Analyses' ref='comatrix'>
						<option value="cor">Correlation Matrix</option>
						<option value="cov">Covariance Matrix</option>
					</Input>
				</div>

        <div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this, this.refs.comatrix.getValue());
	}
});
