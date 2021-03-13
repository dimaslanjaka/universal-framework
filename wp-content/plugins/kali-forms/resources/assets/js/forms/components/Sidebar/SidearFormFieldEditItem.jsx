import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../store/actions';
import AddableList from '../AddableList/AddableList';
import AddableProducts from '../AddableProducts/AddableProducts';
import Button from '@material-ui/core/Button';
// Will be used in the next update, for the date picker
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import moment from 'moment';
import PlaceholderDialogOpener from './../PlaceholderDialogOpener';
moment.defaultFormat = 'DD-MM-YYYY'

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formFieldEditor: state.FormFieldEditor,
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.fieldComponentsHash
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(StoreActions, dispatch);
};

class SidebarFormFieldEditItem extends React.Component {
	/**
	 * Class constructor
	 */
	constructor(props) {
		super(props);
		this.state = {
			index: null,
			error: false,
			...props.properties,
		};
		// console.log(props)
		this.inputProps = props.fieldType === 'smartTextOutput'
			?
			{
				endAdornment: (
					<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
				),
			}
			:
			{}

		this.updateHash = _.debounce(this.props.setFieldComponentsHash, 300);
		this._updateStore = _.debounce(this._updateStore, 300);

		// Will be used in the next update, for the date picker
		if (this.state.type === 'calendar') {
			this.state.intermediateValue = this.state.value !== '' ? moment(this.state.value, 'DD-MM-YYYY').toDate() : null;
		}

		if (this.state.type === 'timePicker') {
			this.state.intermediateValue = this.state.value !== '' ? moment(this.state.value, 'HH:mm').toDate() : null;
		}
	}
	/**
	 * Updates the store
	 *
	 * @memberof SidebarFormFieldEditItem
	 */
	_updateStore(value) {
		this.props.changeProperty({
			index: this.state.index,
			id: this.state.id,
			value: value
		});

		this.updateHash();
	}

	/**
	 * Update store
	 * @param e
	 */
	updateStore(e) {
		let value = e.target.value
		this.setState({ value }, this._updateStore(value))
	}

	/**
	 * Updates time picker value
	 *
	 * @param {*} value
	 * @memberof SidebarFormFieldEditItem
	 */
	updateTimePickerValue(value) {
		this.setState({ intermediateValue: value })
		let sanitizedValue = value === null ? null : value.format('HH:mm')
		this.setState({ value: sanitizedValue }, this._updateStore(sanitizedValue))
	}

	/**
	 * Update the calendar
	 *
	 * @param {*} value
	 * @memberof SidebarFormFieldEditItem
	 */
	updateCalendar(value) {
		this.setState({ intermediateValue: value })
		let sanitizedValue = value === null ? null : value.format()
		this.setState({ value: sanitizedValue }, this._updateStore(sanitizedValue))
	}

	/**
	 *
	 * @param e
	 */
	updateCheckboxValue(e) {
		let checked = e.target.checked
		this.setState({ value: checked }, this._updateStore(checked));
	}

	/**
	 *
	 * @param value
	 */
	updateAddableList(value) {
		this.setState({ value: value }, this._updateStore(value));
	}

	static getDerivedStateFromProps(props) {
		return { index: props.formFieldEditor.activeFormField };
	}

	openMedia() {
		var image_frame = wp.media({
			title: 'Select Media',
			multiple: false,
			library: {
				type: 'image',
			}
		});
		image_frame.open();
	}

	/**
	 * Renders a field in the template
	 * @param key
	 */
	renderField(key) {
		let field = '';
		switch (key) {
			case 'textbox':
				field = (
					<TextField
						label={this.state.label}
						value={this.state.value}
						onChange={e => this.updateStore(e)}
						fullWidth={true}
						error={this.state.error}
						placeholder={this.state.label}
						margin="normal"
					/>
				);
				break;
			case 'textarea':
				field = (
					<TextField
						label={this.state.label}
						value={this.state.value}
						onChange={e => this.updateStore(e)}
						multiline={true}
						rows={6}
						fullWidth={true}
						InputProps={this.inputProps}
						error={this.state.error}
						margin="normal"
					/>
				);
				break;
			case 'select':
				field = (
					<TextField
						label={this.state.label}
						value={this.state.value}
						onChange={e => this.updateStore(e)}
						select
						fullWidth={true}
						error={this.state.error}
						margin="normal"
					>
						{this.state.choices.map(e => (
							<MenuItem key={e} value={e}>
								{e}
							</MenuItem>
						))}
					</TextField>
				);
				break;
			case 'number':
				field = (
					<TextField
						label={this.state.label}
						value={this.state.value}
						onChange={e => this.updateStore(e)}
						type="number"
						fullWidth={true}
						error={this.state.error}
						InputLabelProps={{
							shrink: true,
						}}
						margin="normal"
					/>
				);
				break;
			case 'toggle':
				field = (
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={this.state.value}
									onChange={e => this.updateCheckboxValue(e)}
									value="1"
								/>
							}
							label={this.state.label}
						/>
					</FormGroup>
				);
				break;
			case 'addableList':
				field = (
					<div>
						<FormLabel>{this.state.label}</FormLabel>
						<AddableList
							onChange={e => this.updateAddableList(e)}
							choices={this.state.value}
						/>
					</div>
				);
				break;
			case 'addableProducts':
				field = (
					<div>
						<FormLabel>{this.state.label}</FormLabel>
						<AddableProducts
							onChange={e => this.updateAddableList(e)}
							choices={this.state.value}
						/>
					</div>
				);
				break;
			case 'timePicker':
				field = (
					<div>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<TimePicker
								onChange={(e) => this.updateTimePickerValue(e)}
								label={this.state.label}
								value={this.state.intermediateValue}
								fullWidth={true}
								clearable
								mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
							/>
						</MuiPickersUtilsProvider>
					</div>
				);
				break;
			case 'calendar':
				field = (
					<div>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<DatePicker
								label={this.state.label}
								value={this.state.intermediateValue}
								// variant="inline"
								margin="normal"
								fullWidth={true}
								format="DD-MM-YYYY"
								clearable
								mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
								onChange={(e) => this.updateCalendar(e)}
							/>
						</MuiPickersUtilsProvider>
					</div>
				);
				break;
			case 'upload':
				field = (
					<div>
						<Button variant="contained" onClick={() => this.openMedia()}>
							Upload
       					 </Button>
					</div>
				);
				break;
			default:
				field = (
					<input
						value={this.state.value}
						onChange={e => this.updateStore(e)}
						error={this.state.error}
						type='text'
					/>
				);
				break;
		}

		return field;
	}

	/**
	 *
	 * @return {*}
	 */
	render() {
		return (this.renderField(this.state.type));
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarFormFieldEditItem);
