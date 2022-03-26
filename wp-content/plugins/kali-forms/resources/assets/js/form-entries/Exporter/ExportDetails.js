import React, { useContext, useState } from 'react'
import { ExportContext } from './../Context/ExportContext';
import { Card, Typography } from 'antd';
import { __ } from '@wordpress/i18n';
export default function ExportDetails() {
	const [exportOptions, setExportOptions] = useContext(ExportContext);

	return (
		<Card loading={exportOptions.loading}>
			<Typography.Paragraph>
				{__('Selected fields: ', 'kaliforms')} {exportOptions.fields.join(',')}
			</Typography.Paragraph>
			<Typography.Paragraph>
				{__('Format: ', 'kaliforms')} {exportOptions.fileFormat}
			</Typography.Paragraph>
		</Card>
	)
}
