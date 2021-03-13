import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../store/actions';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
		formFieldEditor: state.FormFieldEditor,
	};
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators(StoreActions, dispatch);
};

const FieldComponentSelect = (props) => {
	return (
		<TextField
			label={props.label}
			variant="filled"
			value={props.selectedValue}
			select
			onChange={e => props.onChange({ field: props.field, value: e.target.value })}
			fullWidth={true}>
			{props.fieldComponents.map(field => {
				if (
					(field.properties.name !== '')
					&& (field.id === 'checkbox'
						|| field.id === 'select'
						|| field.id === 'textbox'
						|| field.id === 'radio'
						|| field.id === 'hidden'
						|| field.id === 'dropdown'
						|| field.id === 'date'
						|| field.id === 'range'
						|| field.id === 'choices')
				) {

					let label = (typeof field.properties.caption !== 'undefined' && field.properties.caption !== '') ? field.properties.caption : field.properties.name
					return (
						<MenuItem
							key={field.internalId}
							value={field.properties.name}>
							{label}
						</MenuItem>
					)
				}
			})}
		</TextField>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldComponentSelect)
