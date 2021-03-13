/**
 * App loading
 * @type {string}
 */
export const SET_LOADING = 'SET_LOADING';
export const SET_LOADED = 'SET_LOADED';
export const SET_ERROR_IN_APP = 'SET_ERROR_IN_APP';
export const REMOVE_ERROR_FROM_APP = 'REMOVE_ERROR_IN_APP';

/**
 * Add & remove components from the form builder
 * @type {string}
 */
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const CHANGE_PROPERTY = 'CHANGE_PROPERTY';
export const ADD_MULTIPLE_COMPONENTS = 'ADD_MULTIPLE_COMPONENTS';
export const CHANGE_GRID_IN_ITEM = 'CHANGE_GRID_IN_ITEM'
/**
 * Sets the form field in the editor
 * @type {string}
 */
export const SET_FORM_FIELD_IN_EDITOR = 'SET_FORM_FIELD_IN_EDITOR';

/**
 * Sidebar actions
 * @type {string}
 */
export const SET_ACTIVE_TAB_IN_SIDEBAR = 'SET_ACTIVE_TAB_IN_SIDEBAR';
/**
 * Sidebar actions
 * @type {string}
 */
export const SET_ACTIVE_SETTINGS_TAB_IN_SIDEBAR = 'SET_ACTIVE_SETTINGS_TAB_IN_SIDEBAR';

/**
 * Save the grid in the store
 * @type {string}
 */
export const SET_GRID = 'SET_GRID';

/**
 * Saves the field component hash
 * @type {string}
 */
export const SET_FIELD_COMPONENTS_HASH = 'SET_FIELD_COMPONENTS_HASH';

/**
 * Saves the form information tab in the store
 * @type {string}
 */
export const CHANGE_FORM_INFORMATION_VALUES = 'CHANGE_FORM_INFORMATION_VALUES';
/**
 * Saves the form submission tab in the store
 * @type {string}
 */
export const CHANGE_FORM_SUBMISSION_VALUES = 'CHANGE_FORM_SUBMISSION_VALUES';

/**
 * Saves the email data in the store
 */
export const CHANGE_EMAIL_VALUES = 'CHANGE_EMAIL_VALUES';
export const ADD_EMAIL = 'ADD_EMAIL';

/**
 * Sets the template selecting true or false ( happens when there are no fields, on a press of a button )
 */
export const SET_TEMPLATE_SELECTING_TRUE = 'SET_TEMPLATE_SELECTING_TRUE';
export const SET_TEMPLATE_SELECTING_FALSE = 'SET_TEMPLATE_SELECTING_FALSE';

export const CHANGE_APP_BAR_VALUES = 'CHANGE_APP_BAR_VALUES';

export const SET_PLACEHOLDER_DIALOG_ON = 'SET_PLACEHOLDER_DIALOG_ON';
export const SET_PLACEHOLDER_DIALOG_OFF = 'SET_PLACEHOLDER_DIALOG_OFF';

export const setPlaceholderDialogOn = () => ({ type: SET_PLACEHOLDER_DIALOG_ON })
export const setPlaceholderDialogOff = () => ({ type: SET_PLACEHOLDER_DIALOG_OFF })

export const SET_EMAIL_WIZARD_DIALOG_ON = 'SET_EMAIL_WIZARD_DIALOG_ON';
export const SET_EMAIL_WIZARD_DIALOG_OFF = 'SET_EMAIL_WIZARD_DIALOG_OFF';

export const setEmailWizardDialogOn = () => ({ type: SET_EMAIL_WIZARD_DIALOG_ON })
export const setEmailWizardDialogOff = () => ({ type: SET_EMAIL_WIZARD_DIALOG_OFF })

/**
 * Actual actions
 */
export const setLoading = () => ({ type: SET_LOADING });
export const setLoaded = () => ({ type: SET_LOADED });

export const setTemplateSelectingTrue = () => ({ type: SET_TEMPLATE_SELECTING_TRUE });
export const setTemplateSelectingFalse = () => ({ type: SET_TEMPLATE_SELECTING_FALSE });

export const setErrorInApp = (payload) => ({
	type: SET_ERROR_IN_APP,
	payload: payload
})

export const removeErrorFromApp = (payload) => ({
	type: REMOVE_ERROR_FROM_APP,
	payload: payload
})

export const setFormFieldInEditor = (payload) => ({
	type: SET_FORM_FIELD_IN_EDITOR,
	payload: payload
});

export const addComponent = (payload) => ({
	type: ADD_COMPONENT,
	payload: payload,
});

export const removeComponent = (payload) => ({
	type: REMOVE_COMPONENT,
	payload: payload,
});

export const addMultipleComponents = (payload) => ({
	type: ADD_MULTIPLE_COMPONENTS,
	payload: payload
})

export const changeProperty = (payload) => ({
	type: CHANGE_PROPERTY,
	payload: payload
});

export const changeGridInItem = (payload) => ({
	type: CHANGE_GRID_IN_ITEM,
	payoload: payload
})

export const setActiveTabInSidebar = (payload) => ({
	type: SET_ACTIVE_TAB_IN_SIDEBAR,
	payload: payload
});

export const setActiveSettingsTabInSidebar = (payload) => ({
	type: SET_ACTIVE_SETTINGS_TAB_IN_SIDEBAR,
	payload: payload
});
export const setGrid = (payload) => ({
	type: SET_GRID,
	payload: payload
});

export const setFieldComponentsHash = () => ({
	type: SET_FIELD_COMPONENTS_HASH,
	payload: Math.random().toString(36).substring(9)
});

export const changeAppBarValues = (payload) => ({
	type: CHANGE_APP_BAR_VALUES,
	payload: payload,
})

export const changeFormInformationValues = (payload) => ({
	type: CHANGE_FORM_INFORMATION_VALUES,
	payload: payload,
})

export const addEmail = (payload) => ({
	type: ADD_EMAIL,
	payload: payload,
})

export const changeEmailValues = (payload) => ({
	type: CHANGE_EMAIL_VALUES,
	payload: payload,
})


export const SET_UI_APPBAR = 'SET_UI_APPBAR';
export const SET_UI_SIDEBAR = 'SET_UI_SIDEBAR';
export const SET_UI_SIDEBARSETTINGS = 'SET_UI_SIDEBARSETTINGS';
export const setUiAppBar = (payload) => ({
	type: SET_UI_APPBAR,
	payload: payload,
})
export const setUiSidebar = (payload) => ({
	type: SET_UI_SIDEBAR,
	payload: payload,
})
export const setUiSidebarSettings = (payload) => ({
	type: SET_UI_SIDEBARSETTINGS,
	payload: payload,
})

export const SET_CONDITIONAL_LOGIC = 'SET_CONDITIONAL_LOGIC';
export const setConditionalLogic = (payload) => ({
	type: SET_CONDITIONAL_LOGIC,
	payload: payload
})

export const SET_HUBSPOT_DATA = 'SET_HUBSPOT_DATA';
export const setHubspotData = payload => ({
	type: SET_HUBSPOT_DATA,
	payload: payload
})
