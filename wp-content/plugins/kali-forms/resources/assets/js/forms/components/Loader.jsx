import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import * as PageActions from '../store/actions';
import LinearProgress from '@material-ui/core/LinearProgress';

const mapStateToProps = state => {
	return {
		loading: state.PageLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(PageActions, dispatch);
};

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		flexDirection: 'column',
		padding: 30,
		background: '#fff',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
		zIndex: 10000
	},
});

const Loader = (props) => {
	const classes = useStyles();
	const [completed, setCompleted] = React.useState(0);
	React.useEffect(() => {
		function progress() {
			setCompleted(oldCompleted => {
				if (oldCompleted === 100) {
					return 0;
				}
				const diff = Math.random() * 10;
				return Math.min(oldCompleted + diff, 100);
			});
		}

		const timer = setInterval(progress, 500);
		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<div className={classes.root}>
			<LinearProgress variant="determinate" value={completed} />
		</div>
	)
}

export default Loader;
