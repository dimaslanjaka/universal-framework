import React from 'react';
import FieldComponentSelect from './FieldComponentSelect'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
const ActionConditionalLogic = (props) => {
	const selectChange = (data) => {
		let currentState = props.conditionalLogicConditions;
		currentState[data.field].formField = data.value;
		props.setConditionalLogicConditions([...currentState]);
	}
	const changedCondition = data => {
		props.setConditionalLogic(data);
	}

	const changeFieldCondition = (idx, value) => {
		let currentState = props.conditionalLogicConditions;
		currentState[idx].condition = value;
		props.setConditionalLogicConditions([...currentState]);
	}
	const changedValue = (idx, value) => {
		let currentState = props.conditionalLogicConditions;
		currentState[idx].value = value;
		props.setConditionalLogicConditions([...currentState]);
	}
	const setDefaultCondition = () => {
		let currentState = props.conditionalLogicConditions;
		props.setConditionalLogicConditions(
			[
				{ conditionalIndex: currentState.length, formField: '', condition: 'is', value: '' }
			]
		)
	}
	const addCondition = () => {
		let currentState = props.conditionalLogicConditions;
		props.setConditionalLogicConditions(
			[
				...currentState,
				{ conditionalIndex: currentState.length, formField: '', condition: 'is', value: '' }
			]
		)
	}
	const removeCondition = (idx) => {
		let currentState = props.conditionalLogicConditions;
		currentState.splice(idx, 1);
		props.setConditionalLogicConditions([...currentState]);
	}
	return (
		<div>
			<Grid container direction="row" spacing={4}>
				<Grid item>
					<Typography style={{ lineHeight: 2.1 }}>
						{KaliFormsObject.translations.hubspot.misc.processIf}
					</Typography>
				</Grid>
				<Grid item>
					<TextField value={props.conditionalLogic} select onChange={e => changedCondition(e.target.value)}>
						<MenuItem value="any">
							{KaliFormsObject.translations.hubspot.misc.any}
						</MenuItem>
						<MenuItem value="all">
							{KaliFormsObject.translations.hubspot.misc.all}
						</MenuItem>
					</TextField>
				</Grid>
			</Grid>
			{
				props.conditionalLogicConditions.map((condition, idx) => (
					<Grid container direction="row" key={idx} spacing={4}>
						<Grid item xs={3}>
							<FieldComponentSelect
								label={KaliFormsObject.translations.hubspot.misc.formField}
								field={idx}
								selectedValue={condition.formField}
								onChange={selectChange} />
						</Grid>
						<Grid item xs={2}>
							<TextField
								label={KaliFormsObject.translations.hubspot.misc.field}
								variant="filled"
								value={condition.condition}
								onChange={e => changeFieldCondition(idx, e.target.value)}
								select
								fullWidth={true}>
								<MenuItem value='is'>{KaliFormsObject.translations.hubspot.misc.is}</MenuItem>
								<MenuItem value='not'>{KaliFormsObject.translations.hubspot.misc.isNot}</MenuItem>
								<MenuItem value='greater'>{KaliFormsObject.translations.hubspot.misc.greaterThan}</MenuItem>
								<MenuItem value='less'>{KaliFormsObject.translations.hubspot.misc.lessThan}</MenuItem>
								<MenuItem value='contains'>{KaliFormsObject.translations.hubspot.misc.contains}</MenuItem>
								<MenuItem value='starts'>{KaliFormsObject.translations.hubspot.misc.starts}</MenuItem>
								<MenuItem value='ends'>{KaliFormsObject.translations.hubspot.misc.ends}</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={3}>
							<TextField
								label={KaliFormsObject.translations.hubspot.misc.value}
								variant="filled"
								onChange={e => changedValue(idx, e.target.value)}
								value={condition.value}
								fullWidth={true} />
						</Grid>
						<Grid item xs={2}>
							<IconButton aria-label={KaliFormsObject.translations.hubspot.misc.addCondition}
								onClick={() => addCondition()}
								variant="contained"
								color="primary"
								size="medium">
								<AddIcon fontSize="inherit" />
							</IconButton>
							<If condition={props.conditionalLogicConditions.length === 1}>
								<IconButton aria-label={KaliFormsObject.translations.hubspot.misc.removeCondition}
									onClick={() => setDefaultCondition()}
									variant="contained"
									color="primary"
									size="medium">
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</If>
							<If condition={props.conditionalLogicConditions.length > 1}>
								<IconButton aria-label={KaliFormsObject.translations.hubspot.misc.removeCondition}
									onClick={() => removeCondition(idx)}
									variant="contained"
									color="primary"
									size="medium">
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</If>
						</Grid>
					</Grid>
				))
			}
		</div>
	)
}

export default ActionConditionalLogic;
