const supressNotices = () => {
	const noticePush = (e) => {
		e.style.display = 'none';
		if (e.classList.contains('hidden')) {
			return;
		}

		let types = [
			'success',
			'error',
			'info',
			'warning',
			'error',
		]

		let type = 'info';

		types.map(eType => type = e.classList.contains(eType) ? eType : type)

		notices.push({
			type: type,
			id: e.getAttribute('id'),
			title: '',
			message: e.innerText,
			tip: false,
		});
	}

	let notices = [];
	[...document.querySelectorAll('.notice')].map(e => noticePush(e));
	[...document.querySelectorAll('.error')].map(e => noticePush(e));

	// notices.push({ message: 'Easily create dynamic forms by hiding & showing fields in your form', title:'Conditional logic', tip: true, id: '123123', type: 'info' });

	return notices;
}

export default supressNotices;
