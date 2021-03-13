import React from 'react';
import Button from '@material-ui/core/Button'
import { sortableContainer } from 'react-sortable-hoc';

/**
 * Addable list container
 *
 * @class AddableListContainer
 * @extends {React.Component}
 */
const AddableListContainer = (props) => {
	const containerStyles = {
		padding: '5px 0',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	}

	return (
		<div style={containerStyles}>
			{props.children}

			<Button onClick={() => props.addChoice()}>{KaliFormsObject.translations.general.addChoice}</Button>
		</div>
	);
}

export default sortableContainer(AddableListContainer)
