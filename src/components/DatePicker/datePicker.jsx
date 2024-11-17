import Card from "../UI/Card";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CardContent, CardHeader, CardTitle } from "../UI/cards";
export default function DatePickerNew({ setStartDate, setEndDate, startDate, endDate }) {
    return (
        <Card>
            <CardHeader>

                <CardTitle className="text-2xl font-bold">Select Date range</CardTitle>
            </CardHeader>
            <CardContent>
                <DatePicker selected={startDate} dateFormat={'dd/MM/yyyy'} onChange={(date) => setStartDate(date)} />
                <DatePicker selected={endDate} dateFormat={'dd/MM/yyyy'} onChange={(date) => setEndDate(date)} />
            </CardContent>
        </Card>
    )
}