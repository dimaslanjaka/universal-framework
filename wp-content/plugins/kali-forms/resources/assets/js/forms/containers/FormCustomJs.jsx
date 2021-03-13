import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
const { CodeEditor } = (typeof Kali !== 'undefined' && Kali.hasOwnProperty('components')) ? Kali.components : () => (<div>Hello world</div>);

const FormCustomJs = (props) => {
	const [customJs, setCustomJs] = useState(KaliFormsObject.formScripting.js);
	return (
		<div style={{ paddingTop: 16, paddingLeft: 32, paddingRight: 32 }}>
			<Grid container direction="row" spacing={8}>
				<Grid item lg={12} xs={12}>
					<Typography variant="h5">{KaliFormsObject.translations.customScripting.customJs}</Typography>
					<CodeEditor
						mode="javascript"
						height="250px"
						width="100%"
						theme="monokai"
						value={customJs}
						onChange={(newValue) => setCustomJs(newValue)}
						debounceChangePeriod={600}
						name="custom-js-editor"
						enableBasicAutocompletion={true}
						enableLiveAutocompletion={true}
						editorProps={{ $blockScrolling: Infinity }}
					/>
					<textarea name="kaliforms[form_scripting_js]" value={customJs} style={{ display: 'none' }} readOnly>
						{customJs}
					</textarea>
				</Grid>
			</Grid>
		</div>
	);
}

export default FormCustomJs;
