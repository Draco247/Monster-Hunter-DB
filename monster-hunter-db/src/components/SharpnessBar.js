import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import ProgressBar from "react-bootstrap/ProgressBar";

const SharpnessBar = ({ sharpness }) => {
    const totalValue = sharpness.reduce((acc, val) => acc + val, 0);
    // console.log(totalValue);
    return (
        <ProgressBar style={{ maxWidth: '100%', width: '100%', backgroundColor: 'black' }}  now={totalValue} max={100}>
            <ProgressBar style={{ backgroundColor: 'red' }} now={sharpness[0]} key={1} />
            <ProgressBar style={{ backgroundColor: 'orange' }} now={sharpness[1]} key={2} />
            <ProgressBar style={{ backgroundColor: 'yellow' }} now={sharpness[2]} key={3} />
            <ProgressBar style={{ backgroundColor: 'green' }} now={sharpness[3]} key={4} />
            <ProgressBar style={{ backgroundColor: 'blue' }} now={sharpness[4]} key={5} />
            <ProgressBar style={{ backgroundColor: 'white' }} now={sharpness[5]} key={6} />
            <ProgressBar style={{ backgroundColor: 'purple' }} now={sharpness[6]} key={7} />
        </ProgressBar>

    );
        // <div style={{ maxWidth: '100%', width: `${progressWidth}px` }}>
        //     <div style={{ display: 'flex' }}>
        //         {sharpness.map((value, index) => (
        //             <div
        //                 key={index}
        //                 style={{
        //                     width: `${(value / totalValue) * progressWidth}%`,
        //                     backgroundColor: colors[index],
        //                     height: '20px', // Set the height to your desired height
        //                     margin: 0,
        //                     padding: 0,
        //                 }}
        //             />
        //         ))}
        //     </div>
        // </div>

};

export default SharpnessBar;
