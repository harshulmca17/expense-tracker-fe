import Card from "../UI/Card";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CardContent, CardHeader, CardTitle } from "../UI/cards";
export default function DatePickerNew({ setStartDate, setEndDate, startDate, endDate }) {
    return (
        <Card>
            <div style={{ justifyItems: 'center' }}><CardHeader>

                <CardTitle className="text-2xl font-bold">Select Date range</CardTitle>
            </CardHeader>
                <CardContent>
                    <DatePicker style={{
                        // Add your inline styles here
                        backgroundColor: '#f2f2f2',
                        color: '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px',
                        fontSize: '16px'
                    }} selected={startDate} dateFormat={'dd/MM/yyyy'} onChange={(date) => setStartDate(date)} />
                    <DatePicker style={{
                        // Add your inline styles here
                        backgroundColor: '#f2f2f2',
                        color: '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px',
                        fontSize: '16px'
                    }}
                        selected={endDate} dateFormat={'dd/MM/yyyy'} onChange={(date) => setEndDate(date)} />
                </CardContent></div>
        </Card>
    )
}