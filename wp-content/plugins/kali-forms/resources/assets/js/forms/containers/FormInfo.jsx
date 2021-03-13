import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import PlaceholderDialogOpener from './../components/PlaceholderDialogOpener';

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formInfo: state.FormInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const FormInfo = (props) => {
	useEffect(() => {
		if (props.formInfo.thankYouMessage !== '' && props.formInfo.thankYouMessage !== thankYouMessage) {
			setThankYouMessage(props.formInfo.thankYouMessage)
		}
	}, [props.formInfo.thankYouMessage])

	useEffect(() => {
		if (props.formInfo.requiredFieldMark !== '' && props.formInfo.requiredFieldMark !== requiredFieldMark) {
			setRequiredFieldMark(props.formInfo.requiredFieldMark)
		}
	}, [props.formInfo.requiredFieldMark])

	useEffect(() => {
		if (props.formInfo.showThankYouMessage !== '' && showThankYouMessage !== props.formInfo.showThankYouMessage) {
			setShowThankYouMessage(props.formInfo.showThankYouMessage === true ? '1' : '0')
		}
	}, [props.formInfo.showThankYouMessage])

	/**
	 * Returns a boolean, if we have the plugin installed it should be true
	 */
	const saveFormSubmissionsInstalled = () => KaliFormsObject.hasOwnProperty('saveFormSubmissions');
	// State
	const [requiredFieldMark, setRequiredFieldMark] = useState(KaliFormsObject.requiredFieldMark);
	const [globalErrorMessage, setGlobalErrorMessage] = useState(KaliFormsObject.globalErrorMessage);
	const [multipleSelectionsSeparator, setMultipleSelectionsSeparator] = useState(KaliFormsObject.multipleSelectionsSeparator);
	const [cssId, setCssId] = useState(KaliFormsObject.cssId);
	const [cssClass, setCssClass] = useState(KaliFormsObject.cssClass);
	const [thankYouMessage, setThankYouMessage] = useState(KaliFormsObject.thankYouMessage);
	const [redirectUrl, setRedirectUrl] = useState(KaliFormsObject.redirectUrl);

	const [hideFormName, setHideFormName] = useState(KaliFormsObject.hideFormName);
	const [removeCaptchaForLoggedUsers, setRemoveCaptchaForLoggedUsers] = useState(KaliFormsObject.removeCaptchaForLoggedUsers);
	const [showThankYouMessage, setShowThankYouMessage] = useState(KaliFormsObject.showThankYouMessage);

	const [saveFormSubmissions, setSaveFormSubmissions] = useState(KaliFormsObject.saveFormSubmissions)
	const [submissionViewPage, setSubmissionViewPage] = useState(KaliFormsObject.submissionViewPage)

	/**
	 * When toggle changes, update everything
	 *
	 * @param {*} event
	 * @memberof FormInfo
	 */
	const onToggleChange = (event, key) => {
		switch (key) {
			case 'removeCaptchaForLoggedUsers':
				setRemoveCaptchaForLoggedUsers(event.target.checked ? '1' : '0');
				break;
			case 'hideFormName':
				setHideFormName(event.target.checked ? '1' : '0');
				break;
			case 'showThankYouMessage':
				setShowThankYouMessage(event.target.checked ? '1' : '0');
				break;
			case 'saveFormSubmissions':
				setSaveFormSubmissions(event.target.checked ? '1' : '0');
				break;
			default:
				break;
		}
	}

	return (
		<div style={{ paddingTop: 16, paddingLeft: 32, paddingRight: 32 }}>
			<Grid container direction="row" spacing={8}>
				<Grid item>
					<Typography variant="h5">{KaliFormsObject.translations.formInfo.generalSettings}</Typography>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={8}>
				<Grid item xs={3}>
					<TextField
						label={KaliFormsObject.translations.formInfo.requiredFieldMark}
						value={requiredFieldMark}
						name="kaliforms[required_field_mark]"
						onChange={e => setRequiredFieldMark(e.target.value)}
						fullWidth={true}
						variant="filled"
						placeholder="(*)"
						inputProps={
							{ maxLength: 5 }
						}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						label={KaliFormsObject.translations.formInfo.multipleSelectionSeparator}
						value={multipleSelectionsSeparator}
						name="kaliforms[multiple_selections_separator]"
						onChange={e => setMultipleSelectionsSeparator(e.target.value)}
						fullWidth={true}
						variant="filled"
						placeholder=", or . or - or whatyouneed"
						inputProps={
							{ maxLength: 5 }
						}
					/>
				</Grid>
				<Grid item>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={removeCaptchaForLoggedUsers === '1'}
									onChange={e => onToggleChange(e, 'removeCaptchaForLoggedUsers')}
								/>
							}
							label={KaliFormsObject.translations.formInfo.removeCaptcha}
						/>
						<TextField type="hidden" name="kaliforms[remove_captcha_for_logged_users]" value={removeCaptchaForLoggedUsers} />
					</FormGroup>
				</Grid>
				<Grid item>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={hideFormName === '1'}
									onChange={e => onToggleChange(e, 'hideFormName')}
								/>
							}
							label={KaliFormsObject.translations.formInfo.hideFormName}
						/>
						<TextField type="hidden" name="kaliforms[hide_form_name]" value={hideFormName} />
					</FormGroup>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.formInfo.globalErrorMessage}
						value={globalErrorMessage}
						name="kaliforms[global_error_message]"
						onChange={e => setGlobalErrorMessage(e.target.value)}
						fullWidth={true}
						variant="filled"
						placeholder="Something went wrong..."
					/>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={8}>
				<Grid item>
					<Typography variant="h5">{KaliFormsObject.translations.formInfo.afterFormSubmit}</Typography>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={showThankYouMessage === '1'}
									onChange={e => onToggleChange(e, 'showThankYouMessage')}
								/>
							}
							label={KaliFormsObject.translations.formInfo.showThankYou}
						/>
						<TextField type="hidden" name="kaliforms[show_thank_you_message]" value={showThankYouMessage} />
					</FormGroup>
				</Grid>

				<If condition={saveFormSubmissionsInstalled()}>
					<Grid item>
						<FormGroup row>
							<FormControlLabel
								control={
									<Switch
										checked={saveFormSubmissions === '1'}
										onChange={e => onToggleChange(e, 'saveFormSubmissions')}
									/>
								}
								label={KaliFormsObject.translations.formInfo.saveFormSubmissions}
							/>
							<TextField type="hidden" name="kaliforms[save_form_submissions]" value={saveFormSubmissions} />
						</FormGroup>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={KaliFormsObject.translations.formInfo.submissionViewPage}
							value={submissionViewPage}
							type="url"
							name="kaliforms[submission_view_page]"
							onChange={e => setSubmissionViewPage(e.target.value)}
							fullWidth={true}
							variant="filled"
						/>
					</Grid>
				</If>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.formInfo.thankYouMessage}
						value={thankYouMessage}
						name="kaliforms[thank_you_message]"
						onChange={e => setThankYouMessage(e.target.value)}
						// multiline={true}
						variant="filled"
						fullWidth={true}
						InputProps={{
							endAdornment: (
								<PlaceholderDialogOpener adornment={true}></PlaceholderDialogOpener>
							),
						}}
						style={{ whiteSpace: 'pre' }}
					/>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={8}>
				<Grid item xs={12}>
					<TextField
						label={KaliFormsObject.translations.formInfo.redirectUrl}
						value={redirectUrl}
						name="kaliforms[redirect_url]"
						type="url"
						onChange={e => setRedirectUrl(e.target.value)}
						fullWidth={true}
						variant="filled"
						placeholder="www.google.com"
					/>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={8}>
				<Grid item>
					<Typography variant="h5">{KaliFormsObject.translations.formInfo.formClassAndId}</Typography>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.formInfo.cssId}
						value={cssId}
						name="kaliforms[css_id]"
						onChange={e => setCssId(e.target.value)}
						fullWidth={true}
						variant="filled"
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.formInfo.cssClass}
						value={cssClass}
						name="kaliforms[css_class]"
						onChange={e => setCssClass(e.target.value)}
						fullWidth={true}
						variant="filled"
					/>
				</Grid>
			</Grid>
		</div>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(FormInfo);
