import React from 'react'
import './Card.css'
import { Typography } from '@mui/material';

const Card = (
    {
        jdLink,
        jobDetailsFromCompany,
        maxJdSalary,
        minJdSalary,
        location,
        minExp,maxExp,
        jobRole,
        companyName,
        logoUrl

    }
) => {
    return (
        <div className='card-container'>
            <div className="date-posted">
            <p>⌛Posted 10 days ago</p>
            </div>
            <div className="job-header">
                <div className="company-logo">
                    <img src={logoUrl!=null?logoUrl:""} alt='company-logo' />
                </div>
                <div className="job-title">
                    <div className="company-name">
                      <Typography variant="h6">{
                            companyName!=null?companyName:""
                      }</Typography>
                    </div>
                    <div className="role">
                      <Typography variant='h6'>{
                            jobRole!=null?jobRole:""
                      }</Typography>
                    </div>
                    <div className="location">
                      <Typography variant='h6'>
                        {location!=null?location:""}
                      </Typography>
                    </div>
                </div>
            </div>
            <div className="est-salary">
                <p>Estimated Salary: {minJdSalary!=null?minJdSalary:0}-{maxJdSalary!=null?maxJdSalary:null} LPA ✅</p>
            </div>

            <div className="job-desc">
                <div className="about-header">
                    <Typography variant='h6'>About Company:</Typography>
                </div>
                <div className="about-company">
                    <p>About us</p>
                    <div className="about-us">
                    <Typography variant='h6'>
                        {jobDetailsFromCompany!=null?jobDetailsFromCompany:""}
                    </Typography>
                    </div>
                </div>
            </div>
            <div className="min-exp">
                <Typography variant='h6'>Minimum Experience</Typography>
                <p>{    minExp!=null?minExp:0} years</p>
            </div>
            <div className="apply-btn">
                {/* {{//bg color-#53ebc3, color-black} */}
               <a href={jdLink!=null?jdLink:""}>
               <button>⚡Easy Apply</button>
               </a>
            </div>
            <div className="referral-btn">
                {/* //bg color-#4d46da, color-white */}
                <button>Unlock referral asks</button>
            </div>
        </div>
    )
}

export default Card
