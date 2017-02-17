import axios from 'axios';

export const getQlikVariables = () => {
	//Get the variables.json file contents from the server
		return axios.get('/api/variables')
			.then(response => response.data);
};

//Add a Qlik variable to the qvVariables.json file on the server
export const addQlikVariable = varToAdd => {
		return axios.post('/api/variables', varToAdd)
			.then(response => {
				console.log(response);
		  })
		  .catch(error => {
				console.log(error);
		  });
};

//Returns a unique list of application names that are in the qvVariables.json file.
export const getApplicationNames = () => {
		return axios.get('/api/variables/app')
			.then(response => response.data);
};

//Returns a javascript object of the variables for the passed appName (application)
export const getApplicationVariables = appName => {
		console.log(`/api/variables/app/${appName}`);
		return axios.get(`/api/variables/app/${appName}`)
			.then(response => response.data);
};

//Returns XML for the variables for the passed appName (application)
export const getXMLApplicationVariables = appName => {
		console.log(`/api/variables/app/${appName}?format=xml`);
		return axios.get(`/api/variables/app/${appName}?format=xml`)
			.then(response => response.data);
};

//Update the qvVariables.json file with the data in varToUpdate.
export const updateQlikVariable = varToUpdate => {
		return axios.put('/api/variables', varToUpdate)
			.then(response => {
				if (response.status === 200 && response.statusText === 'OK') {
					return 'Variable updated Successfully';
				}
				return response;
			})
			.catch(error => {
				console.log(`Error updating Qlik Variable id: ${varToUpdate.id} - ${error}`);
			})
};

//Delete the Qlik varaible from the qvVariables.json file with the passed id.
export const deleteQlikVariable = idToDelete => {
		return axios.delete(`api/variables/${idToDelete}`)
			.then(response => {
				console.log('QV Variable Deleted');
			})
			.catch(error => {
				console.log(`Error deleting Qlik Variable id: ${idToDelete} - ${error}`);
			});
};

//==========================================
//-Pull from the /api/settings/... routes
//==========================================
//--Get the data from the applications.json file.
export const getApplicationData = () => {
	return axios.get('api/settings/appnames')
		.then(resp => resp.data)
		.catch(error => console.log('Error in getApplicationData--', error));
}

//Add a new appname to the appNames.json file
export const addAppName = AppNameToAdd => {
		const postObj = {
			appName: AppNameToAdd
		};
		return axios.post('/api/settings/appnames', postObj)
			.then(response => {
				console.log(response);
					return response.data
		  })
		  .catch(error => {
				console.log(error);
		  });
};

//Update the an individual app in the appnames.json file with the data passed in
export const updateAppName = appToUpdate => {
		return axios.put('/api/settings/appnames', appToUpdate)
			.then(response => {
				if (response.status === 200 && response.statusText === 'OK') {
					return 'AppName updated Successfully';
				}
				return response;
			})
			.catch(error => {
				console.log(`Error updating appName id: ${appToUpdate.id} - ${error}`);
			})
};

//Delete the application name from the appnames.json file with the passed id.
export const deleteAppName = idToDelete => {
		return axios.delete(`api/settings/appnames/${idToDelete}`)
			.then(response => {
				console.log(`AppName Deleted`);
			})
			.catch(error => {
				console.log(`Error deleting AppName id: ${idToDelete} - ${error}`);
			});
};
