import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Stack } from '@mui/system';
import { toast } from 'react-toastify';

import EmployeeCatService from '../../../../services/admin/EmployeeCatService';
import LocationMasterService from '../../../../services/admin/LocationMasterService';
import IDesignationData from '../../../../types/DesignationData';
import IDivisionData from '../../../../types/DivisionData';
import IEmpCatData from '../../../../types/EmpCatData';
import IEmployeeData from '../../../../types/EmployeeData';
import IEmpTypeData from '../../../../types/EmpTypeData';
import ILocationData from '../../../../types/LocationData';
import EmployeeTypeService from '../../../../services/admin/EmployeeTypeService';
import DivisionMasterService from '../../../../services/admin/DivisionMasterService';
import DesignationMasterService from '../../../../services/admin/DesignationMasterService';
import CustomeDataPicker from '../../../../components/DataPicker';
import OtherDataServices from '../../../../services/admin/OtherDataServices';
import EmployeeService from '../../../../services/admin/EmployeeService';
import Ripple from '../../../../components/Ripple';

function AddEmployee() {
	const [locationData, setLocationData] = useState<ILocationData[]>();
	const [employeeTypeData, setEmployeeTypeData] = useState<IEmpTypeData[]>();
	const [employeeCatData, setEmployeeCatData] = useState<IEmpCatData[]>();
	const [designationData, setDesignationData] = useState<IDesignationData[]>();
	const [divisionData, setDivisionData] = useState<IDivisionData[]>();
	const [provinces, setProvinces] = useState<any[]>();
	const [districts, setDistricts] = useState<any[]>();
	const [religions, setReligions] = useState<any[]>();

	const [loading, setLoading] = useState(false);

	//dates used in empData
	const [birthDate, setBirthDate] = React.useState<string | null>(null);
	const [NICIDate, setNICIDate] = React.useState<string | null>(null);
	const [passExDate, setPassExDate] = React.useState<string | null>(null);
	const [licIssueDate, setLicIssueDate] = React.useState<string | null>(null);
	const [licExpireDate, setLicExpireDate] = React.useState<string | null>(null);
	const [appDate, setAppDate] = React.useState<string | null>(null);
	const [conStartDate, setConStartDate] = React.useState<string | null>(null);
	const [conEndDate, setConEndDate] = React.useState<string | null>(null);

	//main data model
	const [empData, setEmpData] = useState<IEmployeeData>({
		epfNo: 0,
		initials: '',
		firstName: '',
		lastName: '',
		gender: '',
		dob: '',
		address: '',
		district: 0,
		province: 0,
		contactNo: '',
		personalEmail: '',
		gsuitEmail: '',
		nicNo: '',
		nicIssuedDate: '',
		passportNo: '',
		passExpireDate: '',
		licenseNo: '',
		licenseIssuedDate: '',
		licenseExpireDate: '',
		contactPerson: '',
		cpRelationship: '',
		cpAddress: '',
		cpTelephone: '',
		cpStatus: '',
		cpCivilStatus: '',
		cpReligion: '',
		appointmentDate: '',
		contractStart: '',
		contractEnd: '',
		location: '',
		empType: '',
		empCategory: '',
		designation: '',
		division: '',
	});

	useEffect(() => {
		retreivePageLoadData();
	}, []);

	useEffect(() => {
		setEmpData({
			epfNo: empData?.epfNo,
			initials: empData?.initials,
			firstName: empData?.firstName,
			lastName: empData?.lastName,
			gender: empData?.gender,
			dob: birthDate ? birthDate : '',
			address: empData?.address,
			district: empData?.district,
			province: empData?.province,
			contactNo: empData?.contactNo,
			personalEmail: empData?.personalEmail,
			gsuitEmail: empData?.gsuitEmail,
			nicNo: empData?.nicNo,
			nicIssuedDate: NICIDate ? NICIDate : '',
			passportNo: empData?.passportNo,
			passExpireDate: passExDate ? passExDate : '',
			licenseNo: empData?.licenseNo,
			licenseIssuedDate: licIssueDate ? licIssueDate : '',
			licenseExpireDate: licExpireDate ? licExpireDate : '',
			contactPerson: empData?.contactPerson,
			cpRelationship: empData?.cpRelationship,
			cpAddress: empData?.cpAddress,
			cpTelephone: empData?.cpTelephone,
			cpStatus: empData?.cpStatus,
			cpCivilStatus: empData?.cpCivilStatus,
			cpReligion: empData?.cpReligion,
			appointmentDate: appDate ? appDate : '',
			contractStart: conStartDate ? conStartDate : '',
			contractEnd: conEndDate ? conEndDate : '',
			location: empData?.location,
			empType: empData?.empType,
			empCategory: empData?.empCategory,
			designation: empData?.designation,
			division: empData?.division,
		});
	}, [
		birthDate,
		NICIDate,
		passExDate,
		licExpireDate,
		licIssueDate,
		appDate,
		conEndDate,
		conStartDate,
	]);

	// get location data
	const retreivePageLoadData = () => {
		LocationMasterService.getAllLocations()
			.then((res: any) => {
				setLocationData(res.data);
				// console.log(locationData);
			})
			.catch((e: any) => {
				console.log(e);
			});

		OtherDataServices.getAllProvinces()
			.then((res: any) => {
				setProvinces(res.data);
				// console.log(provinces);
			})
			.catch((e: any) => {
				console.log(e);
			});
		OtherDataServices.getAllReligions()
			.then((res: any) => {
				setReligions(res.data);
				// console.log(provinces);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	// get other data on location selected
	useEffect(() => {
		retreiveOtherEmployeeData(empData?.location);
	}, [empData?.location]);

	useEffect(() => {
		retrieveDistricts(empData?.province);
		// console.log(empData?.province)
	}, [empData?.province]);

	const retrieveDistricts = (id: number) => {
		if (empData?.province) {
			OtherDataServices.getDistrictByProvinceId(id)
				.then((res: any) => {
					setDistricts(res.data);
					// console.log(districts);
				})
				.catch((e: any) => {
					console.log(e);
				});
		}
	};

	const retreiveOtherEmployeeData = (id: string) => {
		if (empData?.location) {
			EmployeeCatService.getEmpCatByLocationId(id)
				.then((res: any) => {
					setEmployeeCatData(res.data);
					// console.log(employeeCatData);
				})
				.catch((e: any) => {
					console.log(e);
				});

			EmployeeTypeService.getEmpTypeByLocationId(id)
				.then((res: any) => {
					setEmployeeTypeData(res.data);
					// console.log(employeeTypeData);
				})
				.catch((e: any) => {
					console.log(e);
				});

			DivisionMasterService.getDivisionByLocationId(id)
				.then((res: any) => {
					setDivisionData(res.data);
					// console.log(divisionData);
				})
				.catch((e: any) => {
					console.log(e);
				});

			DesignationMasterService.getDesignationByLocationId(id)
				.then((res: any) => {
					setDesignationData(res.data);
					// console.log(designationData);
				})
				.catch((e: any) => {
					console.log(e);
				});
		}
	};

	const onChange = (e: any) => {
		setEmpData((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const resetForm = () => {
		setEmpData({
			epfNo: 0,
			initials: '',
			firstName: '',
			lastName: '',
			gender: '',
			dob: '',
			address: '',
			district: 0,
			province: 0,
			contactNo: '',
			personalEmail: '',
			gsuitEmail: '',
			nicNo: '',
			nicIssuedDate: '',
			passportNo: '',
			passExpireDate: '',
			licenseNo: '',
			licenseIssuedDate: '',
			licenseExpireDate: '',
			contactPerson: '',
			cpRelationship: '',
			cpAddress: '',
			cpTelephone: '',
			cpStatus: '',
			cpCivilStatus: '',
			cpReligion: '',
			appointmentDate: '',
			contractStart: '',
			contractEnd: '',
			location: '',
			empType: '',
			empCategory: '',
			designation: '',
			division: '',
		});
		setBirthDate('');
		setNICIDate('');
		setPassExDate('');
		setLicIssueDate('');
		setLicExpireDate('');
		setAppDate('');
		setConStartDate('');
		setConEndDate('');
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(empData);
		if (empData.epfNo) {
			setLoading(true);
			setTimeout(async () => {
				const result = await EmployeeService.saveEmployee(empData);
				if (result.data) {
					toast.success('New Employee is added', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					// resetForm();
				} else {
					toast.error('Request cannot completed!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					// resetForm();
				}
				setLoading(false);
			}, 1000);
		} else {
			toast.error('Please add an EPF Number', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<>
			{!loading ? (
				<section className=''>
					<h2 className='text-xl font-bold'>Add New Employee</h2>
					<form onSubmit={onSubmit}>
						<div className='admin-form'>
							<h2 className='text-xl font-bold'>Personal Details</h2>

							<div className='employee-form-layout'>
								<div>
									<label className='input-label' htmlFor='epfNo'>
										EPF No
									</label>
									<input
										id='epfNo'
										type='text'
										className='tailwind-text-box'
										value={empData.epfNo > 0 ? empData.epfNo : ''}
										onChange={onChange}
										name='epfNo'
									/>
								</div>
								<div className='hidden lg:block'></div>
								<div className='hidden lg:block'></div>
								<div>
									<label className='input-label' htmlFor='initials'>
										Initials
									</label>
									<input
										id='initials'
										type='text'
										className='tailwind-text-box'
										value={empData.initials}
										name='initials'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='firstName'>
										First Name
									</label>
									<input
										id='firstName'
										type='text'
										className='tailwind-text-box'
										value={empData.firstName}
										name='firstName'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='lastName'>
										Last Name
									</label>
									<input
										id='lastName'
										type='text'
										className='tailwind-text-box'
										value={empData.lastName}
										name='lastName'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='gender'>
										Gender
									</label>
									<select
										className='tailwind-text-box'
										value={empData.gender}
										name='gender'
										id='gender'
										onChange={onChange}
									>
										<option value='' disabled>
											Select Gender
										</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
									</select>
								</div>
								<div>
									<label className='input-label' htmlFor='dob'>
										Date of Birth
									</label>
									<CustomeDataPicker
										date={birthDate}
										setDate={setBirthDate}
										title='DOB'
									/>
								</div>
								<div className='hidden lg:block'></div>
								<div>
									<label className='input-label' htmlFor='province'>
										Province
									</label>
									<select
										className='tailwind-text-box'
										value={empData.province}
										id='province'
										name='province'
										onChange={onChange}
									>
										<option disabled value={0}>
											Select Province
										</option>

										{provinces?.map((p: any, i: number) => {
											return (
												<option key={i} value={p.id}>
													{p.pname} Province
												</option>
											);
										})}
									</select>
								</div>

								<div>
									<label className='input-label' htmlFor='district'>
										District
									</label>
									<select
										className='tailwind-text-box'
										value={empData.district}
										id='district'
										name='district'
										onChange={onChange}
									>
										{empData.province ? (
											<option disabled value={0}>
												Select District
											</option>
										) : (
											<option disabled value={0}>
												Select Province First
											</option>
										)}
										{districts?.map((d: any, i: number) => {
											return (
												<option key={i} value={d.id}>
													{d.dname}
												</option>
											);
										})}
									</select>
								</div>
								<div>
									<label className='input-label' htmlFor='address'>
										Address
									</label>
									<input
										id='address'
										type='text'
										className='tailwind-text-box'
										value={empData.address}
										name='address'
										onChange={onChange}
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='contactNo'>
										Contact Number (+94 XXXXXXXXX)
									</label>
									<input
										id='contactNo'
										type='text'
										className='tailwind-text-box'
										value={empData.contactNo}
										name='contactNo'
										onChange={onChange}
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='personalEmail'>
										Personal Email
									</label>
									<input
										id='personalEmail'
										type='email'
										className='tailwind-text-box'
										value={empData.personalEmail}
										name='personalEmail'
										onChange={onChange}
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='gsuitEmail'>
										Gsuit Email
									</label>
									<input
										id='gsuitEmail'
										type='email'
										className='tailwind-text-box'
										value={empData.gsuitEmail}
										name='gsuitEmail'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='nicNo'>
										NIC No
									</label>
									<input
										id='nicNo'
										type='text'
										className='tailwind-text-box'
										value={empData.nicNo}
										name='nicNo'
										onChange={onChange}
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='NICIDate'>
										NIC Issue date
									</label>
									<CustomeDataPicker
										date={NICIDate}
										setDate={setNICIDate}
										title='NIC Issue date'
									/>
								</div>
								<div className='hidden lg:block'></div>
								<div>
									<label className='input-label' htmlFor='passportNo'>
										Passport No
									</label>
									<input
										id='passportNo'
										type='text'
										className='tailwind-text-box'
										value={empData.passportNo}
										name='passportNo'
										onChange={onChange}
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='passExDate'>
										Passport Expiry date
									</label>
									<CustomeDataPicker
										date={passExDate}
										setDate={setPassExDate}
										title='Passport Expiry date'
									/>
								</div>
								<div className='hidden lg:block'></div>

								<div>
									<label className='input-label' htmlFor='licenseNo'>
										License No
									</label>
									<input
										id='licenseNo'
										type='text'
										className='tailwind-text-box'
										value={empData.licenseNo}
										name='licenseNo'
										onChange={onChange}
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='licIssueDate'>
										License Issue date
									</label>
									<CustomeDataPicker
										date={licIssueDate}
										setDate={setLicIssueDate}
										title='Passport Issue date'
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='licExpireDate'>
										License Expiry date
									</label>
									<CustomeDataPicker
										date={licExpireDate}
										setDate={setLicExpireDate}
										title='Passport Expiry date'
									/>
								</div>
							</div>
						</div>

						<div className='admin-form'>
							<h2 className='text-xl font-bold'>Emergency Contact Details</h2>

							<div className='employee-form-layout'>
								<div>
									<label className='input-label' htmlFor='contactPerson'>
										Contact Person
									</label>
									<input
										id='contactPerson'
										type='text'
										className='tailwind-text-box'
										value={empData.contactPerson}
										name='contactPerson'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='cpRelationship'>
										Relationship
									</label>
									<input
										id='cpRelationship'
										type='text'
										className='tailwind-text-box'
										value={empData.cpRelationship}
										name='cpRelationship'
										onChange={onChange}
									/>
								</div>
								<div className='hidden lg:block'></div>

								<div>
									<label className='input-label' htmlFor='cpAddress'>
										Address
									</label>
									<input
										id='cpAddress'
										type='text'
										className='tailwind-text-box'
										value={empData.cpAddress}
										name='cpAddress'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='cpTelephone'>
										Telephone No (+94 XXXXXXXXX)
									</label>
									<input
										id='cpTelephone'
										type='text'
										className='tailwind-text-box'
										value={empData.cpTelephone}
										name='cpTelephone'
										onChange={onChange}
									/>
								</div>

								<div className='hidden lg:block'></div>

								<div>
									<label className='input-label' htmlFor='cpStatus'>
										Status
									</label>
									<input
										id='cpStatus'
										type='text'
										className='tailwind-text-box'
										value={empData.cpStatus}
										name='cpStatus'
										onChange={onChange}
									/>
								</div>

								<div>
									<label className='input-label' htmlFor='cpCivilStatus'>
										Civil Status
									</label>
									<select
										className='tailwind-text-box'
										value={empData.cpCivilStatus}
										name='cpCivilStatus'
										id='cpCivilStatus'
										onChange={onChange}
									>
										<option value='' disabled>
											Select Civil Status
										</option>
										<option value='married'>Married</option>
										<option value='unmarried'>Unmarried</option>
									</select>
								</div>

								<div>
									<label className='input-label' htmlFor='cpReligion'>
										Religion
									</label>
									<select
										className='tailwind-text-box'
										id='cpReligion'
										value={empData.cpReligion}
										name='cpReligion'
										onChange={onChange}
									>
										<option disabled value=''>
											Select Religion
										</option>
										{religions?.map((l: any, i: number) => {
											return (
												<option key={i} value={l.name}>
													{l.name}
												</option>
											);
										})}
									</select>
									
								</div>
							</div>
						</div>

						<div className='admin-form'>
							<h2 className='text-xl font-bold'>Employee Details</h2>

							<div className='employee-form-layout'>
								<div>
									<label className='input-label' htmlFor='location'>
										Location
									</label>
									<select
										className='tailwind-text-box'
										value={empData.location}
										id='location'
										name='location'
										onChange={onChange}
									>
										<option disabled value=''>
											Select Location
										</option>
										{locationData?.map((l: ILocationData, i: number) => {
											return (
												<option key={i} value={l.locationId}>
													{l.locationName}
												</option>
											);
										})}
									</select>
								</div>

								<div>
									<label className='input-label' htmlFor='empType'>
										Employee Type
									</label>
									<select
										className='tailwind-text-box'
										value={empData.empType}
										id='empType'
										name='empType'
										onChange={onChange}
									>
										{empData.location ? (
											<option disabled value=''>
												Select Employee Type
											</option>
										) : (
											<option disabled value=''>
												Select Location First
											</option>
										)}
										{employeeTypeData?.map((l: IEmpTypeData, i: number) => {
											return (
												<option key={i} value={l.typeId}>
													{l.typeName}
												</option>
											);
										})}
									</select>
								</div>
								<div>
									<label className='input-label' htmlFor='empCategory'>
										Employee Category
									</label>
									<select
										className='tailwind-text-box'
										value={empData.empCategory}
										id='empCategory'
										name='empCategory'
										onChange={onChange}
									>
										{empData.location ? (
											<option disabled value=''>
												Select Employee Category
											</option>
										) : (
											<option disabled value=''>
												Select Location First
											</option>
										)}
										{employeeCatData?.map((l: IEmpCatData, i: number) => {
											return (
												<option key={i} value={l.employeeCategoryId}>
													{l.description}
												</option>
											);
										})}
									</select>
								</div>

								<div>
									<label className='input-label' htmlFor='designation'>
										Designation
									</label>
									<select
										className='tailwind-text-box'
										value={empData.designation}
										id='designation'
										name='designation'
										onChange={onChange}
									>
										{empData.location ? (
											<option disabled value=''>
												Select Designation
											</option>
										) : (
											<option disabled value=''>
												Select Location First
											</option>
										)}
										{designationData?.map((l: IDesignationData, i: number) => {
											return (
												<option key={i} value={l.id}>
													{l.designationName}
												</option>
											);
										})}
									</select>
								</div>

								<div>
									<label className='input-label' htmlFor='division'>
										Division
									</label>
									<select
										className='tailwind-text-box'
										value={empData.division}
										id='division'
										name='division'
										onChange={onChange}
									>
										{empData.location ? (
											<option disabled value=''>
												Select Division
											</option>
										) : (
											<option disabled value=''>
												Select Location First
											</option>
										)}
										{divisionData?.map((l: IDivisionData, i: number) => {
											return (
												<option key={i} value={l.divisionId}>
													{l.name}
												</option>
											);
										})}
									</select>
								</div>
								<div className='hidden lg:block'></div>
								<div>
									<label className='input-label' htmlFor='appointmentDate'>
										Appointment date
									</label>
									<CustomeDataPicker
										date={appDate}
										setDate={setAppDate}
										title='Appointment date'
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='contractStart'>
										Contract Start date
									</label>
									<CustomeDataPicker
										date={conStartDate}
										setDate={setConStartDate}
										title='Contract Start date'
									/>
								</div>
								<div>
									<label className='input-label' htmlFor='contractEnd'>
										Contract End date
									</label>
									<CustomeDataPicker
										date={conEndDate}
										setDate={setConEndDate}
										title='Contract End date'
									/>
								</div>
							</div>
						</div>

						<Stack
							direction='row'
							justifyContent='flex-end'
							alignItems='flex-end'
							spacing={2}
							className='admin-form-buton-stack'
						>
							<button
								className='action-com-model-error-btn'
								type='reset'
								color='error'
								onClick={resetForm}
							>
								Reset
							</button>
							<button className='action-com-model-sucess-btn' type='submit'>
								Submit
							</button>
						</Stack>
					</form>
				</section>
			) : (
				<Ripple />
			)}
		</>
	);
}

export default AddEmployee;
