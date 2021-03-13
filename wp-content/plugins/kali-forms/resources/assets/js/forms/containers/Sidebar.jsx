import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useEffect, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import SidebarFieldComponentItem from '../components/Sidebar/SidebarFieldComponentItem';
import SidebarFormFieldEditorContainer from '../components/Sidebar/SidebarFormFieldEditorContainer';
import * as StoreActions from '../store/actions';
import { makeStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formFieldEditor: state.FormFieldEditor,
		sidebar: state.Sidebar,
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

const Sidebar = (props) => {
	const [activeTab, setActiveTab] = useState(props.sidebar.activeTab);
	const [fieldComponents, setFieldComponents] = useState(props.sidebar.fieldComponents);
	const classes = useStyles();

	const toggle = (e, tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab)
			props.setActiveTabInSidebar(tab);
		}
	}

	useEffect(() => {
		if (activeTab !== props.sidebar.activeTab) {
			setActiveTab(props.sidebar.activeTab)
		}
	}, [props.sidebar.activeTab])

	const displayStyles = {
		formFields: activeTab === 'formFields' ? { display: 'block' } : { display: 'none' },
		fieldProperties: activeTab === 'fieldProperties' ? { display: 'block' } : { display: 'none' },
	}

	return (
		<Paper className={classes.root} elevation={0}>
			<Paper elevation={0} square style={{ borderRight: '1px solid #f5f5f5' }}>
				<Tabs
					value={activeTab}
					indicatorColor="primary"
					textColor="primary"
					onChange={toggle}
					centered
				>
					<Tab value="formFields" label={KaliFormsObject.translations.sidebar.formFields} />
					<Tab value="fieldProperties" label={KaliFormsObject.translations.sidebar.fieldProperties} />
				</Tabs>
			</Paper>
			<div style={{ padding: '15px 30px 0' }}>
				<div style={displayStyles.formFields}>
					{
						fieldComponents.map((group, index) => {
							return (
								<div key={group.id} style={{ marginBottom: 25 }}>
									<Typography variant="subtitle2">{group.label}</Typography>
									<hr />
									<Grid container spacing={1}>
										{group.fields.map(e => {
											return (
												<Grid item xs={12} md={6} key={e.id}>
													<SidebarFieldComponentItem id={e.id} label={e.label} constraint={e.constraint} properties={e.properties} />
												</Grid>
											)
										})}
									</Grid>
								</div>
							)
						})
					}
				</div>
				<div style={displayStyles.fieldProperties}>
					<SidebarFormFieldEditorContainer />
				</div>
			</div>
		</Paper>
	);
}

export default withTheme(connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar));

