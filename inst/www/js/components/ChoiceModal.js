/*
copyright 2016 Helikar Lab

Developed by Shubham Kumar, Vinit Ravishankar and Akram Mohammed

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details. You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>
*/
var ChoiceModal = React.createClass({
	render: function() {

		var options_list = [];

		this.props.variables.forEach(function (variable) {
			options_list.push(<option value={variable}>{variable}</option>);
		});

		var label = 'Variables (' + options_list.length + ')';

		return (
			<Modal {...this.props} title="Choose data">
				<div className='modal-body'>
					<Input type='select' label={label} ref='first' multiple>
						{options_list}
					</Input>
					<Input type='select' label='Functions' ref='second' multiple>
						<option value='mean'>Mean</option>
						<option value='median'>Beta</option>
						<option value='sd'>Standard Deviation</option>
						<option value='variance'>Variance</option>
						<option value='skewness'>Skewness</option>
						<option value='kurtosis'>Kurtosis</option>
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
		this.props.onClick(this, this.refs.first.getValue(), this.refs.second.getValue());
	}
});
