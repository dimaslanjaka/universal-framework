import React, { useState, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import PlaceholderDialogOpener from './../../PlaceholderDialogOpener'
import Grid from '@material-ui/core/Grid'
import RichTextEditor from 'react-rte';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../../store/actions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
	},
}));

const mapStateToProps = state => {
	return {
		emailWizardDialog: state.EmailWizardDialog,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

/**
 * Email wizard components
 *
 * @param {*} props
 */
const EmailWizard = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [emailSubject, setEmailSubject] = useState('');
	const [fromEmail, setFromEmail] = useState('');
	const [fromName, setFromName] = useState('');
	const [toEmail, setToEmail] = useState('');
	const [emailBody, setEmailBody] = useState(RichTextEditor.createEmptyValue());

	/**
	 * Allow external toggling on/off
	 */
	useEffect(() => {
		props.emailWizardDialog
			? setOpen(true)
			: setOpen(false);
	}, [props.emailWizardDialog]);

	/**
	 * Handles the next button
	 */
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	/**
	 * Handle the back button
	 */
	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};
	/**
	 * Handles closing
	 */
	const handleClose = () => {
		setOpen(false);
	};
	/**
	 * Handle step wizard finish
	 */
	const handleFinish = () => {
		/**
		 * emailSetter was exposed from the previous component
		 */
		props.emailSetter([
			...props.currentEmails,
			{
				fromName: fromName,
				fromEmail: fromEmail,
				toEmail: toEmail,
				replyTo: '',
				ccEmail: '',
				bccEmail: '',
				emailSubject: emailSubject,
				emailAttachmentFilePaths: '',
				emailAttachment: '',
				emailBody: emailBody.toString('html')
			}
		])

		/**
		 * Close the dialog
		 */
		setOpen(false);
	};

	/**
	 * When dialog exists, we need to reset the wizard
	 */
	const onExit = () => {
		setActiveStep(0);
		setFromEmail('');
		setToEmail('');
		setEmailSubject('');
		setFromName('');
		setEmailBody(RichTextEditor.createEmptyValue());
		props.setEmailWizardDialogOff();
	}

	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			onClose={handleClose}
			onExited={onExit}
			maxWidth="md"
		>
			<DialogContent>
				<Stepper activeStep={activeStep} orientation="vertical">
					<Step>
						<If condition={activeStep === 0}>
							<StepLabel>
								{KaliFormsObject.translations.emailWizard.stepOne}
							</StepLabel>
						</If>
						<If condition={activeStep > 0}>
							<StepLabel>
								{KaliFormsObject.translations.emailWizard.stepOneCompleted}
								<br />
								<small>{emailSubject}</small>
							</StepLabel>
						</If>
						<StepContent>
							<Typography>
								<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.emailWizard.stepOneContent }}></span>
							</Typography>
							<Grid container direction="row" spacing={8}>
								<Grid item xs={6}>
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
										onChange={(e) => setEmailSubject(e.target.value)}
									/>

								</Grid>
							</Grid>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.next}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
					<Step>
						<If condition={activeStep <= 1}>
							<StepLabel>
								{KaliFormsObject.translations.emailWizard.stepTwo}
							</StepLabel>
						</If>
						<If condition={activeStep > 1}>
							<StepLabel>
								{KaliFormsObject.translations.emailWizard.stepTwoCompleted}
								<br />
								<small>{fromName} - {fromEmail}</small>
							</StepLabel>
						</If>
						<StepContent>
							<Typography>
								<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.emailWizard.stepTwoContent }}></span>
							</Typography>
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
										onChange={(e) => setFromName(e.target.value)}
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
										onChange={(e) => setFromEmail(e.target.value)}
									/>
								</Grid>
							</Grid>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										onClick={handleBack}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.back}
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.next}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
					<Step>
						<If condition={activeStep <= 2}>
							<StepLabel>
								{KaliFormsObject.translations.emailWizard.stepThree}
							</StepLabel>
						</If>
						<If condition={activeStep > 2}>
							<StepLabel>
								{KaliFormsObject.translations.emailWizard.stepThreeCompleted}
								<br />
								<small>{toEmail}</small>
							</StepLabel>
						</If>
						<StepContent>
							<Typography>
								<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.emailWizard.stepThreeContent }}></span>
							</Typography>
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
										onChange={(e) => setToEmail(e.target.value)} />
								</Grid>
							</Grid>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										onClick={handleBack}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.back}
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.next}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
					<Step>
						<StepLabel>
							{KaliFormsObject.translations.emailWizard.stepFour}
						</StepLabel>
						<StepContent>
							<Typography>
								<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.emailWizard.stepFourContent }}></span>
							</Typography>
							<Grid container direction="row" spacing={8}>
								<Grid item xs={10}>
									<RichTextEditor className="kaliforms-post-editor"
										value={emailBody}
										customControls={[
											<PlaceholderDialogOpener key="placeholder-dialog-opener" adornment={false}></PlaceholderDialogOpener>
										]}
										onChange={e => setEmailBody(e)} />
								</Grid>
							</Grid>
							<div className={classes.actionsContainer}>
								<div>
									<Button
										onClick={handleBack}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.back}
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleFinish}
										className={classes.button}
									>
										{KaliFormsObject.translations.general.finish}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				</Stepper >
			</DialogContent>
		</Dialog>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailWizard);
