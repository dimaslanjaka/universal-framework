import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import FieldComponentSelect from './FieldComponentSelect'

const ContactFormFieldsMap = (props) => {
	const [mappedFields, setMappedFields] = useState(
		{
			email: props.formFieldsMap.email,
			firstName: props.formFieldsMap.firstName,
			lastName: props.formFieldsMap.lastName
		}
	);

	const selectChange = (data) => {
		let currentState = mappedFields;
		currentState[data.field] = data.value;
		setMappedFields({ ...currentState })
		props.setFormFieldsMap({ ...currentState })
	}

	return (
		<div>
			<Grid direction="row" container spacing={4}>
				<Grid item xs={2}>
					{KaliFormsObject.translations.hubspot.general.email} :
				</Grid>
				<Grid item xs={4}>
					<FieldComponentSelect
						label={KaliFormsObject.translations.hubspot.general.email}
						selectedValue={mappedFields.email}
						field="email"
						onChange={selectChange} />
				</Grid>
			</Grid>
			<Grid direction="row" container spacing={4}>
				<Grid item xs={2}>
					{KaliFormsObject.translations.hubspot.general.firstName} :
			</Grid>
				<Grid item xs={4}>
					<FieldComponentSelect
						label={KaliFormsObject.translations.hubspot.general.firstName}
						selectedValue={mappedFields.firstName}
						field="firstName"
						onChange={selectChange} />
				</Grid>
			</Grid>
			<Grid direction="row" container spacing={4}>
				<Grid item xs={2}>
					{KaliFormsObject.translations.hubspot.general.lastName} :
			</Grid>
				<Grid item xs={4}>
					<FieldComponentSelect
						label={KaliFormsObject.translations.hubspot.general.lastName}
						selectedValue={mappedFields.lastName}
						field="lastName"
						onChange={selectChange} />
				</Grid>
			</Grid>
		</div>
	);
}

export default ContactFormFieldsMap;
