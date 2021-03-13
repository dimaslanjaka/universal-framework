import React from 'react';
import FieldComponentSelect from './FieldComponentSelect'
import Grid from '@material-ui/core/Grid'
import HubSpotProperties from './HubSpotProperties'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const AdditionalFormFields = (props) => {
	const selectChange = (data) => {
		let currentState = props.additionalFormFields;
		currentState[data.field].assignedFormField = data.value
		props.setAdditionalFormFields([...currentState]);
	}

	const hubSpotPropertyChange = (data) => {
		let currentState = props.additionalFormFields;
		currentState[data.field].hubspotProperty = data.value
		props.setAdditionalFormFields([...currentState]);
	}

	const setDefaultFormField = () => {
		let currentState = props.additionalFormFields;
		currentState[0] = { additionalFieldIndex: props.additionalFormFields.length, hubspotProperty: '', assignedFormField: '' }
		props.setAdditionalFormFields([...currentState]);
	}

	const addAdditionalFormField = () => {
		let currentState = props.additionalFormFields;
		props.setAdditionalFormFields(
			[
				...currentState,
				{ additionalFieldIndex: props.additionalFormFields.length, hubspotProperty: '', assignedFormField: '' }
			]
		)
	}

	const removeAdditionalFormField = (idx) => {
		let currentState = props.additionalFormFields;
		currentState.splice(idx, 1);
		props.setAdditionalFormFields([...currentState]);
	}

	return (
		<Grid container direction="row" spacing={4}>
			<Grid item xs={4}>
				<HubSpotProperties
					label={KaliFormsObject.translations.hubspot.misc.hubspotProperty}
					field={props.additionalFieldIndex}
					selectedValue={props.hubSpotProperty}
					onChange={hubSpotPropertyChange} />
			</Grid>
			<Grid item xs={4}>
				<FieldComponentSelect
					label={KaliFormsObject.translations.hubspot.misc.formField}
					field={props.additionalFieldIndex}
					selectedValue={props.assignedFormField}
					onChange={selectChange} />
			</Grid>
			<Grid item xs={2}>
				<IconButton aria-label={KaliFormsObject.translations.hubspot.misc.addFormField}
					onClick={() => addAdditionalFormField()}
					variant="contained"
					color="primary"
					size="medium">
					<AddIcon fontSize="inherit" />
				</IconButton>
				<If condition={props.additionalFormFields.length === 1}>
					<IconButton aria-label={KaliFormsObject.translations.hubspot.misc.removeFormField}
						onClick={() => setDefaultFormField()}
						variant="contained"
						color="primary"
						size="medium">
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</If>
				<If condition={props.additionalFormFields.length > 1}>
					<IconButton aria-label={KaliFormsObject.translations.hubspot.misc.removeFormField}
						onClick={() => removeAdditionalFormField(props.additionalFieldIndex)}
						variant="contained"
						color="primary"
						size="medium">
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</If>
			</Grid>
		</Grid>
	);
}

export default AdditionalFormFields;
