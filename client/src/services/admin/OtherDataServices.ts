import axios from 'axios';

import http from '../../http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllProvinces = () => {
	return http.get<Array<any>>('/admin/otherdata/province');
};


const getAllDistricts = () => {
	return http.get<Array<any>>('/admin/otherdata/district');
};


const getDistrictByProvinceId = (id: any) => {
	return http.get<any>(`/admin/otherdata/district/province/${id}`);
};

const OtherDataServices = {
	getAllProvinces,
    getAllDistricts,
	getDistrictByProvinceId,
};

export default OtherDataServices;
