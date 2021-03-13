import React from 'react';
import { sortableHandle } from 'react-sortable-hoc';
import IconButton from '@material-ui/core/IconButton'
import MoveVertIcon from '@material-ui/icons/MoreVert'
/**
 * Addable products item handle
 */
const AddableProductsItemHandle = (props) => {
	return (<IconButton><MoveVertIcon /></IconButton>)
}

export default sortableHandle(AddableProductsItemHandle);
