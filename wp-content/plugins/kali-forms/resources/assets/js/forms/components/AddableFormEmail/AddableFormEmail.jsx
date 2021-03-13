import React, { useState, useEffect } from 'react';
import RichTextEditor from 'react-rte';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import PlaceholderDialogOpener from './../PlaceholderDialogOpener'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../store/actions';
import InputAdornment from '@material-ui/core/InputAdornment';

const mapStateToProps = state => {
	return {
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(StoreActions, dispatch);
};

const AddableFormEmail = (props) => {
	const [fromName, setFromName] = useState(props.emailData.fromName);
	const [fromEmail, setFromEmail] = useState(props.emailData.fromEmail);
	const [toEmail, setToEmail] = useState(props.emailData.toEmail);
	const [replyTo, setReplyTo] = useState(props.emailData.replyTo);
	const [ccEmail, setCcEmail] = useState(props.emailData.ccEmail);
	const [bccEmail, setBccEmail] = useState(props.emailData.bccEmail);
	const [emailAttachmentFilePaths, setEmailAttachmentFilePaths] = useState(props.emailData.emailAttachmentFilePaths);
	const [emailAttachmentMediaIds, setEmailAttachmentMediaIds] = useState(props.emailData.emailAttachmentMediaIds);
	const [emailAttachment, setEmailAttachment] = useState(props.emailData.emailAttachment);
	const [emailSubject, setEmailSubject] = useState(props.emailData.emailSubject);
	const [emailBody, setEmailBody] = useState(RichTextEditor.createEmptyValue().setContentFromString(props.emailData.emailBody, 'html'));
	const [index, setIndex] = useState(props.index);
	const [fileFields, setFileFields] = useState([]);

	useEffect(() => {
		let fields = getFileFields();
		setFileFields(fields);
	}, [props.fieldComponents, props.fieldComponentsHash]);

	const getFileFields = () => {
		let fieldComponents = [];
		let currentValues = emailAttachment.split(',')
		props.fieldComponents.map(e => {
			if (e.id === 'fileUpload') {
				fieldComponents.push({
					type: e.id,
					name: e.properties.caption !== '' ? e.properties.caption : e.properties.id,
					value: e.properties.name,
					checked: currentValues.indexOf(e.properties.name) > -1 ? true : false,
				})
			}
		});
		return fieldComponents;
	}

	const handleChange = name => event => {
		let currentState = [...fileFields];
		currentState.map(field => {
			if (field.value === name) {
				field.checked = !field.checked;
			}
		});

		setFileFields(currentState);
		onChange({}, 'emailAttachment');
	};

	const getCurrentState = () => {
		return {
			fromName,
			fromEmail,
			toEmail,
			replyTo,
			ccEmail,
			bccEmail,
			emailAttachment,
			emailAttachmentFilePaths,
			emailAttachmentMediaIds,
			emailSubject,
			emailBody: emailBody.toString('html'),
			index,
		}
	}

	/**
	* When input changes, we need to update state
	*
	* @param {*} e
	* @param {*} key
	* @memberof AddableFormEmail
	*/
	const onChange = (e, key) => {
		switch (key) {
			case 'fromName':
				setFromName(e.target.value)
				break;
			case 'fromEmail':
				setFromEmail(e.target.value)
				break;
			case 'toEmail':
				setToEmail(e.target.value)
				break;
			case 'replyTo':
				setReplyTo(e.target.value)
				break;
			case 'ccEmail':
				setCcEmail(e.target.value)
				break;
			case 'bccEmail':
				setBccEmail(e.target.value)
				break;
			case 'emailAttachment':
				let values = [];
				fileFields.map(field => {
					if (field.checked) {
						values.push(field.value)
					}
				});

				setEmailAttachment(values.join(','))
				break;
			case 'emailAttachmentFilePaths':
				setEmailAttachmentFilePaths(e.target.value)
				break;
			case 'emailAttachmentMediaIds':
				setEmailAttachmentMediaIds(e.target.value)
				break;
			case 'emailSubject':
				setEmailSubject(e.target.value)
				break;
			case 'emailBody':
				setEmailBody(e)
				break;
			case 'index':
				setIndex(e.target.value)
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		if (props.onChange) {
			props.onChange(getCurrentState())
		}
	}, [
		fromName,
		fromEmail,
		toEmail,
		replyTo,
		ccEmail,
		bccEmail,
		emailAttachmentFilePaths,
		emailAttachmentMediaIds,
		emailAttachment,
		emailSubject,
		emailBody,
	])

	return (
		<div>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={12}>
					<TextField type="text"
						label={KaliFormsObject.translations.formEmails.subject}
						id="emailSubject"
						value={emailSubject}
						placeholder={KaliFormsObject.translations.formEmails.subjectPlaceholder}
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'emailSubject')} />
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField type="text"
						id="fromName"
						label={KaliFormsObject.translations.formEmails.fromName}
						value={fromName}
						placeholder="John Doe..."
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'fromName')}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField type="text"
						label={KaliFormsObject.translations.formEmails.fromEmail}
						id="fromEmail"
						value={fromEmail}
						placeholder="johndoe@wordpress.site"
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'fromEmail')}
					/>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField type="text"
						label={KaliFormsObject.translations.formEmails.toEmail}
						id="toEmail"
						value={toEmail}
						placeholder="janedoe@wordpress.site"
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'toEmail')} />
				</Grid>
				<Grid item xs={6}>
					<TextField type="text"
						label={KaliFormsObject.translations.formEmails.replyTo}
						id="replyTo"
						value={replyTo}
						placeholder="johndoe@wordpress.site"
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'replyTo')} />
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField type="text"
						label={KaliFormsObject.translations.formEmails.ccEmail}
						id="ccEmail"
						value={ccEmail}
						placeholder="johndoe@wordpress.site"
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'ccEmail')} />
				</Grid>
				<Grid item xs={6}>
					<TextField type="text"
						label={KaliFormsObject.translations.formEmails.bccEmail}
						id="bccEmail"
						value={bccEmail}
						placeholder="janedoe@wordpress.site"
						fullWidth={true}
						variant="filled"
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						onChange={(e) => onChange(e, 'bccEmail')} />
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={12}>
					<RichTextEditor className="kaliforms-post-editor"
						value={emailBody}
						customControls={[
							<PlaceholderDialogOpener key="placeholder-dialog-opener" adornment={false}></PlaceholderDialogOpener>
						]}
						onChange={e => onChange(e, 'emailBody')} />
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField type="text"
						id="emailAttachmentFilePaths"
						label={KaliFormsObject.translations.formEmails.emailAttachmentFilePaths}
						value={emailAttachmentFilePaths}
						InputProps={{
							startAdornment: <InputAdornment position="start">{KaliFormsObject.ABSPATH}</InputAdornment>,
						}}
						helperText={KaliFormsObject.translations.formEmails.pathToYourWpIs + ' ' + KaliFormsObject.ABSPATH}
						placeholder="path/to/file.zip"
						fullWidth={true}
						variant="filled"
						onChange={(e) => onChange(e, 'emailAttachmentFilePaths')}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField type="text"
						id="emailAttachmentMediaIds"
						label={KaliFormsObject.translations.formEmails.emailAttachmentMediaIds}
						value={emailAttachmentMediaIds}
						helperText={KaliFormsObject.translations.formEmails.mediaAttachmentHelperText}
						fullWidth={true}
						variant="filled"
						onChange={(e) => onChange(e, 'emailAttachmentMediaIds')}
					/>
				</Grid>
			</Grid>
			<If condition={fileFields.length}>
				<Grid container direction="row" spacing={8}>
					<Grid item xs={12}>
						{KaliFormsObject.translations.formEmails.fileUploadSelection}
						<br />
						{fileFields.map(field => (
							<FormControlLabel
								key={field.value}
								control={
									<Checkbox
										checked={field.checked}
										onChange={handleChange(field.value)}
										key={field.value}
										value={field.value} />
								}
								label={field.name}
							/>
						))}
					</Grid>
				</Grid>
			</If>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddableFormEmail)
