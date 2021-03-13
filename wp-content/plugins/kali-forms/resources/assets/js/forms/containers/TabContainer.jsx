import Typography from '@material-ui/core/Typography';
import React from 'react';

const TabContainer = (props) => {
	return (
		<Typography component="div">
			{props.children}
		</Typography>
	)
}

export default TabContainer;
