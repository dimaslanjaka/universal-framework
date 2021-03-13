import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import FormEmails from './FormEmails';
import FormInfo from './FormInfo';
import FormIntegrations from './FormIntegrations';
import FormConditionalLogic from './FormConditionalLogic';
import SidebarSettings from './SidebarSettings';
import FormCustomPhp from './FormCustomPhp';
import FormCustomCss from './FormCustomCss';
import FormCustomJs from './FormCustomJs';
import { makeStyles } from '@material-ui/core/styles';
import HubSpotIntegration from './HubSpotIntegration';

const useStyles = makeStyles(theme => {
	return {
		general: {
			display: (props) => props.sidebar.activeTab === 'general' ? 'block' : 'none',
		},
		emails: {
			display: (props) => props.sidebar.activeTab === 'emails' ? 'block' : 'none',
		},
		integrations: {
			display: (props) => props.sidebar.activeTab === 'integrations' ? 'block' : 'none',
		},
		conditionalLogic: {
			display: (props) => props.sidebar.activeTab === 'conditionalLogic' ? 'block' : 'none',
		},
		formCustomCss: {
			display: (props) => props.sidebar.activeTab === 'formCustomCss' ? 'block' : 'none',
		},
		formCustomJs: {
			display: (props) => props.sidebar.activeTab === 'formCustomJs' ? 'block' : 'none',
		},
		formCustomPhp: {
			display: (props) => props.sidebar.activeTab === 'formCustomPhp' ? 'block' : 'none',
		},
		hubspotIntegration: {
			display: (props) => props.sidebar.activeTab === 'hubspotIntegration' ? 'block' : 'none'
		}
	}
});

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		sidebar: state.SidebarSettings,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};


const FormSettings = (props) => {
	const classes = useStyles(props);

	return (
		<div style={{ paddingLeft: 10, paddingRight: 16 }}>
			<Grid container>
				<Grid item md={3} id="kali-sidebar-settings">
					<SidebarSettings />
				</Grid>
				<Grid item md={9}>
					<div className={classes.general}>
						<FormInfo />
					</div>
					<div className={classes.emails}>
						<FormEmails />
					</div>
					<div className={classes.integrations}>
						<FormIntegrations />
					</div>
					<If condition={typeof KaliFormsObject.hubspotInstalled !== 'undefined'}>
						<div className={classes.hubspotIntegration}>
							<HubSpotIntegration />
						</div>
					</If>
					<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined'}>
						<div className={classes.conditionalLogic}>
							<FormConditionalLogic />
						</div>
					</If>
					<If condition={typeof Kali !== 'undefined' && Kali.hasOwnProperty('components') && typeof Kali.components.CodeEditor === 'function'}>
						<div className={classes.formCustomCss}>
							<FormCustomCss />
						</div>
						<div className={classes.formCustomJs}>
							<FormCustomJs />
						</div>
						<div className={classes.formCustomPhp}>
							<FormCustomPhp />
						</div>
					</If>
				</Grid>
			</Grid >
		</div >
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormSettings);
