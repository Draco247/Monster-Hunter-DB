import React from 'react';

const ProgressBar = ({ sharpness }) => {
    const totalValue = sharpness.reduce((acc, val) => acc + val, 0);
    const progressWidth = (totalValue / (sharpness.length * 100)) * 100;
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'white', 'purple'];

    return (
        <div style={{ maxWidth: '100%', width: `${progressWidth}px` }}>
            <div style={{ display: 'flex' }}>
                {sharpness.map((value, index) => (
                    <div
                        key={index}
                        style={{
                            width: `${(value / totalValue) * progressWidth}%`,
                            backgroundColor: colors[index],
                            height: '20px', // Set the height to your desired height
                            margin: 0,
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    )

};

export default ProgressBar;
