import React, { useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../../store/actions';
import connect from 'react-redux/es/connect/connect';
import paypalLogo from './../../../../img/paypal.svg';
import { makeStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		formFieldEditor: state.FormFieldEditor,
		formInfo: state.FormInfo,
		fieldComponents: state.FieldComponents,
		sidebar: state.Sidebar,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const useStyles = makeStyles(theme => {
	return {
		container: {
			width: '100%',
			display: 'block',
			padding: theme.spacing(2),
			cursor: 'move',
			position: 'relative',
			textAlign: 'left',
			'& > .button': {
				pointerEvents: 'none'
			}
		},
		label: {
			pointerEvents: 'none',
		},
		labelCheckbox: {
			marginRight: '15px',
		},
		select: {
			width: '100%',
			padding: theme.spacing(1),
			pointerEvents: 'none',
		},
		input: {
			width: '100%',
			padding: theme.spacing(1),
			pointerEvents: 'none',
		},
		inputHidden: {
			width: '100%',
			padding: theme.spacing(1),
			pointerEvents: 'none',
			opacity: .3,
		},
		textarea: {
			width: '100%',
			height: 50,
			lineHeight: '16px !important',
			boxShadow: 'none',
			resizable: false,
			pointerEvents: 'none',
		},
		checkbox: {
			marginRight: '10px'
		},
		divider: {
			width: '100%',
			position: 'relative',
			display: 'block',
			'& span': {
				position: 'absolute',
				left: 'calc(50% - 70px)',
				top: -11,
				display: 'inline-block',
				width: '70px',
				textAlign: 'center',
				background: theme.palette.background.paper,
				zIndex: 100,
			}
		},
		fileUpload: {
			textAlign: 'center',
			borderRadius: '5px',
			background: '#fafafa',
			display: 'block',
			padding: theme.spacing(3)
		},
		grecaptcha: {
			textAlign: 'center',
			display: 'inline-block',
			width: '100%',
			'& > img': {
				width: '310px'
			}
		},
		pageBreak: {
			display: 'flex',
			alignItems: 'center',
			width: '100%',
			'& > div': {
				flexGrow: '1',
				textAlign: 'center',
				'&:first-of-type': {
					textAlign: 'left',
				},
				'&:last-of-type': {
					textAlign: 'right',
				},
				'& > button': {
					pointerEvents: 'none',
				}
			}
		},
		paypal: {
			borderRadius: '5px',
			backgroundColor: '#ffc439',
			display: 'flex',
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center'
		},
		code: {
			whiteSpace: 'pre',
			display: 'flex',
			maxHeight: 70,
			padding: theme.spacing(2),
			marginRight: 60,
			overflowY: 'scroll',
		}
	}
});

const BuilderFormField = (props) => {
	const setFormField = () => {
		props.setActiveTabInSidebar('fieldProperties');
		props.setFormFieldInEditor(props.index);
	}

	const previewField = (type, classes) => {
		switch (type) {
			case 'choices':
			case 'dropdown':
				var label = setComputedLabelFunc();
				var checked = props.fieldComponents[props.index].properties.default;
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<select className={classes.select} value={checked} onChange={e => e}>
							{
								props.fieldComponents[props.index].properties.choices.map((choice, idx) => {
									return (
										<option value={choice.value} key={idx}>
											{choice.label}
										</option>
									)
								})
							}
						</select>
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				)
			case 'freeText':
				var label = props.fieldComponents[props.index].properties.id;
				var content = props.fieldComponents[props.index].properties.content;
				if (content !== '') {
					return (<span dangerouslySetInnerHTML={{ __html: props.fieldComponents[props.index].properties.content }}></span>);
				}

				return (<span>{label}</span>)
			case 'radio':
				var label = setComputedLabelFunc();
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						{
							props.fieldComponents[props.index].properties.choices.map((choice, idx) => {
								var checked = choice.value === props.fieldComponents[props.index].properties.default;

								return (
									<label className={classes.labelCheckbox} key={idx}>
										<input type="radio" checked={checked} onChange={e => e} className={classes.checkbox} />
										{choice.label}
									</label>
								)
							})
						}
						<br />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				);
			case 'checkbox':
				var label = setComputedLabelFunc();
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						{
							props.fieldComponents[props.index].properties.choices.map((choice, idx) => {
								let checked = choice.value === props.fieldComponents[props.index].properties.default;

								return (
									<label className={classes.labelCheckbox} key={idx}>
										<input type="checkbox" checked={checked} onChange={e => e} className={classes.checkbox} />
										{choice.label}
									</label>
								)
							})
						}
						<br />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				);
			case 'textarea':
				var label = setComputedLabelFunc();
				var required = props.fieldComponents[props.index].properties.required;
				var defaultVal = props.fieldComponents[props.index].properties.default;
				var placeholder = props.fieldComponents[props.index].properties.placeholder;
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<textarea className={classes.textarea} placeholder={placeholder} value={defaultVal} onChange={e => e} />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				);
			case 'divider':
				return (
					<span className={classes.divider}>
						<span>{props.fieldComponents[props.index].properties.type}</span>
						<hr />
					</span>
				);
			case 'fileUpload':
				return (
					<span className={classes.fileUpload}>
						<span dangerouslySetInnerHTML={{ __html: KaliFormsObject.translations.frontend.filePond.labelIdle }}>
						</span>
					</span>
				);
			case 'submitButton':
				var label = setComputedLabelFunc();
				return (<button className="button">{label}</button>)
			case 'hidden':
				var required = props.fieldComponents[props.index].properties.required;
				var defaultVal = props.fieldComponents[props.index].properties.default;
				var label = props.fieldComponents[props.index].properties.name + ' field';
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<input className={classes.inputHidden} type="textbox" value={defaultVal} onChange={e => e} />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				)
			case 'grecaptcha':
				return (
					<span className={classes.grecaptcha}>
						<img src={KaliFormsObject.assetsUrl + '/img/recaptcha.gif'} />
					</span>
				);
			case 'pageBreak':
				var label = setComputedLabelFunc();
				return (
					<span className={classes.pageBreak}>
						<div><button className="button">Back</button></div>
						<div> {label} </div>
						<div><button className="button">Next</button></div>
					</span>
				);
			case 'dateTimePicker':
			case 'date':
				var label = setComputedLabelFunc();
				var required = props.fieldComponents[props.index].properties.required;
				var defaultVal = props.fieldComponents[props.index].properties.default;
				var placeholder = props.fieldComponents[props.index].properties.placeholder;
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<input className={classes.input} type="date" placeholder={placeholder} value={defaultVal} onChange={e => e} />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				)
			case 'password':
				var label = setComputedLabelFunc();
				var required = props.fieldComponents[props.index].properties.required;
				var defaultVal = props.fieldComponents[props.index].properties.default;
				var placeholder = props.fieldComponents[props.index].properties.placeholder;
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<input className={classes.input} type="textbox" placeholder={placeholder} value="******" onChange={e => e} />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				)
			case 'range':
				var label = setComputedLabelFunc();
				var required = props.fieldComponents[props.index].properties.required;
				var defaultVal = props.fieldComponents[props.index].properties.default;
				var placeholder = props.fieldComponents[props.index].properties.placeholder;
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<input className={classes.input} min="0" max="100" type="range" placeholder={placeholder} value={defaultVal} onChange={e => e} />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				)
			case 'product':
				var label = setComputedLabelFunc();
				return (<span>{label} - {props.fieldComponents[props.index].properties.price}</span>)
			case 'paypal':
				return (<span className={classes.paypal}><img src={paypalLogo} /></span>)
			case 'smartTextOutput':
				return (<code className={classes.code}>{props.fieldComponents[props.index].properties.content}</code>)
			default:
				var label = setComputedLabelFunc();
				var required = props.fieldComponents[props.index].properties.required;
				var defaultVal = props.fieldComponents[props.index].properties.default;
				var placeholder = props.fieldComponents[props.index].properties.placeholder;
				return (
					<label className={classes.label}>
						{label} {required ? '{*}' : ''}
						<br />
						<input className={classes.input} type="textbox" placeholder={placeholder} value={defaultVal} onChange={e => e} />
						<small>{props.fieldComponents[props.index].properties.description}</small>
					</label>
				)
		}
	}

	/**
	 * Better labels
	 * @return {*}
	 */
	const setComputedLabelFunc = () => {
		let compLabel = `${props.label} field`;
		if (!props.fieldComponents.length) {
			return compLabel;
		}

		if (typeof props.fieldComponents[props.index] === 'undefined') {
			return compLabel;
		}

		if (!props.fieldComponents[props.index].hasOwnProperty('properties')) {
			return compLabel;
		}

		if (props.fieldComponents[props.index].properties.caption !== '') {
			compLabel = props.fieldComponents[props.index].properties.caption;
		}

		return compLabel;
	}

	const classes = useStyles(props);
	return (
		<div className={classes.container}>
			{previewField(props.id, classes)}
		</div>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BuilderFormField);
