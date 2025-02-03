import { FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

function valuetext(value: number) {
    return `${value}°C`;
}

function createData(
    name: string,
    value: number
) {
    return { name, value };
}



const Body = () => {
    const [loanAmount, setLoanAmout] = useState(1200000);
    const [roi, setRoi] = useState(10);
    const [loanTenure, setloanTenure] = useState(10);

    const [totalIntrest, setTotalIntrest] = useState((loanAmount * roi * loanTenure) / 100)
    useEffect(()=>{
        setTotalIntrest((loanAmount * roi * loanTenure) / 100)
    },[loanAmount, roi, loanTenure])



    function calculateInitialEmi(loanAmount: number, roi: number, tenureInYears: number): number {
        const monthlyRoi = roi / 100 / 12; // Convert annual interest rate (roi) to monthly rate
        const tenureMonths = tenureInYears * 12; // Convert tenure in years to months
    
        if (monthlyRoi === 0) {  // For the case where interest rate is 0
            return loanAmount / tenureMonths; // No interest, so just divide loan amount by number of months
        }
    
        // EMI calculation based on the formula
        const emi = (loanAmount * monthlyRoi * Math.pow(1 + monthlyRoi, tenureMonths)) / (Math.pow(1 + monthlyRoi, tenureMonths) - 1);
        return Math.ceil(emi);
    }
    

    const updateLoanAmount = (event: Event, newValue: number | number[]) => {
        setLoanAmout(newValue as number);
    };

    const updateRoi = (event: Event, newValue: number | number[]) => {
        setRoi(newValue as number);
    };

    const updateTenure = (event: Event, newValue: number | number[]) => {
        setloanTenure(newValue as number);
    };

  
    // Define the rows dynamically based on the current state
    const rows = [
        createData('Monthly EMI', calculateInitialEmi(loanAmount, roi, loanTenure)), // Dynamically calculated EMI
        createData('Principal Amount', loanAmount), // Principal amount
        createData('Total Interest', (loanAmount * roi * loanTenure) / 100), // Example interest calculation
        createData('Total Amount', loanAmount + (loanAmount * roi * loanTenure) / 100), // Total amount after interest
    ];

    return (
        <div className="body">
            <div className='formBox'>
                <form action="">
                    <FormControl fullWidth sx={{ m: 2 }}>
                        <div className="inputArea">
                            <div>Loan Amount</div>
                            <TextField
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '15ch' }}
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    },
                                }}
                                size="small"
                                value={loanAmount}
                            />
                        </div>
                        <Slider
                            defaultValue={1000000}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            shiftStep={100000}
                            step={10000}
                            marks
                            min={10000}
                            max={10000000}
                            onChange={updateLoanAmount}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 2 }}>
                        <div className="inputArea">
                            <div>Rate Of Intrest (p.a)</div>
                            <TextField
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '15ch' }}
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    },
                                }}
                                size="small"
                                value={roi}
                            />
                        </div>
                        <Slider
                            defaultValue={6.5}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            shiftStep={0.5}
                            step={0.5}
                            marks
                            min={0}
                            max={15}
                            onChange={updateRoi}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 2 }}>
                        <div className="inputArea">
                            <div>Loan Tenure</div>
                            <TextField
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '15ch' }}
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
                                    },
                                }}
                                size="small"
                                value={loanTenure}
                            />
                        </div>
                        <Slider
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            shiftStep={1}
                            step={1}
                            marks
                            min={1}
                            max={50}
                            onChange={updateTenure}
                        />
                    </FormControl>
                </form>
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: 650 }} aria-label="caption table">
                        <caption>A basic table example with a caption</caption>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='formBox'>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: loanAmount, label: 'Principal' },
                                { id: 1, value: totalIntrest, label: 'Intrest' },
                            ],
                            innerRadius: 150,
                            outerRadius: 200,
                            paddingAngle: 1,
                            cornerRadius: 5,
                            startAngle: 0,
                            endAngle: 360,
                        }
                    ]}
                    margin={{ top: 10, bottom: 10, left: 100, right: 100 }}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: { vertical: 'top', horizontal: 'middle' },
                            padding: 0,
                        },
                    }}
                />
            </div>



        </div>)
}

export default Body