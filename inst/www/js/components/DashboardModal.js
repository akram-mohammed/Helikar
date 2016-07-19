var DashboardModal = React.createClass({

	render: function() {

		var options_list = [];

		var plotId = getDashboardOptionIds(), plotType = getDashboardOptionType(), plotTime = getDashboardOptionTime();
		var count = plotId.length;

		if (count == 0) {
			return (
				<Modal {...this.props} title="Dashboard">
					<div className='modal-body'>

						No analysis done yet!!!

					</div>
					<div className='modal-footer'>
						<Button onClick={this.handleClick}>Submit</Button>
					</div>
				</Modal>
			);
		}

		for(var i = 1; i <= count; i = i + 1){
			options_list.push(<option value={plotId[i-1]}>{plotType[i-1] + ' ' + plotTime[i-1]}</option>);
		}

		return (
			<Modal {...this.props} title="Dashboard">
				<div className='modal-body'>

					<Input type='select' label='Plot' ref='dashboardId'>
						{options_list}
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
		if (this.refs.dashboardId == null){
				this.props.onClick(this);
		}
		else
			this.props.onClick(this, this.refs.dashboardId.getValue());
  }
});
