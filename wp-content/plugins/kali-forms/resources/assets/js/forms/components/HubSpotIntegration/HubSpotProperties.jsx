import MenuItem from '@material-ui/core/MenuItem'
import React from 'react';
import TextField from '@material-ui/core/TextField';

const HubSpotProperties = (props) => {
	const properties = [...KaliFormsHubSpot.fieldMapProperties[0].fields, ...KaliFormsHubSpot.fieldMapProperties[1].fields]
	return (
		<TextField
			label={props.label}
			variant="filled"
			value={props.selectedValue}
			select
			onChange={e => props.onChange({ field: props.field, value: e.target.value })}
			fullWidth={true}>
			{properties.map((field, idx) => (
				<MenuItem
					key={field.name + '-' + idx}
					value={field.name}>
					{field.label}
				</MenuItem>
			))}
		</TextField>
	)
}

export default HubSpotProperties;
