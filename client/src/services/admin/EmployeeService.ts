import axios from 'axios';

import http from '../../http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllEmployeeData = () => {
	return http.get<Array<any>>('/admin/employee');
};

const getEmployeeDataById = (id:number) => {
	return http.get<Array<any>>(`/admin/employee/${id}`);
};

const getAllEmployeeDataWithoutDeleted = () => {
	return http.get<Array<any>>('/admin/employee/withoutdelete');
};

const getAllEmployeeDataCurrentlyNotWorking = () => {
	return http.get<Array<any>>('/admin/employee/deleted');
};

const saveEmployee = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employee`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};


const EmployeeService = {
	getAllEmployeeData,
	getEmployeeDataById,
    saveEmployee,
	getAllEmployeeDataWithoutDeleted,
	getAllEmployeeDataCurrentlyNotWorking
   
};

export default EmployeeService;
