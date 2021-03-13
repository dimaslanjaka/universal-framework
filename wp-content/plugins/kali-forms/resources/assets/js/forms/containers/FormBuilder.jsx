import React from 'react';
import Sidebar from './Sidebar';
import BuilderFieldDropZone from './BuilderFieldDropZone'
import Grid from '@material-ui/core/Grid';
import TemplateSelector from './TemplateSelector';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
		templateSelecting: state.TemplateSelecting,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};
/**
 * The Form Builder
 *
 * @param {*} props
 * @returns
 */
const FormBuilder = (props) => {
	// State
	return (
		<div style={{ paddingLeft: 10, paddingRight: 16 }}>
			<Grid container>
				<If condition={props.templateSelecting}>
					<Grid item md={12} id="kali-responsive-grid-layout">
						<TemplateSelector />
					</Grid>
				</If>
				<If condition={!props.templateSelecting}>
					<Grid item md={4} id="kali-sidebar">
						<Sidebar />
					</Grid>
					<Grid item md={8} id="kali-responsive-grid-layout">
						<BuilderFieldDropZone />
					</Grid>
				</If>
			</Grid>
		</div>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormBuilder);
