import LogoPng from '@img/logo.png';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withTheme } from '@material-ui/core/styles';
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';
import React, { useEffect, useState } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import BuilderFormField from './../components/Builder/BuilderFormField';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
		formFieldEditor: state.FormFieldEditor,
		templateSelecting: state.TemplateSelecting,
		sidebar: state.Sidebar,
		conditionalLogic: state.ConditionalLogic,
		grid: state.Grid,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const useStyles = makeStyles(theme => {
	return {
		gridItem: {
			textAlign: 'center',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: theme.shape.borderRadius,
			border: '1px solid transparent',
			// boxShadow: theme.shadows[2],
			background: theme.palette.background.paper,
			'&:hover': {
				// borderColor: '#eee',
				background: '#fafafa',
				borderColor: theme.palette.primary.main,
				transition: 'all .25 ease-in-out'
			},
			'&:hover > div:last-of-type': {
				transition: 'all .25 ease-in-out',
				opacity: 1,
			},
			'&:hover > .react-resizable-handle': {
				transition: 'all .25 ease-in-out',
				opacity: 1
			}
		},
		icon: {
			color: theme.palette.primary.main
		},
		gridHelperParent: {
			position: 'absolute',
			top: 20,
			left: 5,
			right: 5,
			bottom: 10,
			display: 'flex',
			pointerEvents: 'none',
		},
		gridHelperColumn: {
			flexGrow: '1',
			paddingRight: 10,
			paddingLeft: 10,
			pointerEvents: 'none',
		},
		gridHelperSpan: {
			background: 'rgba(0,0,0,.025)',
			width: '100%',
			height: '100%',
			display: 'inline-block',
			pointerEvents: 'none',
		},
		actionButtons: {
			display: 'flex',
			opacity: 0,
			flexDirection: 'row',
			position: 'absolute',
			top: '2px',
			right: '10px'
		},
	}
});

/**
 * The actual Builder
 *
 * @param {*} props
 * @returns
 */
