import {Line} from 'react-chartjs-2'
import {
    Chart as chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { lineChartData } from './FakeData';

chartjs.register(
    CategoryScale,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineGraph = () =>{
    const option = {};

    return <Line options={option} data={lineChartData}/>
}

export default LineGraph;