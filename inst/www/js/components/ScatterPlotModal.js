var ScatterPlotModal = React.createClass({

  getInitialState: function() {
    return {is_straigt: false};
    return {is_exponential: false};
    return {is_polynomial: false};
    return {is_logarithmic: false};
  },

	render: function() {

		var options_list = [];

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		return (
			<Modal {...this.props} title="Choose data">
				<div className='modal-body'>

					<Input type='select' label='Variable - X' ref='first'>
						{options_list}
					</Input>

					<Input type='select' label='Variable - Y' ref='second'>
						{options_list}
					</Input>

          <Input type='checkbox' label='Straight Trendline' ref='straight' onChange={this.handleChange1} />
          <Input type='checkbox' label='Exponential Trendline' ref='exponential' onChange={this.handleChange2} />
          <Input type='checkbox' label='Polynomial Trendline' ref='polynomial' onChange={this.handleChange3} />
          <Input type='checkbox' label='Logarithmic Trendline' ref='logarithmic' onChange={this.handleChange4} />

				</div>
        <div className='modal-footer'>
			    <Button onClick={this.handleClick}>Submit</Button>
    		</div>
			</Modal>
		);
	},

	handleClick: function() {
		this.props.onRequestHide();
		this.props.onClick(this, this.refs.first.getValue(), this.refs.second.getValue(), this.refs.straight.getChecked(), this.refs.exponential.getChecked(), this.refs.polynomial.getChecked(), this.refs.logarithmic.getChecked());
	},

	handleChange1: function() {
		this.setState({is_straigt: !this.state.is_straigt});
	},
  handleChange2: function() {
    this.setState({is_exponential: !this.state.is_exponential});
  },
  handleChange3: function() {
    this.setState({is_polynomial: !this.state.is_polynomial});
  },
  handleChange4: function() {
    this.setState({is_logarithmic: !this.state.is_logarithmic});
  }
});
