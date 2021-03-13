import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
const OwnerConditional = (props) => {
	return (
		<Grid item xs={12}>
			<Grid container direction="row" spacing={2}>
				<Grid item xs={3}>
					<TextField
						label={KaliFormsObject.translations.hubspot.actions.assignOwner}
						value={props.condition.owner}
						variant="filled"
						select
						onChange={e => props.changeCondition({ index: props.idx, key: 'owner', value: e.target.value })}
						fullWidth={true}>
						<MenuItem value="">{KaliFormsObject.translations.hubspot.actions.selectOwner}</MenuItem>
						{KaliFormsHubSpot.contactOwners.map(owner => <MenuItem key={owner.ownerId} value={owner.ownerId}>{owner.firstName} {owner.lastName}</MenuItem>)}
					</TextField>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label={KaliFormsObject.translations.hubspot.misc.if}
						value={props.condition.condition}
						variant="filled"
						select
						onChange={e => props.changeCondition({ index: props.idx, key: 'condition', value: e.target.value })}
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
				</Grid>
				<Grid item xs={2}>
					<TextField
						label={KaliFormsObject.translations.hubspot.misc.operator}
						value={props.condition.operator}
						variant="filled"
						select
						onChange={e => props.changeCondition({ index: props.idx, key: 'operator', value: e.target.value })}
						fullWidth={true}>
						<MenuItem key="contains" value="contains">
							{KaliFormsObject.translations.hubspot.misc.contains}
						</MenuItem>
						<MenuItem key="equal" value="equal">
							{KaliFormsObject.translations.hubspot.misc.equal}
						</MenuItem>
					</TextField>
				</Grid>
				<Grid item xs={3}>
					<TextField
						label={KaliFormsObject.translations.hubspot.misc.value}
						value={props.condition.value}
						variant="filled"
						onChange={e => props.changeCondition({ index: props.idx, key: 'value', value: e.target.value })}
						fullWidth={true} />
				</Grid>
				<Grid item xs={2}>
					<IconButton
						aria-label={KaliFormsObject.translations.hubspot.misc.addCondition}
						onClick={props.addCondition}
						variant="contained"
						color="primary"
						size="medium">
						<AddIcon fontSize="inherit" />
					</IconButton>
					<If condition={props.conditionalLength === 1}>
						<IconButton
							aria-label={KaliFormsObject.translations.hubspot.misc.removeCondition}
							onClick={() => props.setDefaultCondition()}
							variant="contained"
							color="primary"
							size="medium">
							<DeleteIcon fontSize="inherit" />
						</IconButton>
					</If>
					<If condition={props.conditionalLength > 1}>
						<IconButton
							aria-label={KaliFormsObject.translations.hubspot.misc.removeCondition}
							onClick={() => props.removeCondition(props.idx)}
							variant="contained"
							color="primary"
							size="medium">
							<DeleteIcon fontSize="inherit" />
						</IconButton>
					</If>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default OwnerConditional;
