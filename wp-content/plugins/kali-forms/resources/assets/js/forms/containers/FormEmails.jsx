import React, { useState, useEffect } from 'react';
import AddableFormEmail from '../components/AddableFormEmail/AddableFormEmail';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDebounce } from 'use-debounce';
import EmailWizard from './../components/AddableFormEmail/EmailWizard/EmailWizard'

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formEmails: state.FormEmails
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(StoreActions, dispatch);
};

const FormEmails = (props) => {
	// State
	const [emails, setEmails] = useState(props.formEmails);
	const [debouncedEmails] = useDebounce(emails, 400);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		props.addEmail(emails)
	}, [debouncedEmails])

	useEffect(() => {
		if (JSON.stringify(props.formEmails) !== JSON.stringify(emails)) {
			setEmails(props.formEmails);
		}
	}, [props.formEmails])

	/**
	 * Adds an email to the list
	 */
	const addEmail = () => {
		let newEmail = {
			fromName: '',
			fromEmail: '',
			toEmail: '',
			replyTo: '',
			ccEmail: '',
			bccEmail: '',
			emailAttachmentMediaIds: '',
			emailAttachmentFilePaths: '',
			emailSubject: `Email #${props.formEmails.length + 1}`,
			emailAttachment: '',
			emailBody: ''
		};
		setEmails([...emails, newEmail])
	}
	/**
	 * Starts email config wizard
	 */
	const startWizard = () => {
		props.setEmailWizardDialogOn()
	}
	/**
	 * Removes an email from the list
	 *
	 * Uses sort of a hack because react doesnt update it well, we set emails to nothing and afterward to the given state
	 * @param {*} index
	 * @memberof FormEmails
	 */
	const removeEmail = (index) => {
		let newEmails = emails.filter((e, idx) => {
			return idx !== index;
		});
		setEmails([...newEmails]);
	}

	/**
	 * When child state changes, update this as well
	 *
	 * @param {*} state
	 * @param {*} idx
	 * @memberof FormEmails
	 */
	const childStateChanged = (state, idx) => {
		emails[idx] = state;
		setEmails([...emails]);
	}

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (type) => {
		setAnchorEl(null);

		type === 'normal'
			? addEmail()
			: startWizard()
	};
	return (
		<div style={{ paddingTop: 16, paddingLeft: 32, paddingRight: 32 }}>
			{emails.map((e, idx) => {
				return (
					<ExpansionPanel key={idx}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="subtitle1">{e.emailSubject}</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div style={{ width: '100%' }}>
								<AddableFormEmail emailData={e} index={idx} onChange={state => childStateChanged(state, idx)} />
								<Button style={{ marginTop: 20 }} variant="contained" color="primary" onClick={() => removeEmail(idx)}>{KaliFormsObject.translations.formEmails.removeEmail}</Button>
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				)
			})}

			<Grid container>
				<Grid item xs={12}>
					<TextField
						type="hidden"
						name={"kaliforms[emails]"}
						value={JSON.stringify(emails)} />
					<Button aria-controls="add-email-menu" aria-haspopup="true" onClick={handleClick} style={{ marginTop: 20 }} variant="contained" color="primary">{KaliFormsObject.translations.formEmails.addEmail}</Button>
					<Menu
						id="add-email-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={() => handleClose('normal')}>Normal</MenuItem>
						<MenuItem onClick={() => handleClose('guided')}>Guided</MenuItem>
					</Menu>
				</Grid>
				<Grid item xs={12}>
					<EmailWizard currentEmails={emails} emailSetter={setEmails}></EmailWizard>
				</Grid>
			</Grid>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEmails);
