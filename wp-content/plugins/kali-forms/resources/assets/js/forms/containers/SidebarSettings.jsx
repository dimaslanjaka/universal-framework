import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/Inbox';
import TransformIcon from '@material-ui/icons/Transform';
import SettingsIcon from '@material-ui/icons/Settings';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CodeIcon from '@material-ui/icons/Code';
import React, { useState, useEffect } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import Badge from '@material-ui/core/Badge';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HubSpotLogo from '@img/hubspot.svg';

const StyledBadge = withStyles(theme => ({
	badge: {
		right: -10,
		color: '#fff',
	},
}))(Badge);

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		sidebar: state.SidebarSettings,
		ui: state.Ui,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const useStyles = makeStyles(theme => {
	return {
		root: {
			background: theme.palette.background.default,
			padding: 0,
			position: 'relative',
			left: -15,
			height: '100%',
			minHeight: 'calc(100vh - 52px)',
		}
	}
});

const SidebarSettings = (props) => {
	const [selectedTab, setSelectedTab] = useState('general');
	const classes = useStyles();
	useEffect(() => {
		toggle(false, props.ui.sidebarSettings);
	}, [])

	useEffect(() => {
		if (props.ui.sidebarSettings !== selectedTab) {
			toggle(false, props.ui.sidebarSettings);
		}
	}, [props.ui.sidebarSettings])

	const toggle = (e, tab) => {
		if (selectedTab !== tab) {
			setSelectedTab(tab)
			props.setUiSidebarSettings(tab)
			props.setActiveSettingsTabInSidebar(tab)
		}
	}
	const redirectToPricing = event => {
		window.open('https://www.kaliforms.com/?utm_source=formSettings&utm_campaign=userInterests&utm_medium=proBadge', '_blank');
	}

	return (
		<Paper className={classes.root} elevation={0}>
			<List component="nav">
				<ListItem
					button
					selected={selectedTab === 'general'}
					onClick={event => toggle(event, 'general')}
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.sidebar.general} />
				</ListItem>
				<ListItem
					button
					selected={selectedTab === 'emails'}
					onClick={event => toggle(event, 'emails')}
				>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.sidebar.emailSettings} />
				</ListItem>
				<ListItem
					button
					selected={selectedTab === 'integrations'}
					onClick={event => toggle(event, 'integrations')}
				>
					<ListItemIcon>
						<VpnKeyIcon />
					</ListItemIcon>
					<ListItemText primary={KaliFormsObject.translations.sidebar.integrations} />
				</ListItem>

				<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined'}>
					<ListItem
						button
						selected={selectedTab === 'conditionalLogic'}
						onClick={event => toggle(event, 'conditionalLogic')}
					>
						<ListItemIcon>
							<TransformIcon />
						</ListItemIcon>
						<ListItemText primary={KaliFormsObject.translations.conditionalLogic.conditionalLogic} />
					</ListItem>
					<ListItem
						button
						selected={selectedTab === 'formCustomCss'}
						onClick={event => toggle(event, 'formCustomCss')}
					>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<ListItemText primary={KaliFormsObject.translations.customScripting.customCss} />
					</ListItem>
				</If>

				<If condition={typeof KaliFormsObject.conditionalLogic === 'undefined'}>
					<ListItem
						button
						selected={selectedTab === 'conditionalLogic'}
						onClick={event => redirectToPricing()}
					>
						<ListItemIcon>
							<TransformIcon />
						</ListItemIcon>
						<StyledBadge badgeContent={'Pro'} color="secondary">
							<ListItemText primary={KaliFormsObject.translations.conditionalLogic.conditionalLogic} />
						</StyledBadge>
					</ListItem>
					<ListItem
						button
						selected={selectedTab === 'formCustomCss'}
						onClick={event => redirectToPricing()}
					>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<StyledBadge badgeContent={'Pro'} color="secondary">
							<ListItemText primary={KaliFormsObject.translations.customScripting.customCss} />
						</StyledBadge>
					</ListItem>
				</If>

				<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined'}>
					<ListItem
						button
						selected={selectedTab === 'formCustomJs'}
						onClick={event => toggle(event, 'formCustomJs')}
					>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<ListItemText primary={KaliFormsObject.translations.customScripting.customJs} />
					</ListItem>
					<ListItem
						button
						selected={selectedTab === 'formCustomPhp'}
						onClick={event => toggle(event, 'formCustomPhp')}
					>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<ListItemText primary={KaliFormsObject.translations.customScripting.customPhp} />
					</ListItem>
				</If>
				<If condition={typeof KaliFormsObject.conditionalLogic === 'undefined'}>
					<ListItem
						button
						selected={selectedTab === 'formCustomJs'}
						onClick={event => redirectToPricing()}
					>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<StyledBadge badgeContent={'Pro'} color="secondary">
							<ListItemText primary={KaliFormsObject.translations.customScripting.customJs} />
						</StyledBadge>
					</ListItem>
					<ListItem
						button
						selected={selectedTab === 'formCustomPhp'}
						onClick={event => redirectToPricing()}
					>
						<ListItemIcon>
							<CodeIcon />
						</ListItemIcon>
						<StyledBadge badgeContent={'Pro'} color="secondary">
							<ListItemText primary={KaliFormsObject.translations.customScripting.customPhp} />
						</StyledBadge>
					</ListItem>
				</If>
				<If condition={typeof KaliFormsObject.hubspotInstalled !== 'undefined'}>
					<ListItem
						button
						selected={selectedTab === 'hubspotIntegration'}
						onClick={event => toggle(event, 'hubspotIntegration')}>
						<ListItemIcon>
							<img src={HubSpotLogo} style={{ width: 35 }} />
						</ListItemIcon>
						<ListItemText primary="HubSpot" />
					</ListItem>
				</If>
			</List>
		</Paper>
	);
}

export default withTheme(connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarSettings))
