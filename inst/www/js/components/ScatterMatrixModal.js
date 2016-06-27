var ScatterMatrixModal = React.createClass({

	render: function() {

		return (
			<Modal {...this.props} title="Scatter Matrix Plot">

				<div className='modal-body'>
					Input format: In the csv file of data add an extra column with column name as "Groups" which contains group of each data point.
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
