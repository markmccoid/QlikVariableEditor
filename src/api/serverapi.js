import axios from 'axios';

export const getQlikVariables = () => {
	//Get the variables.json file contents from the server

		return axios.get('/api/variables')
			.then(response => response.data);
};
export const addQlikVariable = varToAdd => {
		return axios.post('/api/variables', varToAdd)
			.then(response => {
				console.log(response);
		  })
		  .catch(error => {
				console.log(error);
		  });
};

export const getApplicationNames = () => {
		return axios.get('/api/variables/app')
			.then(response => response.data);
};

export const getApplicationVariables = appName => {
		console.log(`/api/variables/app/${appName}`);
		return axios.get(`/api/variables/app/${appName}`)
			.then(response => response.data);
};

export const getXMLApplicationVariables = appName => {
		console.log(`/api/variables/app/${appName}?format=xml`);
		return axios.get(`/api/variables/app/${appName}?format=xml`)
			.then(response => response.data);
};

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
export const deleteQlikVariable = idToDelete => {
		return axios.delete(`api/variables/${idToDelete}`)
			.then(response => {
				console.log('QV Variable Deleted');
			})
			.catch(error => {
				console.log(`Error deleting Qlik Variable id: ${idToDelete} - ${error}`);
			});
};
