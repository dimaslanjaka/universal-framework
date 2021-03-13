import React from 'react';
import { sortableHandle } from 'react-sortable-hoc';
import IconButton from '@material-ui/core/IconButton'
import MoveVertIcon from '@material-ui/icons/MoreVert'
/**
 * Addable list item handle
 */
const AddableListItemHandle = (props) => {
	return (<IconButton><MoveVertIcon /></IconButton>)
}

export default sortableHandle(AddableListItemHandle);
