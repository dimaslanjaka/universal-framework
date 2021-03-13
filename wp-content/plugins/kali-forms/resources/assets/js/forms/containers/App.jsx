import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from '@material-ui/icons/Email';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PageActions from '../store/actions';
import ErrorBoundary from './ErrorBoundary';
import FormBuilder from './FormBuilder';
import FormSettings from './FormSettings';
import LogoSvg from './../../../img/icon.svg';
import TextField from '@material-ui/core/TextField';
import { clear } from 'redux-localstorage-simple';
import { useSnackbar } from 'notistack';
import CustomSnack from '@/forms/components/SnackBars/CustomSnack';
import SnackBarAction from '@/forms/components/SnackBars/SnackBarAction';

const useStyles = makeStyles(theme => {
	// const backgroundColorDefault =
	// 	theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];

	return {
		app: {
			background: theme.palette.type === 'light' ? theme.palette.common.white : theme.palette.grey[800]
		},
		formNameInput: {
			marginRight: 50,
			flexGrow: 1,
			display: 'flex',
			'& > .MuiInputBase-root': {
				color: theme.palette.getContrastText(theme.palette.primary.main),
				background: theme.palette.primary.main,
				fontSize: 24,
				zIndex: 1,
				'&:before': {
					content: 'none'
				},
				'&:after': {
					content: 'none'
				}
			}
		},
		inputAdornment: {
			background: theme.palette.grey[900],
			height: '42px',
			borderRadius: '50%',
			width: '42px',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center',
			marginRight: '15px',
		},
		logo: {
			maxWidth: '42px',
			marginRight: '15px',
		}
	}
})

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formInfo: state.FormInfo,
		ui: state.Ui,
		notices: KaliFormsObject.notices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(PageActions, dispatch);
};

/**
 * App created as a hook
 *
 * @param {*} props
 * @returns
 */
const App = (props) => {
	const [activeTab, setActiveTab] = useState(props.ui.appBar);
	const [formName, setFormName] = useState(KaliFormsObject.formName);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (props.formInfo.formName !== formName) {
			setFormName(props.formInfo.formName)
		}
	}, [props.formInfo.formName])

	useEffect(() => {
		setFormName(KaliFormsObject.formName)
	}, [])

	useEffect(() => {
		props.notices.map(e => {
			queueSnack(e);
		});
	}, [props.notices]);

	useEffect(() => {
		if (props.ui.appBar !== activeTab) {
			setActiveTab(props.ui.appBar);
		}
	}, [props.ui.appBar])

	/**
	 * Handle click
	 */
	const handleClick = (event, name) => {
		let action = name.toLowerCase();
		switch (action) {
			case 'go-to-emails':
				props.setUiAppBar('formSettings');
				props.setUiSidebarSettings('emails');
				break;
			case 'delete':
				document.querySelector('#delete-action a').click();
				break;
			case 'save':
				document.getElementById('publish').click();
				break;
			case 'add-new':
				document.querySelector('.page-title-action').click();
				break;
			case 'back-to-wp':
				// When user clicks to close the form, we dont need to remember where he left off so lets clear the storage
				clear({ namespace: `form${KaliFormsObject.formId}` });
				window.location.href = KaliFormsObject.exit_url
				break;
			default:
				break;
		}
	};

	/**
	 * Tab toggler
	 * @param tab
	 */
	const toggle = (event, tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab)
			props.setUiAppBar(tab)
			props.setTemplateSelectingFalse()
		}
	}

	/**
	 * Changes the form name
	 */
	const changeFormName = (event) => {
		let val = event.target.value;
		document.querySelector('#title').value = val
		setFormName(val);
	}

	const queueSnack = (props) => {
		props.tip === true
			?
			enqueueSnackbar(props.message, {
				persist: true,
				preventDuplicate: true,
				children: (key) => (
					<CustomSnack id={key} message={props.message} title={props.title} type={props.type} />
				),
			})
			:
			enqueueSnackbar(props.message,
				{
					preventDuplicate: true,
					variant: props.type,
					action: (key) => <SnackBarAction snackKey={key} />
				}
			)
	}

	/**
	 * Display styles based on tab
	 */
	const displayStyles = {
		formBuilder: activeTab === 'formBuilder'
			? 'block' : 'none',
		formSettings: activeTab === 'formSettings'
			? 'block' : 'none',
	}

	const classes = useStyles()

	return (
		<div className={classes.app + ' kaliforms-wrapper'}>
			<ErrorBoundary>
				<AppBar position="static" color="primary" elevation={0} id="kali-appbar">
					<Toolbar>
						<img src={LogoSvg} className={classes.logo} />
						<TextField
							value={formName}
							onChange={e => changeFormName(e)}
							className={classes.formNameInput}
							placeholder={KaliFormsObject.translations.appBar.formName}
						/>

						<Tabs value={activeTab} onChange={toggle}>
							<Tab value="formBuilder" label={KaliFormsObject.translations.appBar.formBuilder} />
							<Tab value="formSettings" label={KaliFormsObject.translations.appBar.formSettings} />
						</Tabs>
						<div style={{ marginLeft: 15 }}>
							<Tooltip title={KaliFormsObject.translations.appBar.emails}>
								<IconButton
									onClick={(e) => handleClick(e, 'go-to-emails')}
									color="inherit"
								>
									<EmailIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title={KaliFormsObject.translations.general.save}>
								<IconButton
									onClick={(e) => handleClick(e, 'save')}
									color="inherit"
								>
									<SaveIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title={KaliFormsObject.translations.appBar.backToWp}>
								<IconButton
									onClick={(e) => handleClick(e, 'back-to-wp')}
									color="inherit"
								>
									<CloseIcon />
								</IconButton>
							</Tooltip>
						</div>
					</Toolbar>
				</AppBar>
				<Typography component="div" style={{ display: displayStyles.formBuilder }}>
					<FormBuilder />
				</Typography>
				<Typography component="div" style={{ display: displayStyles.formSettings }}>
					<FormSettings />
				</Typography>
			</ErrorBoundary>
		</div>
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

