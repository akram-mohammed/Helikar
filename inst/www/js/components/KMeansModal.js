var KMeansModal = React.createClass({

	render: function() {

		var options_list = [];

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Kmeans Clustering">

				<div className='modal-body'>

					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

					<Input type="number" label="Number of clusters (k)" ref="kvalue" pattern="[0-9]*" min = "1" step = "1"/>
				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		var k = this.refs.kvalue.getValue();
		if (k > 0 || parseFloat(k) === k >>> 0) {
			this.props.onRequestHide();
			this.props.onClick(this, this.refs.first.getValue(), this.refs.second.getValue(), this.refs.kvalue.getValue());
		}
		else {
			alert("Value of 'K' is a positive integer");
		}
		}
});
