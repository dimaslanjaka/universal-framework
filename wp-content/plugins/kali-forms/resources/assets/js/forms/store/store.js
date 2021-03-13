import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import { save, load } from 'redux-localstorage-simple';

const initialState = {
	PageLoading: false,
	PlaceholderDialog: false,
	EmailWizardDialog: false,
	/**
	 * Field components currently active in the builder
	 */
	FieldComponents: KaliFormsObject.fieldComponents,
	/**
	 * Grid element
	 */
	Grid: KaliFormsObject.grid,
	/**
	 * Are we template selecting?
	 */
	TemplateSelecting: KaliFormsObject.fieldComponents.length === 0,
	/**
	 * Sidebar state, active tab and components
	 */
	Sidebar: {
		activeTab: 'formFields',
		fieldComponents: KaliFormsObject.formFields,
	},
	/**
	 * Conditional logic
	 */
	ConditionalLogic: typeof KaliFormsObject.conditionalLogic !== 'undefiend' ? KaliFormsObject.conditionalLogic : [],
	/**
	 * Hubspot integration
	 */
	HubSpot: typeof KaliFormsObject.hubspot !== 'undefined' ? KaliFormsObject.hubspot : [],
	/**
	 * Form Emails
	 */
	FormEmails: KaliFormsObject.formEmails,
	Errors: [],
};

const createStoreWithMiddleware
	= applyMiddleware(
		save({ debounce: 500, states: ['Ui'], namespace: `form${KaliFormsObject.formId}` }) // Saving done here
	)(createStore)

const store = createStoreWithMiddleware(
	rootReducer,
	load({
		states: ['Ui'],
		preloadedState: initialState,
		disableWarnings: true,
		namespace: `form${KaliFormsObject.formId}`
	}) // Loading done here
)

// let store = createStore(rootReducer, initialState);

export default store;
