import React from 'react';
import fileSaver from 'file-saver';
import { getXMLApplicationVariables } from '../api';


const ExportXML = ({ appName }) => {

	return (
		<div>
			<a onClick={() => {
					getXMLApplicationVariables(appName)
						.then((data) => {
							var blob = new Blob([data], {type: "text/plain;charset=utf-8"})
							fileSaver.saveAs(blob, `${appName}.xml`);
						})
				}}>Create XML for {appName}</a>
		</div>
	)
};

ExportXML.propTypes = {
	appName: React.PropTypes.string
}
export default ExportXML;
