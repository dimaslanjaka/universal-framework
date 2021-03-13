import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ArrowLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';

const HubSpotSectionHeader = (props) => {
	return (
		<div>
			<Grid container direction="row" spacing={4}>
				<Grid item xs={props.backButton ? 8 : 12}>
					<Typography variant="h5">
						<If condition={props.backButton}>
							<IconButton
								aria-label={KaliFormsObject.translations.hubspot.misc.goBack}
								onClick={props.backButtonAction}
								variant="contained"
								color="secondary"
								size="medium">
								<ArrowLeftIcon fontSize="inherit" />
							</IconButton>
						</If>
						{props.header}
					</Typography>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={2}>
				<Grid item xs={12}>
					<Divider />
				</Grid>
			</Grid>
		</div >
	)
}

export default HubSpotSectionHeader;
