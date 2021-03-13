import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as StoreActions from '../store/actions';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Code from '@material-ui/icons/Code';

const mapStateToProps = state => {
	return {
		placeholderDialog: state.PlaceholderDialog,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(StoreActions, dispatch);
};

const PlaceholderDialogOpener = (props) => {
	return props.adornment
		? (
			<InputAdornment position="end">
				<IconButton
					edge="end"
					color="primary"
					variant="contained"
					aria-label="open placeholder list"
					onClick={() => props.setPlaceholderDialogOn()}
				>
					<Code />
				</IconButton>
			</InputAdornment>
		)
		: (
			<IconButton size="small" onClick={() => props.setPlaceholderDialogOn()}> <Code /> </IconButton>

		)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceholderDialogOpener);
