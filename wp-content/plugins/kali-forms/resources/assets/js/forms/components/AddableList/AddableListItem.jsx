import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { sortableElement } from 'react-sortable-hoc';
import AddableListItemHandle from './AddableListItemHandle'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Addable list item
 *
 * @class AddableListItem
 * @extends {React.Component}
 */
const AddableListItem = (props) => {
	const [element, setElement] = useState(props.element);
	const [idx, setIdx] = useState(props.idx);
	const [panelCollapsed, setPanelCollapsed] = useState(false);

	useEffect(() => {
		setElement(props.element)
	}, [props.element])


	useEffect(() => {
		setIdx(props.idx)
	}, [props.idx])

	return (
		<ExpansionPanel elevation={1}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<If condition={!panelCollapsed}>
					<AddableListItemHandle />
				</If>
				<Typography style={{
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					alignSelf: 'center',
					maxWidth: 230,
					marginRight: 10,
					marginLeft: panelCollapsed ? 0 : 15,
				}}>
					{element.label}
				</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div style={{ width: '100%' }}>
					<TextField
						label={KaliFormsObject.translations.general.value}
						value={element.value}
						onChange={e => props.handleChange(e.target.value, 'value', idx)}
						fullWidth={true}
						margin="normal"
					/>
					<TextField
						label={KaliFormsObject.translations.general.label}
						value={element.label}
						onChange={e => props.handleChange(e.target.value, 'label', idx)}
						fullWidth={true}
						margin="normal"

					/>
				</div>
			</ExpansionPanelDetails>
			<Divider />
			<ExpansionPanelActions>
				<IconButton onClick={() => props.removeChoice(idx)}>
					<DeleteIcon />
				</IconButton>
			</ExpansionPanelActions>
		</ExpansionPanel>
	)
}

export default sortableElement(AddableListItem)
