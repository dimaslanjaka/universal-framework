import React, { useState } from 'react';
import AddableProductsContainer from './AddableProductsContainer'
import AddableProductsItem from './AddableProductsItem'

const AddableProducts = (props) => {
	const [choices, setChoices] = useState(Array.isArray(props.choices) ? props.choices : [])
	const [orderChanged, setOrderChanged] = useState(Math.random().toString(36).substring(2))

	/**
	* Array move function
	*
	* @param {*} x
	* @param {*} from
	* @param {*} to
	* @memberof AddableProduct
	*/
	const arrayMove = (x, from, to) => {
		x.splice((to < 0 ? x.length + to : to), 0, x.splice(from, 1)[0]);
	}

	/**
	 * On sort end
	 * @todo sorted items dont look so good because they are dependent of a parent css class
	 * @param {*} obj
	 * @memberof AddableProduct
	 */
	const onSortEnd = (obj) => {
		let newState = choices;
		arrayMove(newState, obj.oldIndex, obj.newIndex)
		props.onChange(newState)
		setOrderChanged(Math.random().toString(36).substring(9))
	}

	/**
	 * Adds a choice in the state
	 */
	const addChoice = () => {
		setChoices([...choices, { price: 'choice', label: 'This is the product label' }])
	}

	/**
	 * Removes a choice from state
	 * @param {Number} index
	 */
	const removeChoice = (index) => {
		let newState = choices.filter((e, idx) => {
			return idx !== index;
		});

		props.onChange(newState);
		setChoices(newState);
	}

	/**
	 * Handle form change
	 *
	 * @param {string} e
	 * @param {string} key
	 * @param {number} index
	 */
	const handleChange = (e, key, index) => {
		if (props.onChange) {
			let newState = choices;
			newState[index][key] = e;
			props.onChange(newState);
			setChoices([...newState]);
		}
	}

	return (
		<AddableProductsContainer onSortEnd={(e) => onSortEnd(e)}
			addChoice={addChoice.bind(this)}
			lockAxis="y"
			lockToContainerEdges={true}
			useDragHandle
		>
			{
				choices.map((element, idx) => (
					<AddableProductsItem
						removeChoice={removeChoice.bind(this)}
						handleChange={handleChange.bind(this)}
						element={element}
						index={idx}
						idx={idx}
						key={'item-' + idx} />
				))
			}
		</AddableProductsContainer>
	);
}

export default AddableProducts;
