import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../store/actions';
import OwnerConditional from './OwnerConditional';

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

const OwnerSelection = (props) => {
	const [conditional, setConditional] = useState(props.conditionalOwner);
	const addCondition = () => {
		let condition = {
			owner: '',
			condition: '',
			operator: 'contains',
			value: '',
		}
		setConditional([...conditional, condition]);
	}
	const removeCondition = (idx) => {
		let currentState = conditional;
		currentState.splice(idx, 1);
		setConditional([...currentState]);
		props.setConditionalOwner([...currentState]);
	}
	const changeCondition = (obj) => {
		let currentState = conditional;
		if (typeof currentState[obj.index] === 'undefined') {
			return;
		}
		if (!currentState[obj.index].hasOwnProperty([obj.key])) {
			return;
		}
		currentState[obj.index][obj.key] = obj.value;
		setConditional([...currentState]);
		props.setConditionalOwner(conditional);
	}
	const setDefaultCondition = () => {
		let currentState = conditional;

		currentState[0] = {
			owner: '',
			condition: '',
			operator: 'contains',
			value: '',
		}

		setConditional([...currentState]);
		props.setConditionalOwner(conditional);
	};
	useEffect(_ => {
		if (!props.conditionalOwner.length) {
			addCondition();
		}
	}, [])


	return (
		<Grid container direction="row" spacing={4}>
			<Grid item xs={6}>
				<TextField
					label={KaliFormsObject.translations.hubspot.actions.contactOwner}
					value={props.contactOwnerOption}
					variant="filled"
					onChange={e => props.setContactOwnerOption(e.target.value)}
					select
					fullWidth={true}
					helperText={KaliFormsObject.translations.hubspot.actions.contactOwnerHelperText}
				>
					<MenuItem key="none" value="none">
						{KaliFormsObject.translations.hubspot.misc.none}
					</MenuItem>
					<MenuItem key="select" value="select">
						{KaliFormsObject.translations.hubspot.misc.selectOwner}
					</MenuItem>
					<MenuItem key="conditional" value="conditional">
						{KaliFormsObject.translations.hubspot.misc.conditional}
					</MenuItem>
				</TextField>
			</Grid>
			<If condition={props.contactOwnerOption === 'select'}>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.hubspot.actions.assignOwner}
						value={props.contactOwner}
						variant="filled"
						onChange={e => props.setContactOwner(e.target.value)}
						select
						fullWidth={true}>
						<MenuItem value="">{KaliFormsObject.translations.hubspot.actions.assignOwner}</MenuItem>
						{KaliFormsHubSpot.contactOwners.map(owner => <MenuItem key={owner.ownerId} value={owner.ownerId}>{owner.firstName} {owner.lastName}</MenuItem>)}
					</TextField>
				</Grid>
			</If>
			<If condition={props.contactOwnerOption === 'conditional'}>
				{
					conditional.map((condition, idx) => (
						<OwnerConditional
							key={idx}
							idx={idx}
							changeCondition={changeCondition}
							condition={condition}
							removeCondition={removeCondition}
							addCondition={addCondition}
							setDefaultCondition={setDefaultCondition}
							conditionalLength={conditional.length}
							fieldComponents={props.fieldComponents}
						/>
					))
				}
			</If>
		</Grid>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSelection);
