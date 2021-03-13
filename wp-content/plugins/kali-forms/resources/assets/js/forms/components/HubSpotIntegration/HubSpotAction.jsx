import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ContactFormFieldsMap from './ContactFormFieldsMap'
import OwnerSelection from './OwnerSelection'
import React, { useEffect, useState } from 'react';
import AdditionalFormFields from './AdditionalFormFields'
import ActionConditionalLogic from './ActionConditionalLogic'
import HubSpotSectionHeader from './HubSpotSectionHeader'

const HubSpotAction = (props) => {
	// Current action state
	let currentData = props.hubspotData
	const [hubSpotAction, setHubSpotAction] = useState(currentData.hubSpotAction);
	const [hubSpotFormName, setHubSpotFormName] = useState(currentData.hubSpotFormName);
	const [leadStatus, setLeadStatus] = useState(currentData.leadStatus);
	const [lifecycleStage, setLifecycleStage] = useState(currentData.lifecycleStage);
	const [contactOwnerOption, setContactOwnerOption] = useState(currentData.contactOwnerOption);
	const [contactOwner, setContactOwner] = useState(currentData.contactOwner);
	const [conditionalOwner, setConditionalOwner] = useState(currentData.conditionalOwner);
	const [formFieldsMap, setFormFieldsMap] = useState(currentData.formFieldsMap);
	const [additionalFormFields, setAdditionalFormFields] = useState(currentData.additionalFormFields);
	const [conditionalLogic, setConditionalLogic] = useState(currentData.conditionalLogic)
	const [conditionalLogicConditions, setConditionalLogicConditions] = useState(currentData.conditionalLogicConditions);
	const [guid, setGuid] = useState(currentData.guid);
	const [portalId, setPortalId] = useState(currentData.portalId);

	// Initial Load
	useEffect(() => {
		let currentData = props.hubspotData;
		setHubSpotAction(currentData.hubSpotAction);
		setHubSpotFormName(currentData.hubSpotFormName);
		setLeadStatus(currentData.leadStatus);
		setLifecycleStage(currentData.lifecycleStage);
		setContactOwnerOption(currentData.contactOwnerOption);
		setContactOwner(currentData.contactOwner);
		setConditionalOwner(currentData.conditionalOwner);
		setFormFieldsMap(currentData.formFieldsMap);
		setAdditionalFormFields(currentData.additionalFormFields);
		setConditionalLogic(currentData.conditionalLogic);
		setConditionalLogicConditions(currentData.conditionalLogicConditions);
		setGuid(currentData.guid);
		setPortalId(currentData.portalId);
	}, [props.idx])

	// When something changes, we need to update the values that are saved in database
	useEffect(() => {
		props.setHubspotDataByIndex(props.idx, { hubSpotAction, hubSpotFormName, leadStatus, lifecycleStage, contactOwner, contactOwnerOption, conditionalOwner, formFieldsMap, additionalFormFields, conditionalLogic, conditionalLogicConditions, guid, portalId, idx: props.idx })
	}, [hubSpotAction, hubSpotFormName, leadStatus, lifecycleStage, contactOwner, contactOwnerOption, conditionalOwner, formFieldsMap, additionalFormFields, conditionalLogic, conditionalLogicConditions, guid, portalId])

	return (
		<div>
			<HubSpotSectionHeader
				header={KaliFormsObject.translations.hubspot.misc.hubspotAction}
				backButton={true}
				backButtonAction={props.goBack} />
			<Grid container direction="row" spacing={4}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.hubspot.actions.hubspotActionName}
						required
						value={hubSpotAction}
						onChange={e => setHubSpotAction(e.target.value)}
						fullWidth={true}
						variant="filled"
						helperText={KaliFormsObject.translations.hubspot.actions.hubspotActionHelperText}
						placeholder={KaliFormsObject.translations.hubspot.misc.hubSpotAction}
					/>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={4}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.hubspot.actions.hubspotFormName}
						required
						value={hubSpotFormName}
						onChange={e => setHubSpotFormName(e.target.value)}
						fullWidth={true}
						variant="filled"
						helperText={KaliFormsObject.translations.hubspot.actions.hubspotFormNameHelperText}
						placeholder={KaliFormsObject.translations.hubspot.actions.hubspotFormNamePlaceholder}
					/>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={4}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.hubspot.general.leadStatus}
						value={leadStatus}
						variant="filled"
						onChange={e => setLeadStatus(e.target.value)}
						select
						fullWidth={true}
						helperText={KaliFormsObject.translations.hubspot.actions.leadStatusHelperText}
					>
						<MenuItem key="select-option" value="">
							{KaliFormsObject.translations.hubspot.misc.selectOption}
						</MenuItem>
						<MenuItem key="NEW" value="NEW">
							{KaliFormsObject.translations.hubspot.misc.new}
						</MenuItem>
						<MenuItem key="OPEN" value="OPEN">
							{KaliFormsObject.translations.hubspot.misc.open}
						</MenuItem>
						<MenuItem key="IN_PROGRESS" value="IN_PROGRESS">
							{KaliFormsObject.translations.hubspot.misc.inProgress}
						</MenuItem>
						<MenuItem key="OPEN_DEAL" value="OPEN_DEAL">
							{KaliFormsObject.translations.hubspot.misc.openDeal}
						</MenuItem>
						<MenuItem key="UNQUALIFIED" value="UNQUALIFIED">
							{KaliFormsObject.translations.hubspot.misc.unqualified}
						</MenuItem>
						<MenuItem key="ATTEMPTED_TO_CONTACT" value="ATTEMPTED_TO_CONTACT">
							{KaliFormsObject.translations.hubspot.misc.attemptedToContact}
						</MenuItem>
						<MenuItem key="CONNECTED" value="CONNECTED">
							{KaliFormsObject.translations.hubspot.misc.connected}
						</MenuItem>
						<MenuItem key="BAD_TIMING" value="BAD_TIMING">
							{KaliFormsObject.translations.hubspot.misc.badTiming}
						</MenuItem>
					</TextField>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={4}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.hubspot.general.lifecycle + ' ' + KaliFormsObject.translations.hubspot.general.stage}
						value={lifecycleStage}
						variant="filled"
						onChange={e => setLifecycleStage(e.target.value)}
						select
						fullWidth={true}
						helperText={KaliFormsObject.translations.hubspot.actions.lifeCycleHelperText}
					>
						<MenuItem key="select-option" value="">
							{KaliFormsObject.translations.hubspot.misc.selectOption}
						</MenuItem>
						<MenuItem key="subscriber" value="subscriber">
							{KaliFormsObject.translations.hubspot.misc.subscriber}
						</MenuItem>
						<MenuItem key="lead" value="lead">
							{KaliFormsObject.translations.hubspot.misc.lead}
						</MenuItem>
						<MenuItem key="marketingqualifiedlead" value="marketingqualifiedlead">
							{KaliFormsObject.translations.hubspot.misc.marketingQualifiedLead}
						</MenuItem>
						<MenuItem key="salesqualifiedlead" value="salesqualifiedlead">
							{KaliFormsObject.translations.hubspot.misc.salesQualifiedLead}
						</MenuItem>
						<MenuItem key="opportunity" value="opportunity">
							{KaliFormsObject.translations.hubspot.misc.opportunity}
						</MenuItem>
						<MenuItem key="customer" value="customer">
							{KaliFormsObject.translations.hubspot.misc.customer}
						</MenuItem>
						<MenuItem key="evangelist" value="evangelist">
							{KaliFormsObject.translations.hubspot.misc.evangelist}
						</MenuItem>
						<MenuItem key="other" value="other">
							{KaliFormsObject.translations.hubspot.misc.other}
						</MenuItem>
					</TextField>
				</Grid>
			</Grid>

			<HubSpotSectionHeader header={KaliFormsObject.translations.hubspot.actions.owner} />
			<OwnerSelection
				setContactOwnerOption={setContactOwnerOption}
				contactOwnerOption={contactOwnerOption}
				setContactOwner={setContactOwner}
				contactOwner={contactOwner}
				conditionalOwner={conditionalOwner}
				setConditionalOwner={setConditionalOwner}
			/>

			<HubSpotSectionHeader header={KaliFormsObject.translations.hubspot.general.mapFormFields} />
			<ContactFormFieldsMap setFormFieldsMap={setFormFieldsMap} formFieldsMap={formFieldsMap} />

			<HubSpotSectionHeader header={KaliFormsObject.translations.hubspot.general.additionalFormFields} />
			{
				additionalFormFields.map((formField, idx) => (
					<AdditionalFormFields
						key={idx}
						additionalFieldIndex={idx}
						additionalFormFields={additionalFormFields}
						setAdditionalFormFields={setAdditionalFormFields}
						hubSpotProperty={formField.hubspotProperty}
						assignedFormField={formField.assignedFormField}
					/>
				))
			}

			<HubSpotSectionHeader header={KaliFormsObject.translations.hubspot.general.conditionalLogic} />
			<ActionConditionalLogic
				conditionalLogic={conditionalLogic}
				conditionalLogicConditions={conditionalLogicConditions}
				setConditionalLogic={setConditionalLogic}
				setConditionalLogicConditions={setConditionalLogicConditions}
			/>

			<TextField
				type="hidden"
				value={guid}
				readOnly={true}
			/>
			<TextField
				type="hidden"
				value={portalId}
				readOnly={true}
			/>
		</div>
	);
}
export default HubSpotAction;