const BuilderFieldDropZone = (props) => {
	// State
	const [layoutBuilder, setLayoutBuilder] = useState([])
	const [gridHelper, setGridHelper] = useState(false);
	// const logo = useState(`${KaliFormsObject.assetsUrlBackend}/js/${LogoPng}`)

	const classes = useStyles();

	const mashArray = () => {
		let arr = {};
		props.grid.map(e => {
			let el = (e);
			let internalId = el.i.toLowerCase();

			arr[internalId] = { grid: { ...el } };
		})

		props.fieldComponents.map((e, idx) => {
			let el = e;
			let internalId = el.internalId.toLowerCase();

			if (!arr.hasOwnProperty(internalId)) {
				return;
			}
			let obj = {
				...el, internalId
			}

			arr[internalId] = { ...arr[internalId], ...obj };
			let gridItem = arr[internalId].grid;
			gridItem.minW = (e.constraint === 'none' || typeof e.constraint === 'undefined')
				? 3
				: parseFloat(e.constraint);
			gridItem.minW = gridItem.minW === 0 ? 3 : gridItem.minW;
			gridItem.w = gridItem.minW > gridItem.w ? gridItem.minW : gridItem.w;

			arr[internalId].grid = gridItem;
		})

		let state = Object.values(arr);
		return state;
	}

	useEffect(() => {
		// Initial Load
		let state = mashArray();
		setLayoutBuilder([...state]);
	}, [])


	useEffect(() => {
		let then = props.fieldComponents.length;
		let now = layoutBuilder.length;

		// ADD
		if (then !== now && then > now && then - now === 1) {
			let lastItem = props.fieldComponents[props.fieldComponents.length - 1]
			let gridItem = getDefaultGrid(lastItem.internalId);
			gridItem.minW = (lastItem.constraint === 'none' || typeof lastItem.constraint === 'undefined')
				? 3
				: parseFloat(lastItem.constraint);
			gridItem.minW = gridItem.minW === 0 ? 3 : gridItem.minW;
			gridItem.w = gridItem.minW > gridItem.w ? gridItem.minW : gridItem.w;
			lastItem.grid = gridItem;

			return setLayoutBuilder([...layoutBuilder, { ...lastItem }])
			console.log('add')
		}

		if (then !== now && then < now && now - then === 1) {
			let state = mashArray();
			let current = [];
			state.map(e => {
				if (e.hasOwnProperty('id')) {
					current.push(e);
				}
			})

			return setLayoutBuilder([...current]);
		}

	}, [props.fieldComponents])

	/**
	 * Should be reactive
	 *
	 * @returns
	 * @memberof BuilderFieldDropZone
	 */
	const getContainerWidth = () => {
		let item = document.querySelector('#kali-responsive-grid-layout');
		return item === null || item.offsetWidth === 0 ? tryToDetermineWidth() : item.offsetWidth;
	}
	/**
	 * We approximate things now
	 */
	const tryToDetermineWidth = () => {
		let totalWidth = document.querySelector('#kali-appbar');
		if (totalWidth === null) {
			return 1263;
		}
		let subtractor = document.querySelector('#kali-sidebar');
		if (subtractor === null) {
			return 1263;
		}
		if (subtractor.offsetWidth === 0) {
			return 1263
			subtractor = document.querySelector('#kali-sidebar-settings');
		}

		return totalWidth.offsetWidth - subtractor.offsetWidth - 26;
	}

	/**
	  * Renders the grid helper
	  */
	const renderGridHelper = () => {
		return (
			<div className={classes.gridHelperParent}>
				{[...Array(12)].map((x, i) =>
					<div key={i} className={classes.gridHelperColumn}>
						<span className={classes.gridHelperSpan}></span>
					</div>
				)}
			</div>
		)
	}

	/**
	 * Renders the placeholder
	 */
	const renderPlaceholder = () => {
		return (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: 390 }}>
				<img src={LogoPng} style={{ width: 250 }} alt="logo" />
				<h4>{KaliFormsObject.translations.builder.placeholderTitle}</h4>
				<Button variant="contained" color="primary" onClick={() => props.setTemplateSelectingTrue()}>{KaliFormsObject.translations.builder.placeholderButton}</Button>
			</div>
		)
	}

	/**
	 * Returns the last grid item
	 */
	const getDefaultGrid = (id) => {
		return { x: 0, y: Infinity, w: 12, h: 1, maxH: 1, minW: 3, moved: false, static: false, i: id }
	}

	const setFormField = (idx) => {
		props.setActiveTabInSidebar('fieldProperties');
		props.setFormFieldInEditor(idx);
	}

	const getItemStyle = (item, idx) => {
		if (props.sidebar.activeTab !== 'fieldProperties') {
			return {};
		}

		let currentActiveFormField = props.formFieldEditor.activeFormField;
		let style = {};
		if (currentActiveFormField === idx) {
			style = { ...style, ...{ borderColor: props.theme.palette.primary.light, backgroundColor: '#fafafa' } };
		}

		if (typeof KaliFormsObject.conditionalLogic === 'undefined') {
			return style;
		}

		props.conditionalLogic.map(condition => {
			if (typeof props.fieldComponentsHash[currentActiveFormField] !== 'undefined'
				&& condition.field === item.internalId
				&& props.fieldComponents[currentActiveFormField].internalId === condition.conditioner) {
				style = { ...style, ...{ backgroundColor: 'rgba(162, 162, 250, .15)' } }
			}
		})

		return style;
	}

	return (
		<div id="kali-responsive-grid-layout" style={{ paddingTop: 10, minHeight: 380, position: 'relative' }}>
			{<If condition={layoutBuilder.length === 0}>
				{renderPlaceholder()}
			</If>}
			<If condition={getContainerWidth() !== false}>
				<ResponsiveGridLayout
					className="layout"
					layout={props.grid}
					width={getContainerWidth()}
					rowHeight={95}
					breakpoints={{ lg: 900, md: 768, sm: 480, xxs: 0 }}
					cols={{ lg: 12, md: 10, sm: 6, xxs: 2 }}
					onLayoutChange={(layout) => _.debounce(props.setGrid(layout), 300)}>
					{
						layoutBuilder.map((item, idx) => {
							let style = getItemStyle(item, idx);
							return (
								<div key={item.internalId} data-grid={item.grid} style={style} className={classes.gridItem}>
									<BuilderFormField
										label={item.label}
										id={item.id}
										internalId={item.internalId}
										index={idx} />
									<div className={classes.actionButtons}>
										<IconButton className={classes.icon} onClick={() => setFormField(idx)} size="small" aria-label={KaliFormsObject.translations.general.edit}>
											<EditIcon />
										</IconButton>
										<IconButton className={classes.icon} onClick={() => props.removeComponent(item.internalId)} size="small" aria-label={KaliFormsObject.translations.general.delete}>
											<DeleteIcon />
										</IconButton>
									</div>
								</div>
							);
						})}
				</ResponsiveGridLayout>
			</If>

			<If condition={gridHelper}>
				{renderGridHelper()}
			</If>
			<div style={{ position: 'absolute', bottom: -50, right: 0 }}>
				<If condition={gridHelper}>
					<IconButton onClick={() => setGridHelper(false)}>
						<GridOffIcon />
					</IconButton>
				</If>
				<If condition={!gridHelper}>
					<IconButton onClick={() => setGridHelper(true)}>
						<GridOnIcon />
					</IconButton>
				</If>
			</div>
			<input type="hidden" value={JSON.stringify(props.grid)} name="kaliforms[grid]" />
		</div>
	);
}


export default withTheme(connect(
	mapStateToProps,
	mapDispatchToProps,
)(BuilderFieldDropZone));
