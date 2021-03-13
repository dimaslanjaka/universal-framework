import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../store/actions';
import connect from 'react-redux/es/connect/connect';
import SidebarFormFieldEditItem from './SidearFormFieldEditItem';
import Button from '@material-ui/core/Button';
// import SidebarFormFieldEditItem from './SidearFormFieldEditItem copy';
// import SidebarFormFieldEditItemBk from './SidebarFormFieldItemBkup';
import Paper from '@material-ui/core/Paper';
const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formFieldEditor: state.FormFieldEditor,
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
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

const SidebarFormFieldEditorContainer = (props) => {
	const [activeFormField, setActiveFormField] = useState(0);

	useEffect(() => {
		if (activeFormField !== props.formFieldEditor.activeFormField) {
			setActiveFormField(props.formFieldEditor.activeFormField)
		}
	}, [props.formFieldEditor.activeFormField])

	/**
	 * Change to array func
	 */
	const changeToArray = (obj) => {
		let properties = [];

		if (!props.fieldComponentProperties.hasOwnProperty(obj.id)) {
			return properties;
		}

		for (let sKey in props.fieldComponentProperties[obj.id]) {
			if (!obj.properties.hasOwnProperty(sKey)) {
				obj.properties[sKey] = props.fieldComponentProperties[obj.id][sKey].value
			}
		}

		for (const key in obj.properties) {
			properties.push({
				id: key,
				...props.fieldComponentProperties[obj.id][key],
				value: obj.properties[key],
			});
		}

		return properties;
	}

	/**
	 * Get Properties of the selected form field
	 * @return {Array}
	 */
	const getProps = (idx) => {
		let activeFormFieldComponent = props.fieldComponents.length ? props.fieldComponents[idx] : null;
		let properties = activeFormFieldComponent === null
			? []
			: changeToArray(activeFormFieldComponent);

		return properties;
	}

	/**
	 * Gets styles
	 */
	const getStyles = (index) => {
		let editorStyles = activeFormField !== index
			? { visibility: 'hidden', display: 'none' }
			: { visibility: 'visible', display: 'initial' };

		return editorStyles;
	}

	const jumpToConditionalLogic = internalId => {
		props.setUiAppBar('formSettings');
		props.setUiSidebarSettings('conditionalLogic');
	}

	return (
		<div>
			{
				props.fieldComponents.length && props.fieldComponents.map((item, idx) => {
					return (
						<div key={item.id + idx} style={getStyles(idx)}>
							<Paper style={{ padding: 20 }}>
								<h4 style={{ marginTop: 0, marginBottom: 0 }}>{item.label}</h4>
								{
									getProps(idx).map(e =>
										<SidebarFormFieldEditItem
											constraint={e.constraint}
											properties={e}
											index={idx}
											key={e.id}
											fieldType={item.id}
										/>
									)
								}
								<If condition={typeof KaliFormsObject.conditionalLogic !== 'undefined'}>
									<hr />
									<Button color="primary" onClick={() => jumpToConditionalLogic(idx)}>
										{KaliFormsObject.translations.conditionalLogic.conditionalLogicSettings}
									</Button>
								</If>
							</Paper>
						</div>
					)
				})
			}
			<If condition={props.fieldComponents.length === 0}>
				{KaliFormsObject.translations.sidebar.addYourFirstField}
			</If>
			<input type="hidden" value={JSON.stringify(props.fieldComponents)} name={'kaliforms[field_components]'} />
		</div>
	);
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarFormFieldEditorContainer);
