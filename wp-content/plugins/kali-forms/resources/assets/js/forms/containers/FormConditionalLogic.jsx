import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
		conditionalLogic: state.ConditionalLogic,
		formFieldEditor: state.FormFieldEditor,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};


const FormConditionalLogic = (props) => {
	const [labels, setLabels] = useState({
		fieldComponents: {},
		fieldConditioners: {},
		states: {
			hide: KaliFormsObject.translations.conditionalLogic.hide,
			show: KaliFormsObject.translations.conditionalLogic.show,
		},
		operator: {
			equal: KaliFormsObject.translations.conditionalLogic.equalTo,
			different: KaliFormsObject.translations.conditionalLogic.differentThan,
			or: KaliFormsObject.translations.conditionalLogic.canBe
		},
	});
	const [conditionalValue, setConditionalValue] = useState('');
	const [conditionalField, setConditionalField] = useState('');
	const [action, setAction] = useState('hide');
	const [conditionedByField, setConditionedByField] = useState('');
	const [operator, setOperator] = useState('equal');
	const [tableLoading, setTableLoading] = useState(false);
	const [conditions, setConditions] = useState([]);
	const [errors, setErrors] = useState([])

	const labelConstructor = () => {
		let fieldComponentsSimplified = {};
		let fieldComponentsConditioners = {};

		props.fieldComponents.map(e => {
			fieldComponentsSimplified[e.internalId] = {
				caption: typeof e.properties.caption !== 'undefined' && e.properties.caption !== ''
					? e.properties.caption
					: e.properties.id,
			}

			if (e.id === 'select' || e.id === 'dropdown' || e.id === 'checkbox' || e.id === 'radio' || e.id === 'choices') {
				fieldComponentsConditioners[e.internalId] = {
					caption: typeof e.properties.caption !== 'undefined' && e.properties.caption !== ''
						? e.properties.caption
						: e.properties.id,
					values: e.properties.choices,
				}
			}
		})

		let obj = { ...labels, fieldComponents: fieldComponentsSimplified, fieldConditioners: fieldComponentsConditioners };
		setLabels(obj);
	};

	useEffect(() => {
		setConditionalValue('');
	}, [conditionedByField])

	useEffect(() => {
		labelConstructor()
		if (props.fieldComponents !== Object.keys(labels.fieldComponents).length) {
			let availableIds = []
			props.fieldComponents.map(e => availableIds.push(e.internalId));
			let newConditions = conditions.filter(e => availableIds.indexOf(e.field) > -1)
			newConditions = newConditions.filter(e => availableIds.indexOf(e.conditioner) > -1)

			setConditions([...newConditions]);
		}
	}, [props.fieldComponents, props.fieldComponentsHash])

	useEffect(() => {
		setConditions(KaliFormsObject.conditionalLogic)
	}, [])

	const pushConditionalField = () => {
		setErrors([])
		let newCondition = {
			field: conditionalField,
			state: action,
			conditioner: conditionedByField,
			operator: operator,
			value: conditionalValue,
		}

		let currentErrors = [];
		if (newCondition.field === '') {
			currentErrors.push('conditionalField')
		}
		if (newCondition.conditioner === '') {
			currentErrors.push('conditionedByField')
		}
		if (newCondition.value === '') {
			currentErrors.push('conditionalValue')
		}
		if (currentErrors.length) {
			return setErrors([...currentErrors])
		}

		setConditions([...conditions, newCondition])
		props.setConditionalLogic([...conditions, newCondition])
	}

	const removeCondition = (idx) => {
		let currentConditions = conditions.filter((e, index) => index !== idx);
		setConditions([...currentConditions]);
	}

	const isError = (key) => {
		if (errors.length === 0) {
			return false;
		}

		return errors.indexOf(key) !== -1;
	}

	return (
		<div>
			<Grid container direction="row" style={{ marginTop: 10 }} spacing={4} alignItems="center">
				<Grid item xs={2}>
					<TextField
						label={KaliFormsObject.translations.conditionalLogic.currentField}
						value={conditionalField}
						onChange={e => setConditionalField(e.target.value)}
						error={isError('conditionalField')}
						select
						variant="filled"
						fullWidth={true}
					>
						{props.fieldComponents.map(e => (
							<MenuItem key={e.internalId} value={e.internalId}>
								{
									typeof e.properties.caption !== 'undefined' && e.properties.caption !== ''
										? e.properties.caption
										: e.properties.id
								}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label={KaliFormsObject.translations.conditionalLogic.state}
						value={action}
						onChange={e => setAction(e.target.value)}
						select
						variant="filled"
						fullWidth={true}
					>
						<MenuItem value='show'>
							{KaliFormsObject.translations.conditionalLogic.show}
						</MenuItem>
						<MenuItem value='hide'>
							{KaliFormsObject.translations.conditionalLogic.hide}
						</MenuItem>
					</TextField>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label={KaliFormsObject.translations.conditionalLogic.ifThisField}
						value={conditionedByField}
						error={isError('conditionedByField')}
						onChange={e => setConditionedByField(e.target.value)}
						select
						variant="filled"
						fullWidth={true}
					>
						{
							Object.keys(labels.fieldConditioners).map((key, index) => (
								<MenuItem key={key} value={key}>
									{labels.fieldConditioners[key].caption}
								</MenuItem>
							))
						}
					</TextField>
				</Grid>
				<Grid item xs={2}>
					<TextField
						label={KaliFormsObject.translations.conditionalLogic.operator}
						value={operator}
						onChange={e => setOperator(e.target.value)}
						select
						variant="filled"
						fullWidth={true}
					>
						<MenuItem value='equal'>
							{KaliFormsObject.translations.conditionalLogic.equalTo}
						</MenuItem>
						<MenuItem value='different'>
							{KaliFormsObject.translations.conditionalLogic.differentThan}
						</MenuItem>
						<MenuItem value='or'>
							{KaliFormsObject.translations.conditionalLogic.canBe}
						</MenuItem>
					</TextField>
				</Grid>
				<Grid item xs={2}>
					<If condition={conditionedByField !== ''}>
						<TextField
							label={KaliFormsObject.translations.conditionalLogic.value}
							value={conditionalValue}
							onChange={e => setConditionalValue(e.target.value)}
							fullWidth={true}
							variant="filled"
							error={isError('conditionalValue')}
							select
						>
							{
								typeof labels.fieldConditioners[conditionedByField] !== 'undefined'
								&& labels.fieldConditioners[conditionedByField].values.map((e, index) => (
									<MenuItem key={index} value={e.value}>
										{e.label}
									</MenuItem>
								))
							}
						</TextField>
					</If>
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" onClick={() => pushConditionalField()}>
						{KaliFormsObject.translations.conditionalLogic.add}
						<PlusIcon></PlusIcon>
					</Button>
					<TextField
						value={JSON.stringify(conditions)}
						type="hidden"
						name="kaliforms[conditional_logic]"
					/>
				</Grid>
			</Grid>

			<Grid container justify="center" style={{ marginTop: 50 }}>
				<Grid item xs={9}>
					<Paper style={{ width: '100%', overflowX: 'auto', }} elevation={1}>
						<Table style={{ opacity: tableLoading ? .5 : 1, transition: 'all .5s ease-in-out' }}>
							<If condition={conditions.length}>
								<TableHead>
									<TableRow>
										<TableCell>{KaliFormsObject.translations.conditionalLogic.field}</TableCell>
										<TableCell>{KaliFormsObject.translations.conditionalLogic.state}</TableCell>
										<TableCell>{KaliFormsObject.translations.conditionalLogic.conditionedBy}</TableCell>
										<TableCell>{KaliFormsObject.translations.conditionalLogic.if}</TableCell>
										<TableCell>{KaliFormsObject.translations.conditionalLogic.value}</TableCell>
										<TableCell>{KaliFormsObject.translations.conditionalLogic.action}</TableCell>
									</TableRow>
								</TableHead>
							</If>
							<TableBody>
								<If condition={conditions.length}>
									{
										conditions.map((e, idx) =>
											(
												<TableRow key={idx + e.field}>
													<TableCell>
														{labels.fieldComponents[e.field].caption}
													</TableCell>
													<TableCell>
														{labels.states[e.state]}
													</TableCell>
													<TableCell>
														{labels.fieldComponents[e.conditioner].caption}
													</TableCell>
													<TableCell>
														{labels.operator[e.operator]}
													</TableCell>
													<TableCell>
														{e.value}
													</TableCell>
													<TableCell>
														<IconButton aria-label="delete condition" color="primary" onClick={() => removeCondition(idx)}>
															<DeleteIcon />
														</IconButton>
													</TableCell>
												</TableRow>
											)
										)
									}
								</If>
								<If condition={!conditions.length}>
									<TableRow>
										<TableCell style={{ textAlign: 'center' }} >
											<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.conditionalLogic.placeholder }}></span>
										</TableCell>
									</TableRow>
								</If>
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(FormConditionalLogic);
