import { Button } from "@mui/material";
import React from "react";
import {useNavigate,useState} from 'react-router-dom'

const Navdash=()=>{
    const navigate= useNavigate();
    return(
        <>
        <h1>click below</h1>
        <Button onClick={navigate('/Dashboard')}>Dashboard</Button>
        </>
    )
}
