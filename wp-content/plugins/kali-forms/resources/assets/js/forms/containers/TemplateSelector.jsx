import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Qs from 'qs';
import React, { useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';

const styles = theme => ({
	button: {
		margin: theme.spacing(),
	},
});
const StyledBadge = withStyles(theme => ({
	badge: {
		right: -15,
		color: '#fff',
	},
}))(Badge);

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
		formEmails: state.FormEmails,
		formFieldEditor: state.FormFieldEditor,
		templateSelecting: state.TemplateSelecting,
		predefinedForms: state.PredefinedForms,
		sidebar: state.Sidebar,
		grid: state.Grid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const TemplateSelector = (props) => {
	const [tableLoading, setTableLoading] = useState(false);
	const [predefinedForms] = useState(KaliFormsObject.predefinedForms);

	/**
	 * Redirect to pro
	 */
	const redirectToPro = () => {
		window.open('https://www.kaliforms.com/pricing', '_blank');
	}

	/**
	 * Form selection
	 *
	 * @param {*} key
	 * @memberof TemplateSelector
	 */
	const selectForm = (key) => {
		if (tableLoading) {
			return true;
		}

		setTableLoading(true);
		const data = { action: 'kaliforms_get_form_data', args: { id: key, nonce: KaliFormsObject.ajax_nonce } };

		axios.post(KaliFormsObject.ajaxurl, Qs.stringify(data))
			.then(r => {
				importData(r.data);
			})
			.catch(e => {
				console.log(e);
			});
	}

	/**
	 * Import data
	 *
	 * @param {*} data
	 * @memberof TemplateSelector
	 */
	const importData = (data) => {
		const funcNames = {
			emails: 'addEmail',
			grid: 'setGrid',
			field_components: 'addMultipleComponents',
			thank_you_message: 'changeFormInformationValues',
		}

		document.querySelector('#title').value = data.name
		props.changeFormInformationValues({ key: 'formName', value: data.name })
		props.changeFormInformationValues({ key: 'showThankYouMessage', value: true })
		props.changeFormInformationValues({ key: 'requiredFieldMark', value: '*' })

		_.each(data, (k, v) => {
			if (typeof props[funcNames[v]] === 'function') {
				props[funcNames[v]](k)
			}
		});

		props.setTemplateSelectingFalse();
	}

	const { classes } = props;

	return (
		<Grid container justify="center" style={{ marginTop: 50 }}>
			<Grid item xs={8}>
				<Paper style={{ width: '100%', overflowX: 'auto', }} elevation={3}>
					<Table style={{ opacity: tableLoading ? .5 : 1, transition: 'all .5s ease-in-out' }}>
						<TableHead>
							<TableRow>
								<TableCell>{KaliFormsObject.translations.general.name}</TableCell>
								<TableCell align="left">{KaliFormsObject.translations.general.description}</TableCell>
								<TableCell align="center">{KaliFormsObject.translations.general.actions}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								Object.keys(predefinedForms).map((key, index) =>
									(
										<TableRow key={key}>
											<TableCell>
												<If condition={predefinedForms[key].pro}>
													<StyledBadge className={classes.badge} badgeContent={'Pro'} color="secondary">
														{predefinedForms[key].name}
													</StyledBadge>
												</If>
												<If condition={!predefinedForms[key].pro}>
													{predefinedForms[key].name}
												</If>
											</TableCell>
											<TableCell align="left">
												{predefinedForms[key].description}
											</TableCell>
											<TableCell align="center">
												<If condition={predefinedForms[key].pro}>
													<Button size="small" variant="contained" color="secondary" className={classes.button} onClick={() => redirectToPro()}>
														{KaliFormsObject.translations.general.upgradeToPro}
													</Button>
												</If>
												<If condition={!predefinedForms[key].pro}>
													<Button size="small" variant="contained" color="primary" className={classes.button} onClick={() => selectForm(key)}>
														{KaliFormsObject.translations.general.import}
													</Button>
												</If>
											</TableCell>
										</TableRow>
									)
								)
							}
							<TableRow>
								<TableCell colSpan={3} align="center">
									<Button size="small" variant="contained" color="primary" onClick={() => props.setTemplateSelectingFalse()}>{KaliFormsObject.translations.templateSelector.placeholderButton}
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TemplateSelector))
