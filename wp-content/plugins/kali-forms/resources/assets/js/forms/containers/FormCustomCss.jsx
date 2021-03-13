import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
const { CodeEditor } = (typeof Kali !== 'undefined' && Kali.hasOwnProperty('components')) ? Kali.components : () => (<div>Hello world</div>);

const FormCustomCss = (props) => {
	const [customCss, setCustomCss] = useState(KaliFormsObject.formScripting.css);

	return (
		<div style={{ paddingTop: 16, paddingLeft: 32, paddingRight: 32 }}>
			<Grid container direction="row" spacing={8}>
				<Grid item lg={12} xs={12}>
					<Typography variant="h5">{KaliFormsObject.translations.customScripting.customCss}</Typography>
					<CodeEditor
						mode="css"
						height="250px"
						width="100%"
						theme="monokai"
						debounceChangePeriod={600}
						value={customCss}
						onChange={(newValue) => setCustomCss(newValue)}
						name="custom-css-editor"
						enableBasicAutocompletion={true}
						enableLiveAutocompletion={true}
						editorProps={{ $blockScrolling: Infinity }}
					/>
					<textarea name="kaliforms[form_scripting_css]" value={customCss} style={{ display: 'none' }} readOnly>
						{customCss}
					</textarea>
				</Grid>
			</Grid>
		</div>
	);
}

export default FormCustomCss;
