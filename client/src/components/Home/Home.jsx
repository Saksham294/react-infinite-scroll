import React,{useState,useEffect,useCallback} from 'react'
import './Home.css'
import Card from '../Card/Card'
import {CircularProgress } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Stack,
    Chip
} from "@mui/material";
import { 
    roles,
    numOfEmployees,
    experience,
    remote,
    minBasePay
 } from './data';
import { filterItems } from './functions';
import axios from 'axios';

const Home = () => {
    
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    const [selectedRemote, setSelectedRemote] = useState([]);
    const [selectedMinBasePay, setSelectedMinBasePay] = useState([]);
    const handleChange = (event) => {
        const selectedValues = event.target.value;
        const selectedNumbers = selectedValues.map((value) => parseInt(value));
        setSelectedMinBasePay(selectedNumbers);
    };

    const fetchData = async () => {
        const url = 'https://api.weekday.technology/adhoc/getSampleJdJSON';
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = {
            limit: 10,
            offset: 0
        };

        try {
            const response = await axios.post(url, data, config);
            console.log("Response ",response.data.jdList)
            setItems(response.data.jdList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div className='home-container'>
            <div className="search-filters">
                <div className="roles">
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel sx={{ fontSize: "1.8vh", marginTop: "-0.2vh" }}>Roles</InputLabel>
                        <Select
                            multiple
                            sx={{ height: "45px", textAlign: "center" }}
                            value={selectedRoles}
                            onChange={(e) => setSelectedRoles(e.target.value)}
                            input={<OutlinedInput label="Multiple Select" />}
                            renderValue={(selected) => (
                                <Stack gap={1} direction="row" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip
                                            sx={{ fontSize: "1.5vh" }}
                                            key={value}
                                            label={value}
                                            onDelete={() =>
                                                setSelectedRoles(selectedRoles.filter((item) => item !== value))
                                            }
                                            deleteIcon={
                                                <CancelIcon
                                                    sx={{ height: "2.5vh" }}
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 50 * 4.5 + 8, // Adjust according to your items count
                                    },
                                },
                            }}
                        >
                            {roles.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div className="employees">
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel sx={{ fontSize: "1.8vh", marginTop: "-0.5vh" }}>Number of Employees</InputLabel>
                        <Select
                            multiple
                            sx={{ height: "40px", textAlign: "center" }}
                            value={selectedEmployees}
                            onChange={(e) => setSelectedEmployees(e.target.value)}
                            input={<OutlinedInput label="Multiple Select" />}
                            renderValue={(selected) => (
                                <Stack gap={1} direction="row" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip
                                            sx={{ fontSize: "1.5vh" }}
                                            key={value}
                                            label={value}
                                            onDelete={() =>
                                                setSelectedEmployees(selectedEmployees.filter((item) => item !== value))
                                            }
                                            deleteIcon={
                                                <CancelIcon
                                                    sx={{ height: "2.5vh" }}
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 50 * 4.5 + 8, // Adjust according to your items count
                                    },
                                },
                            }}
                        >
                            {numOfEmployees.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div className="experience">
                    <FormControl sx={{ m: 1, minWidth: 105 }}>
                        <InputLabel sx={{ fontSize: "1.8vh", marginTop: "-0.5vh" }}>Experience</InputLabel>
                        <Select
                            multiple
                            sx={{ height: "40px", textAlign: "center" }}
                            value={selectedExperience}
                            onChange={(e) => setSelectedExperience(e.target.value)}
                            input={<OutlinedInput label="Multiple Select" />}
                            renderValue={(selected) => (
                                <Stack gap={1} direction="row" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip
                                            sx={{ fontSize: "1.5vh" }}
                                            key={value}
                                            label={value}
                                            onDelete={() =>
                                                setSelectedExperience(selectedExperience.filter((item) => item !== value))
                                            }
                                            deleteIcon={
                                                <CancelIcon
                                                    sx={{ height: "2.5vh" }}
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 50 * 4.5 + 8, // Adjust according to your items count
                                    },
                                },
                            }}
                        >
                            {experience.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
                <div className="remote">
                    <FormControl sx={{ m: 1, minWidth: 105 }}>
                        <InputLabel sx={{ fontSize: "1.8vh", marginTop: "-0.5vh" }}>Remote</InputLabel>
                        <Select
                            multiple
                            sx={{ height: "40px", textAlign: "center" }}
                            value={selectedRemote}
                            onChange={(e) => setSelectedRemote(e.target.value)}
                            input={<OutlinedInput label="Multiple Select" />}
                            renderValue={(selected) => (
                                <Stack gap={1} direction="row" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip
                                            sx={{ fontSize: "1.5vh" }}
                                            key={value}
                                            label={value}
                                            onDelete={() =>
                                                setSelectedRemote(
                                                    selectedRemote.filter((item) => item !== value)
                                                )
                                            }
                                            deleteIcon={
                                                <CancelIcon
                                                    sx={{ height: "2.5vh" }}
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                        >
                            {remote.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="min-base">
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel sx={{ fontSize: "1.8vh", marginTop: "-0.5vh" }}>Minimum Base Pay Salary</InputLabel>
                        <Select
                            multiple
                            sx={{ height: "40px", textAlign: "center" }}
                            value={selectedMinBasePay}
                            onChange={handleChange}
                            input={<OutlinedInput label="Multiple Select" />}
                            renderValue={(selected) => (
                                <Stack gap={1} direction="row" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip
                                            sx={{ fontSize: "1.5vh" }}
                                            key={value}
                                            label={value}
                                            onDelete={() =>
                                                setSelectedMinBasePay(
                                                    selectedMinBasePay.filter((item) => item !== value)
                                                )
                                            }
                                            deleteIcon={
                                                <CancelIcon
                                                    sx={{ height: "2.5vh" }}
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                        >
                            {minBasePay.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="search-company">
                </div>
            </div>
            <div className="matching-jobs">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}

export default Home
