import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import FileCopy from '@material-ui/icons/FileCopy';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import copy from 'copy-to-clipboard';
import MaterialTable from 'material-table';
import React, { forwardRef, useEffect, useState } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import { useSnackbar } from 'notistack';
import SnackBarAction from '@/forms/components/SnackBars/SnackBarAction';

const mapStateToProps = state => {
	return {
		fieldComponents: state.FieldComponents,
		fieldComponentsHash: state.FieldComponentsHash,
		placeholderDialog: state.PlaceholderDialog,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

/**
 * Icons used in the table
 */
const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
};

/**
 * Placeholder dialog
 */
const PlaceholderDialog = (props) => {
	const [open, setOpen] = useState(false);
	const [labels, setLabels] = useState([]);
	const { enqueueSnackbar } = useSnackbar();

	/**
	 * Handles closing of the dialog
	 */
	const handleClose = () => {
		setOpen(false);
	};
	/**
	 * When it exits, we need to make sure the store is updated as well
	 */
	const onExit = () => {
		props.setPlaceholderDialogOff();
	}
	/**
	 * Array consutrctor using the name of the fields
	 */
	const labelConstructor = () => {
		let fieldComponentsSimplified = [];
		props.fieldComponents.map(e => {
			if (e.id === 'divider' || e.id === 'freeText') {
				return;
			}

			if (typeof e.properties.name !== 'undefined' && e.properties.name !== '') {
				fieldComponentsSimplified.push('{' + e.properties.name + '}')
			}
		})

		setLabels(fieldComponentsSimplified);
	};
	/**
	 * Allow opening/closing from outside source
	 */
	useEffect(() => {
		props.placeholderDialog
			? setOpen(true)
			: setOpen(false);
	}, [props.placeholderDialog]);
	/**
	 * When field components change, we need to update the labels as well
	 */
	useEffect(() => {
		labelConstructor()
	}, [props.fieldComponents, props.fieldComponentsHash])

	/**
	 * Placeholders available
	 */
	const placeholders = () => {
		let placeholders = [
			{
				placeholder: '{sitetitle}',
				description: KaliFormsObject.translations.placeholders.siteTitle,
			},
			{
				placeholder: '{tagline}',
				description: KaliFormsObject.translations.placeholders.tagLine,
			},
			{
				placeholder: '{siteurl}',
				description: KaliFormsObject.translations.placeholders.siteUrl,
			},
			{
				placeholder: '{homeurl}',
				description: KaliFormsObject.translations.placeholders.homeUrl,
			},
			{
				placeholder: '{admin_email}',
				description: KaliFormsObject.translations.placeholders.adminEmail,
			}
		];
		labels.map(e => {
			placeholders.push({
				placeholder: e,
				description: KaliFormsObject.translations.placeholders.formFields
			})
		})
		return placeholders;
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={true}
			onExited={onExit}
			maxWidth="md"
		>
			<DialogContent>
				<MaterialTable
					icons={tableIcons}
					components={{ Container: props => <div>{props.children}</div> }}
					columns={[
						{ title: KaliFormsObject.translations.placeholders.placeholder, field: "placeholder" },
						{ title: KaliFormsObject.translations.placeholders.description, field: "description" },
					]}
					localization={{
						header: {
							actions: KaliFormsObject.translations.placeholders.actions,
						},
						toolbar: {
							searchTooltip: KaliFormsObject.translations.placeholders.search,
							searchPlaceholder: KaliFormsObject.translations.placeholders.search
						},
						body: {
							emptyDataSourceMessage: KaliFormsObject.translations.placeholders.emptyDataSourceMessage,
						},
						pagination: {
							labelDisplayedRows: KaliFormsObject.translations.placeholders.labelDisplayedRows,
							labelRowsSelect: KaliFormsObject.translations.placeholders.labelRowsSelect,
							labelRowsPerPage: KaliFormsObject.translations.placeholders.labelRowsPerPage,
							firstAriaLabel: KaliFormsObject.translations.placeholders.firstAriaLabel,
							firstTooltip: KaliFormsObject.translations.placeholders.firstTooltip,
							previousAriaLabel: KaliFormsObject.translations.placeholders.previousAriaLabel,
							previousTooltip: KaliFormsObject.translations.placeholders.previousTooltip,
							nextAriaLabel: KaliFormsObject.translations.placeholders.nextAriaLabel,
							nextTooltip: KaliFormsObject.translations.placeholders.nextTooltip,
							lastAriaLabel: KaliFormsObject.translations.placeholders.lastAriaLabel,
							lastTooltip: KaliFormsObject.translations.placeholders.lastTooltip
						}
					}}
					data={placeholders()}
					actions={[
						{
							icon: () => <FileCopy />,
							tooltip: KaliFormsObject.translations.placeholders.copyToClipboard,
							onClick: (event, rowData) => {
								// Do save operation
								copy(rowData.placeholder);
								setOpen(false);
								let key = rowData.placeholder;
								enqueueSnackbar(
									`${KaliFormsObject.translations.placeholders.placeholder} ${rowData.placeholder} ${KaliFormsObject.translations.placeholders.copiedToClipboard}`,
									{
										preventDuplicate: true,
										variant: 'success',
										action: (key) => <SnackBarAction snackKey={key} />
									}
								)
							}
						}
					]}
					title={KaliFormsObject.translations.placeholders.availablePlaceholders}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceholderDialog);
