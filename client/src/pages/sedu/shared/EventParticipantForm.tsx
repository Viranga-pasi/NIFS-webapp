import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HiPlus, HiX } from "react-icons/hi";

import { generateID } from '../../../constant/generateId';



import '../../pages.css'

function EventParticipantForm({ type, total, setTotal }: any) {


    const [value, setValue] = useState({
        id: '',
        p_type: type,
        name: '',
        nic: '',
        contactNo: '',
        address: '',
        email: ''

    })

    const [p_id, setP_id] = useState<String | any>('');

    useEffect(()=>{
        generateEventId();
        console.log("trigger "+ p_id)
        setValue({
            id: p_id,
            p_type: type,
            name: value?.name,
            nic: value?.nic,
            contactNo: value?.contactNo,
            address: value?.address,
            email: value?.email
        })
    }, [value.name])

    const generateEventId = () => {
        setP_id(generateID('PM'))
        
    }

    const onChange = (e: any) => {
        setValue((preState: any) => ({
            ...preState,
            [e.target.name]: e.target.value
        }));
    }


    const handleAdd = () => {
        setValue({
            id: p_id,
            p_type: type,
            name: value?.name,
            nic: value?.nic,
            contactNo: value?.contactNo,
            address: value?.address,
            email: value?.email
        })
        
        console.log(value)
        if (value.name !== '') {
            setTotal((prev: any) => [...prev, value]);
            reset()
        }
        else {
            alert('Please Enter value to Add!')
        }
    }




    const reset = () => {
        setValue({
            id: '',
            p_type: type,
            name: '',
            nic: '',
            contactNo: '',
            address: '',
            email: ''
        })
    }


    // console.log(total)


    return (
        <>
            <div className="flex flex-col items-center justify-between sm:flex-row">
                {/* name */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between w-[100%]">
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            type="search"
                            name='name'
                            size="small"
                            onChange={onChange}
                            value={value.name}

                        />
                    </Box>

                    {/* nic number */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="NIC"
                            variant="outlined"
                            type="search"
                            name='nic'
                            size="small"
                            onChange={onChange}
                            value={value.nic}

                        />
                    </Box>

                    {/* contact number */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Contact No"
                            variant="outlined"
                            type="search"
                            name='contactNo'
                            size="small"
                            onChange={onChange}
                            value={value.contactNo}

                        />
                    </Box>

                    {/* address */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Address"
                            variant="outlined"
                            type="search"
                            name='address'
                            size="small"
                            onChange={onChange}
                            value={value.address}

                        />
                    </Box>

                    {/* email */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            type="search"
                            name='email'
                            size="small"
                            onChange={onChange}
                            value={value.email}

                        />
                    </Box>
                </div>


                <div className='flex items-center justify-between mb-4'>
                    <Button className='mr-10'> <HiPlus className='text-3xl' onClick={handleAdd} /></Button>
                    <Button color='error' className='ml-10'> <HiX className='text-3xl' onClick={reset} /></Button>
                </div>


            </div>


        </>
    )
}

export default EventParticipantForm
