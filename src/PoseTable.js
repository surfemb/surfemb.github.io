import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {TableRow} from "@mui/material";


function createData(key, method, domain, synth, lmo, tless, tudl, icbin, itodd, hb, ycbv, avg) {
    return {key, method, domain, synth, lmo, tless, tudl, icbin, itodd, hb, ycbv, avg};
}

const header = ['Method', 'Domain', 'Synth', 'LM-O', 'T-LESS', 'TUD-L', 'IC-BIN', 'ITODD', 'HB', 'YCB-V', 'Avg']
const synthRows = [
    createData(-1, <b>SurfEmb</b>, 'RGB', '✓', <b>0.656</b>, <b>0.741</b>, <b>0.715</b>, <b>0.585</b>, <b>0.387</b>,
        <b>0.793</b>, <b>0.653</b>, <b>0.647</b>),
    createData(0,'Epos', 'RGB', '✓', 0.547, 0.467, 0.558, 0.363, 0.186, 0.580, 0.499, 0.457),
    createData(1,'CDPNv2', 'RGB', '✓', 0.624, 0.407, 0.588, 0.473, 0.102, 0.722, 0.390, 0.472),
    createData(2,'DPODv2', 'RGB', '✓', 0.584, 0.636, '-', '-', '-', 0.725, '-', '-'),
    createData(3,'PVNet', 'RGB', '✓', 0.575, '-', '-', '-', '-', '-', '-', '-'),
    createData(4,'CosyPose', 'RGB', '✓', 0.633, 0.640, 0.685, 0.583, 0.216, 0.656, 0.574, 0.570),
]

const rgbdRows = [
    createData(5,<b>SurfEmb</b>, 'RGB-D', '✓', <b>0.758</b>, <b>0.828</b>, 0.854, <b>0.656</b>, 0.498,
        <b>0.867</b>, 0.806, <b>0.752</b>),
    createData(6,<b>SurfEmb</b>, 'RGB-D', '✗', <b>0.758</b>, <b>0.833</b>, 0.933, <b>0.656</b>, 0.498,
        <b>0.867</b>, 0.824, <b>0.767</b>),
    createData(7,'Drost', 'RGB-D', '*', 0.515, 0.500, 0.851, 0.368, <b>0.570</b>, 0.671, 0.375, 0.550),
    createData(8,'Vidal Sensors', 'D', '*', 0.582, 0.538, 0.876, 0.393, 0.435, 0.706, 0.450, 0.569),
    createData(9,'Koenig-Hybrid', 'RGB-D', '✗', 0.631, 0.655, 0.920, 0.430, 0.483, 0.651, 0.701, 0.639),
    createData(10,'Pix2Pose', 'RGB-D', '✗', 0.588, 0.512, 0.820, 0.390, 0.351, 0.695, 0.780, 0.591),
    createData(11,'CosyPose', 'RGB-D', '✗', 0.714, 0.701, <b>0.939</b>, 0.647, 0.313, 0.712, <b>0.861</b>, 0.698),
]

const rowToTableRows = rows => rows.map(row => (
    <TableRow key={row.key}>
        {header.map(name =>
            <TableCell key={row.key + name}>
                {row[name.replace('-', '').toLowerCase()]}
            </TableCell>)}
    </TableRow>
))

const DividerRow = props => <TableRow>
    <TableCell colSpan={11} style={{textAlign: 'center'}}><i>{props.children}</i></TableCell>
</TableRow>

export default function PoseTable() {
    return (
        <TableContainer component={Paper}>
            <Table size="small" sx={{minWidth: 852}}>
                <TableHead>
                    <TableRow>
                        {header.map(name => <TableCell key={name}>{name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <DividerRow>Methods using color, trained purely on synthetic images</DividerRow>
                    {rowToTableRows(synthRows)}
                    <DividerRow>Methods using depth</DividerRow>
                    {rowToTableRows(rgbdRows)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}