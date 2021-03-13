import React from 'react';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as StoreActions from './../../store/actions'
import { makeStyles } from '@material-ui/core/styles';
const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formFieldEditor: state.FormFieldEditor,
		fieldComponents: state.FieldComponents,
		sidebar: state.Sidebar,
		fieldComponentProperties: formatFieldCollection(state.Sidebar.fieldComponents)
	};
};

const formatFieldCollection = collection => {
	const fields = {};
	collection.map(group => {
		group.fields.map(field => {
			fields[field.id] = field.properties;
		})
	})
	return fields;
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const styles = {
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	height: '100%',
	paddingLeft: 15,
}

const useStyles = makeStyles(theme => {
	return {
		proButtonHolder: {
			position: 'relative',
			top: 15,
			right: 7,
			maxHeight: 48,
			height: 48,
			display: 'inline-block',
		},
		proButton: {
			textAlign: 'center',
			borderRadius: 10,
			padding: '4px 8px',
			fontSize: '.7rem',
			fontWeight: 'bold',
			color: '#fff',
			background: theme.palette.secondary.main,
			// boxShadow: theme.shadows[2],

			'&:hover': {
				background: theme.palette.secondary.light,
				// borderColor: '#eee',
				// background: '#fafafa',
				// borderColor: theme.palette.primary.main,
				// transition: 'all .25 ease-in-out'
			}
		}
	}
});

const SidebarFieldComponentItem = (props) => {
	const classes = useStyles();
	/**
	 * Add a field in the builder
	 * SHOULD BE PARSED/STRINGIFY SO YOU FORGET OBJECT REFS
	 */
	const addField = () => {
		props.properties.id.value = props.properties.id.value + getLastIndex()
		props.addComponent(
			JSON.parse(JSON.stringify(
				{
					id: props.id,
					label: props.label,
					properties: formatObj(props),
					constraint: props.constraint,
					internalId: props.id.toLowerCase() + getLastIndex(),
				}
			))
		);
	}
	const getLastIndex = () => {
		let returnItem = 0;
		props.fieldComponents.map(e => {
			let index = e.internalId;
			returnItem = parseFloat(index.replace(e.id.toLowerCase(), ''));
		})
		return returnItem + 1;
	}
	/**
	 * Format object
	 *
	 * @param {*} obj
	 * @returns
	 * @memberof SidebarFieldComponentItem
	 */
	const formatObj = (obj) => {
		let properties = {};
		for (const key in obj.properties) {
			properties[key] = obj.properties[key].value
		}

		return properties;
	}

	const redirectToPricing = event => {
		window.open('https://www.kaliforms.com/pricing?utm_source=formBuilder&utm_campaign=userInterests&utm_medium=proBadge', '_blank');
	}

	const redirectToPricingAction = () => {
		return (
			<span className={classes.proButtonHolder}>
				<IconButton className={classes.proButton} onClick={() => redirectToPricing()}>
					pro
				</IconButton>
			</span>
		)
	}

	const addFieldAction = () => {
		return (
			<span style={{ position: 'relative', top: 4 }}>
				<IconButton onClick={() => addField()}>
					<AddIcon />
				</IconButton>
			</span>
		)
	}
	const determineCourseOfAction = () => {
		return typeof props.properties.pro !== 'undefined' && props.properties.pro ? redirectToPricingAction() : addFieldAction();
	}

	return (
		<Card>
			<CardHeader
				style={{ padding: '6px 16px' }}
				titleTypographyProps={{ variant: 'subtitle2' }}
				action={determineCourseOfAction()}
				title={props.label}
			/>
		</Card>
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarFieldComponentItem);
