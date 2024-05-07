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
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(1);
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
    const applyFilters = () => {
        const allFiltersEmpty =
            selectedRoles.length === 0 &&
            selectedExperience.length === 0 &&
            selectedRemote.length === 0 &&
            selectedMinBasePay.length === 0;

        if (allFiltersEmpty) {
            setFilteredItems([]);
        } else {
            const filteredItems = filterItems(items, {
                selectedRoles,
                selectedExperience,
                selectedRemote,
                selectedMinBasePay,
            });
            setFilteredItems(filteredItems);
            console.log("Filtered Items ",filteredItems)
        }
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

    const fetchDataOnScroll = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        let data = {
            limit: 10,
            offset: index,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await axios.post(
                `https://api.weekday.technology/adhoc/getSampleJdJSON`,
                data,
                config
            );
            const newItems = response.data.jdList;
            setItems(prevItems => [...prevItems, ...newItems]); // Concatenate new items with old items
            console.log("Items",items)
            setIndex(prevIndex => prevIndex + 1);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }, [index, isLoading]);


    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchDataOnScroll();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchDataOnScroll]);

    useEffect(() => {
        applyFilters();
    }, [selectedEmployees, selectedRoles, selectedExperience, selectedRemote, selectedMinBasePay,items]);



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
            {filteredItems.length > 0 ? (
                    // Render filtered items
                    filteredItems.map(job => (
                        <Card
                            jdLink={job.jdLink}
                            jobDetailsFromCompany={job.jobDetailsFromCompany}
                            maxJdSalary={job.maxJdSalary}
                            minJdSalary={job.minJdSalary}
                            location={job.location}
                            minExp={job.minExp}
                            maxExp={job.maxExp}
                            jobRole={job.jobRole + " Engineer"}
                            companyName={job.companyName}
                            logoUrl={job.logoUrl}
                        />
                    ))
                ) : (
                    // Render all jobs when no filters are selected
                    items.map(job => (
                        <Card
                            jdLink={job.jdLink}
                            jobDetailsFromCompany={job.jobDetailsFromCompany}
                            maxJdSalary={job.maxJdSalary}
                            minJdSalary={job.minJdSalary}
                            location={job.location}
                            minExp={job.minExp}
                            maxExp={job.maxExp}
                            jobRole={job.jobRole + " Engineer"}
                            companyName={job.companyName}
                            logoUrl={job.logoUrl}
                        />
                    ))
                )}
                {isLoading && <CircularProgress />}
            </div>
        </div>
    )
}

export default Home
