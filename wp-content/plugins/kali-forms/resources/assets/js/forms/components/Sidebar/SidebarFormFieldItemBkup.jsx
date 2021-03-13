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

// Will be used in the next update, for the date picker
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import moment from 'moment';
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

const SidebarFormFieldEditItem = (props) => {
	const id = useState(null);
	const error = useState(null);
	// useEffect(() => {
	// 	if (props.formFieldEditor.activeFormField !== state.index) {
	// 		setState({ index: nextProps.formFieldEditor.activeFormField });
	// 	}
	// }, [props.formFieldEditor.activeFormField])

	// Will be used in the next update, for the date picker
	// if (this.state.type === 'calendar') {
	// 	this.state.intermediateValue = this.state.value !== '' ? moment(this.state.value, 'DD-MM-YYYY').toDate() : null;
	// }

	// if (this.state.type === 'timePicker') {
	// 	this.state.intermediateValue = this.state.value !== '' ? moment(this.state.value, 'HH:mm').toDate() : null;
	// }

	/**
	 * Updates the store
	 *
	 * @memberof SidebarFormFieldEditItem
	 */
	const _updateStore = (value) => {
		// props.changeProperty({
		// 	index: state.index,
		// 	id: state.id,
		// 	value: value
		// });

		// props.setFieldComponentsHash()
		// updateHash();
	}

	/**
	 * Update store
	 * @param e
	 */
	const updateStore = (e) => {
		props.changeProperty({
			index: props.index,
			id: props.properties.id,
			value: e.target.value
		});
		props.setFieldComponentsHash();
		// setState({ value }, _updateStore(value))
	}

	/**
	 * Updates time picker value
	 *
	 * @param {*} value
	 * @memberof SidebarFormFieldEditItem
	 */
	const updateTimePickerValue = (value) => {
		// setState({ intermediateValue: value })
		// let sanitizedValue = value === null ? null : value.format('HH:mm')
		// setState({ value: sanitizedValue }, _updateStore(sanitizedValue))
	}


	/**
	 * Update the calendar
	 *
	 * @param {*} value
	 * @memberof SidebarFormFieldEditItem
	 */
	const updateCalendar = (value) => {
		// setState({ intermediateValue: value })
		// let sanitizedValue = value === null ? null : value.format()
		// setState({ value: sanitizedValue }, _updateStore(sanitizedValue))
	}

	/**
	 *
	 * @param e
	 */
	const updateCheckboxValue = (e) => {
		// let checked = e.target.checked
		// setState({ value: checked }, _updateStore(checked));
	}


	/**
	 *
	 * @param value
	 */
	const updateAddableList = (value) => {
		// setState({ value: value }, _updateStore(value));
	}

	/**
	 * Renders a field in the template
	 * @param key
	 */
	const renderField = (key) => {
		let field = '';
		switch (key) {
			case 'textbox':
				field = (
					<TextField
						label={props.properties.label}
						value={props.fieldComponents[props.index].properties[props.properties.id]}
						onChange={e => updateStore(e)}
						// onChange={e => props.onChange(e.target.value, { ...props.properties, id: getId })}
						fullWidth={true}
						error={props.properties.error}
						placeholder={props.properties.label}
						margin="normal"
					/>
				);
				break;
			case 'textarea':
				field = (
					<TextField
						label={props.properties.label}
						value={props.properties.value}
						onChange={e => updateStore(e)}
						multiline={true}
						rows={2}
						fullWidth={true}
						error={props.properties.error}
						margin="normal"
					/>
				);
				break;
			case 'select':
				field = (
					<TextField
						label={props.properties.label}
						value={props.properties.value}
						onChange={e => updateStore(e)}
						select
						fullWidth={true}
						error={props.properties.error}
						margin="normal"
					>
						{props.properties.choices.map(e => (
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
						label={props.properties.label}
						value={props.properties.value}
						onChange={e => updateStore(e)}
						type="number"
						fullWidth={true}
						error={props.properties.error}
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
									checked={props.properties.value}
									onChange={e => updateCheckboxValue(e)}
									value="1"
								/>
							}
							label={props.properties.label}
						/>
					</FormGroup>
				);
				break;
			case 'addableList':
				field = (
					<div>
						<FormLabel>{props.properties.label}</FormLabel>
						<AddableList
							onChange={e => updateAddableList(e)}
							choices={props.properties.value}
						/>
					</div>
				);
				break;
			case 'addableProducts':
				field = (
					<div>
						<FormLabel>{props.properties.label}</FormLabel>
						<AddableProducts
							onChange={e => updateAddableList(e)}
							choices={props.properties.value}
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
								keyboard
								showTodayButton
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
								clearable={true}
								margin="normal"
								fullWidth={true}
								format="DD-MM-YYYY"
								keyboard
								mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
								onChange={(e) => this.updateCalendar(e)}
							/>
						</MuiPickersUtilsProvider>
					</div>
				);
				break;
			default:
				field = (
					<input
						value={props.properties.value}
						onChange={e => updateStore(e)}
						error={props.properties.error}
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
	return renderField(props.properties.type);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarFormFieldEditItem);
