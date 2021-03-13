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
import MenuItem from '@material-ui/core/MenuItem';
const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formInfo: state.FormInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const FormIntegrations = (props) => {
	/**
	 * Payment plugins installed?
	 */
	const paymentPluginsInstalled = () => KaliFormsObject.hasOwnProperty('payments');

	const [googleSiteKey, setGoogleSiteKey] = useState(KaliFormsObject.googleSiteKey);
	const [googleSecretKey, setGoogleSecretKey] = useState(KaliFormsObject.googleSecretKey);
	const [currency, setCurrency] = useState(KaliFormsObject.currency);
	const [paymentsLive, setPaymentsLive] = useState(KaliFormsObject.paymentsLive);
	const [payPalClientId, setPayPalClientId] = useState(KaliFormsObject.payPalClientId);
	const [payPalClientIdSandBox, setPayPalClientIdSandbox] = useState(KaliFormsObject.payPalClientIdSandBox);
	const [stripeKey, setStripeKey] = useState(KaliFormsObject.stripeKey);
	const [stripeKeySandBox, setStripeKeySandBox] = useState(KaliFormsObject.stripeKeySandBox);

	/**
	 * When toggle changes, update everything
	 *
	 * @param {*} event
	 * @memberof FormInfo
	 */
	const onToggleChange = (event, key) => {
		switch (key) {
			case 'paymentsLive':
				setPaymentsLive(event.target.checked ? '1' : '0');
				break;
			default:
				break;
		}
	}
	return (
		<div style={{ paddingTop: 16, paddingLeft: 32, paddingRight: 32 }}>
			<Grid container direction="row" spacing={8}>
				<Grid item>
					<Typography variant="h5">Google</Typography>
				</Grid>
			</Grid>

			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.integrations.recaptchaSiteKey}
						value={googleSiteKey}
						name="kaliforms[google_site_key]"
						onChange={e => setGoogleSiteKey(e.target.value)}
						variant="filled"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.integrations.recaptchaSecretKey}
						value={googleSecretKey}
						name="kaliforms[google_secret_key]"
						onChange={e => setGoogleSecretKey(e.target.value)}
						variant="filled"
						fullWidth={true}
					/>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item>
					<Typography variant="h5">{KaliFormsObject.translations.integrations.paymentsGeneral}</Typography>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.integrations.currency}
						value={currency}
						name="kaliforms[currency]"
						onChange={e => setCurrency(e.target.value)}
						select
						fullWidth={true}
						variant="filled"
					>
						<MenuItem value='USD'>USD</MenuItem>
						<MenuItem value='EUR'>EUR</MenuItem>
						<MenuItem value='AUD'>AUD</MenuItem>
						<MenuItem value='BRL'>BRL</MenuItem>
						<MenuItem value='CAD'>CAD</MenuItem>
						<MenuItem value='CZK'>CZK</MenuItem>
						<MenuItem value='DKK'>DKK</MenuItem>
						<MenuItem value='HKD'>HKD</MenuItem>
						<MenuItem value='HUF'>HUF</MenuItem>
						<MenuItem value='INR'>INR</MenuItem>
						<MenuItem value='ILS'>ILS</MenuItem>
						<MenuItem value='JPY'>JPY</MenuItem>
						<MenuItem value='MYR'>MYR</MenuItem>
						<MenuItem value='MXN'>MXN</MenuItem>
						<MenuItem value='TWD'>TWD</MenuItem>
						<MenuItem value='NZD'>NZD</MenuItem>
						<MenuItem value='NOK'>NOK</MenuItem>
						<MenuItem value='PHP'>PHP</MenuItem>
						<MenuItem value='PLN'>PLN</MenuItem>
						<MenuItem value='GBP'>GBP</MenuItem>
						<MenuItem value='RUB'>RUB</MenuItem>
						<MenuItem value='SGD'>SGD</MenuItem>
						<MenuItem value='SEK'>SEK</MenuItem>
						<MenuItem value='CHF'>CHF</MenuItem>
						<MenuItem value='THB'>THB</MenuItem>
					</TextField>
				</Grid>
				<Grid item>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={paymentsLive === '1'}
									onChange={e => onToggleChange(e, 'paymentsLive')}
								/>
							}
							label={KaliFormsObject.translations.integrations.paymentsLive}
						/>
						<TextField type="hidden" name="kaliforms[payments_live]" value={paymentsLive} />
					</FormGroup>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item>
					<Typography variant="h5">PayPal</Typography>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.integrations.payPalClientId}
						value={payPalClientId}
						name="kaliforms[paypal_client_id]"
						onChange={e => setPayPalClientId(e.target.value)}
						variant="filled"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label={KaliFormsObject.translations.integrations.payPalClientIdSandBox}
						value={payPalClientIdSandBox}
						name="kaliforms[paypal_client_id_sandbox]"
						onChange={e => setPayPalClientIdSandbox(e.target.value)}
						variant="filled"
						fullWidth={true}
					/>
				</Grid>
			</Grid>
			<If condition={paymentPluginsInstalled()}>
				<Grid container direction="row" spacing={8}>
					<Grid item>
						<Typography variant="h5">Stripe</Typography>
					</Grid>
				</Grid>
				<Grid container direction="row" spacing={8}>
					<Grid item xs={6}>
						<TextField
							label={KaliFormsObject.translations.integrations.stripeKey}
							value={stripeKey}
							name="kaliforms[stripe_key]"
							onChange={e => setStripeKey(e.target.value)}
							variant="filled"
							fullWidth={true}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={KaliFormsObject.translations.integrations.stripeKeySandBox}
							value={stripeKeySandBox}
							name="kaliforms[stripe_key_sandbox]"
							onChange={e => setStripeKeySandBox(e.target.value)}
							variant="filled"
							fullWidth={true}
						/>
					</Grid>
				</Grid>
			</If>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormIntegrations);
