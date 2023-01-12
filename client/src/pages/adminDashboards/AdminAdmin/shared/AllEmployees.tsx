import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Ripple from '../../../../components/Ripple';
import { HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import EmployeeService from '../../../../services/admin/EmployeeService';
import IEmployeeData from '../../../../types/EmployeeData';

function AllEmployees() {
	const [pageSize, setPageSize] = useState(20);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);

	useEffect(() => {
		retreiveEmployees();
		// console.log(empData)
	}, []);

	const retreiveEmployees = () => {
		EmployeeService.getAllEmployeeData()
			.then((res: any) => {
				setEmpData(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const allEmployeesWithoutDeleted = () => {
		EmployeeService.getAllEmployeeDataWithoutDeleted()
			.then((res: any) => {
				setEmpData(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

    const getAllEmployeeDataCurrentlyNotWorking = () => {
		EmployeeService.getAllEmployeeDataCurrentlyNotWorking()
			.then((res: any) => {
				setEmpData(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const columns = useMemo(
		() => [
			{ field: 'epfNo', headerName: 'EPF NO', width: 100 },
			{
				field: 'initials',
				headerName: 'Initials',
				width: 120,
				editable: true,
			},
			{
				field: 'firstName',
				headerName: 'First Name',
				width: 150,
				editable: true,
			},
			{
				field: 'lastName',
				headerName: 'Last Name',
				width: 150,
				editable: true,
			},
			{
				field: 'gender',
				headerName: 'Gender',
				width: 100,
				editable: true,
			},
			{
				field: 'dob',
				headerName: 'Date of Birth',
				width: 150,
				editable: true,
			},
			{
				field: 'address',
				headerName: 'Address',
				width: 250,
				editable: true,
			},
			{
				field: 'district',
				headerName: 'District',
				width: 100,
				editable: true,
			},
			{
				field: 'province',
				headerName: 'Province',
				width: 100,
				editable: true,
			},
			{
				field: 'contactNo',
				headerName: 'contact No',
				width: 150,
				editable: true,
			},
			{
				field: 'personalEmail',
				headerName: 'Personal Email',
				width: 250,
				editable: true,
			},
			{
				field: 'gsuitEmail',
				headerName: 'Gsuit Email',
				width: 250,
				editable: true,
			},
			{
				field: 'empType',
				headerName: 'Employee Type',
				width: 200,
				editable: true,
			},
			{
				field: 'empCategory',
				headerName: 'Employee Category',
				width: 200,
				editable: true,
			},
			{
				field: 'division',
				headerName: 'Division',
				width: 200,
				editable: true,
			},
			{
				field: 'designation',
				headerName: 'Designation',
				width: 200,
				editable: true,
			},
			{
				field: 'location',
				headerName: 'Location',
				width: 200,
				editable: true,
			},
			{
				field: 'nicNo',
				headerName: 'NIC No',
				width: 150,
				editable: true,
			},
			{
				field: 'nicIssuedDate',
				headerName: 'NIC Issued Date',
				width: 150,
				editable: true,
			},
			{
				field: 'passportNo',
				headerName: 'passport No',
				width: 150,
				editable: true,
			},
			{
				field: 'passExpireDate',
				headerName: 'Passport Expire Date',
				width: 150,
				editable: true,
			},
			{
				field: 'licenseNo',
				headerName: 'License No',
				width: 150,
				editable: true,
			},
			{
				field: 'licenseIssuedDate',
				headerName: 'License Issued Date',
				width: 150,
				editable: true,
			},
			{
				field: 'licenseExpireDate',
				headerName: 'License Expire Date',
				width: 150,
				editable: true,
			},
			{
				field: 'contactPerson',
				headerName: 'Contact Person',
				width: 200,
				editable: true,
			},
			{
				field: 'cpRelationship',
				headerName: 'Relationship',
				width: 150,
				editable: true,
			},
			{
				field: 'cpRelationship',
				headerName: 'Relationship',
				width: 150,
				editable: true,
			},
			{
				field: 'cpAddress',
				headerName: 'Address',
				width: 250,
				editable: true,
			},
			{
				field: 'cpAddress',
				headerName: 'Address',
				width: 250,
				editable: true,
			},
			{
				field: 'cpTelephone',
				headerName: 'Telephone',
				width: 150,
				editable: true,
			},
			{
				field: 'cpStatus',
				headerName: 'Status',
				width: 150,
				editable: true,
			},
			{
				field: 'cpCivilStatus',
				headerName: 'Civil Status',
				width: 150,
				editable: true,
			},
			{
				field: 'cpReligion',
				headerName: 'Religion',
				width: 150,
				editable: true,
			},
			{
				field: 'appointmentDate',
				headerName: 'Appointment Date',
				width: 150,
				editable: true,
			},
			{
				field: 'contractStart',
				headerName: 'Contract Start Date',
				width: 150,
				editable: true,
			},
			{
				field: 'contractEnd',
				headerName: 'Contract End Date',
				width: 150,
				editable: true,
			},
		],
		[rowId]
	);

	return (
		<div>
			<div className='flex items-center mb-6'>
				<h2 className='text-xl font-bold'>All Employee Details</h2>
                <button
					className='action-com-model-sucess-btn'
					type='submit'
					onClick={retreiveEmployees}
				>
					Get only current Employees
				</button>
                
                <button
					className='action-com-model-sucess-btn !bg-orange-600 border-orange-600'
					type='submit'
					onClick={allEmployeesWithoutDeleted}
				>
					Get all Employees previously worked
				</button>
               
                <button
					className='action-com-model-error-btn'
					type='submit'
					onClick={getAllEmployeeDataCurrentlyNotWorking}
				>
					Get Employees currently not working
				</button>
			</div>
			<Box sx={{ width: '100%', height: '400px' }}>
				<DataGrid
					checkboxSelection={true}
					components={{ Toolbar: GridToolbar }}
					rowHeight={60}
					columns={columns}
					rows={empData}
					getRowId={(row) => row.epfNo}
					rowsPerPageOptions={[20, 40, 60]}
					pageSize={pageSize}
					onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
					onCellEditCommit={(params: any) => setRowId(params.id)}
				/>
			</Box>
		</div>
	);
}

export default AllEmployees;
