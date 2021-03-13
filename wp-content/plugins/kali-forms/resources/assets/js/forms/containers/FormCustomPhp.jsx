import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';

const { CodeEditor } = (typeof Kali !== 'undefined' && Kali.hasOwnProperty('components')) ? Kali.components : () => (<div>Hello world</div>);

const FormCustomPhp = (props) => {
	const [customPhpBefore, setCustomPhpBefore] = useState('<?php' + KaliFormsObject.formScripting.phpBefore);
	const [customPhpAfter, setCustomPhpAfter] = useState('<?php' + KaliFormsObject.formScripting.phpAfter);

	return (
		<div style={{ paddingTop: 16, paddingLeft: 32, paddingRight: 32 }}>
			<Grid container direction="row" spacing={8}>
				<Grid item lg={12} xs={12}>
					<Typography variant="h5">{KaliFormsObject.translations.customScripting.phpBefore}</Typography>
					<CodeEditor
						mode="php"
						height="250px"
						width="100%"
						theme="monokai"
						value={customPhpBefore}
						debounceChangePeriod={600}
						onChange={(newValue) => setCustomPhpBefore(newValue)}
						name="custom-php-before-process-editor"
						enableBasicAutocompletion={true}
						enableLiveAutocompletion={true}
						editorProps={{ $blockScrolling: Infinity }}
					/>
					<textarea name="kaliforms[form_scripting_php_before]" value={customPhpBefore} style={{ display: 'none' }} readOnly>
						{customPhpBefore}
					</textarea>
				</Grid>
			</Grid>
			<Grid container direction="row" spacing={8}>
				<Grid item lg={12} xs={12}>
					<Typography variant="h5">{KaliFormsObject.translations.customScripting.phpAfter}</Typography>
					<CodeEditor
						mode="php"
						height="250px"
						width="100%"
						theme="monokai"
						value={customPhpAfter}
						debounceChangePeriod={600}
						onChange={(newValue) => setCustomPhpAfter(newValue)}
						name="custom-php-after-process-editor"
						enableBasicAutocompletion={true}
						enableLiveAutocompletion={true}
						editorProps={{ $blockScrolling: Infinity }}
					/>
					<textarea name="kaliforms[form_scripting_php_after]" value={customPhpAfter} style={{ display: 'none' }} readOnly>
						{customPhpAfter}
					</textarea>
				</Grid>
			</Grid>
		</div>
	);
}

export default FormCustomPhp;
