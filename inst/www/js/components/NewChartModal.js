var NewChartModal = React.createClass({

	render: function() {

		var options_list = [];
		var wololo="enabled";

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Choose data">

				<div className='modal-body'>
					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='text' label='X-axis name (optional)' ref='xname' />

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

					<Input type='text' label='Y-axis name (optional)' ref='yname' />

          <Input type="number" pattern="[0-9]*" inputmode="numeric" label='No. of clusters (K)' ref='knum'/>

				</div>

				<div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>

			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this, this.refs.first.getValue(), this.refs.second.getValue(), this.refs.xname.getValue(), this.refs.yname.getValue(), this.refs.knum.getValue());
		}
});
