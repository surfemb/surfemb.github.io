import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import KeyViewer from "./KeyViewer";
import DistributionViewer from "./DistributionViewer";
import PoseTable from "./PoseTable";
import "./App.css";

const embDim = 12
const urlRoot = '/data' + embDim + '/'


const datasets_display = [
    "LM-O",
    "T-LESS",
    "TUD-L",
    "IC-BIN",
    "ITODD",
    "HB",
    "YCB-V"
]
const datasets = datasets_display.map(d => d.replace('-', '').toLowerCase())


const objIds = [
    [1, 5, 6, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [1, 2, 3],
    [1, 2],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
]

function ObjectTabs(props) {
    const {objIdx, setObjIdx, objIds} = props;
    return (
        <Tabs variant='scrollable' scrollButtons allowScrollButtonsMobile value={objIdx}
              onChange={(event, newValue) => setObjIdx(newValue)}>
            {objIds.map((objId, i) =>
                <Tab key={i} label={objId}/>
            )}
        </Tabs>
    );
}

function Section(props) {
    return (<Typography variant="h6" style={{marginTop: '1.5em'}}>{props.children}</Typography>)
}


export default function App() {
    const [{datasetIdx, objIdx}, setState] = React.useState({datasetIdx: 1, objIdx: 1})

    const setDatasetIdx = datasetIdx => setState({datasetIdx, objIdx: 0})
    const setObjIdx = objIdx => setState({datasetIdx, objIdx})

    const dataset = datasets[datasetIdx]
    const objUrlRoot = urlRoot + dataset + '-' + objIdx

    const ExampleLink = props => {
        let {dataset, obj} = props
        if (typeof dataset === 'string') dataset = datasets.indexOf(dataset)
        if (typeof obj === 'string') obj = objIds[dataset].indexOf(parseInt(obj))
        return (
            <span>
                <span> </span>
                <Button style={{padding: 0, minWidth: 0, color: '#143b96'}} onClick={() => setState({
                    datasetIdx: dataset, objIdx: obj
                })}>
                    {datasets[dataset]} {objIds[dataset][obj]}
                </Button>
            </span>
        )
    }

    return (
        <Container style={{maxWidth: 900}}>
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom textAlign='center'>
                    SurfEmb
                </Typography>
                <Typography textAlign='center' fontSize={18}>
                    Dense and Continuous Correspondence Distributions <br/>
                    for Object Pose Estimation with Learnt Surface Embeddings
                </Typography>
            </Box>
            <Section>Abstract</Section>
            <p>
                We present an approach to learn dense, continuous 2D-3D correspondence distributions over the surface
                of objects from data with no prior knowledge of visual ambiguities like symmetry. We also present a
                new method for 6D pose estimation of rigid objects using the learnt distributions to sample,
                score and refine pose hypotheses.
                The correspondence distributions are learnt with a contrastive loss, represented in object-specific
                latent spaces by an encoder-decoder query model and a small fully connected key model.
                Our method is unsupervised with respect to visual ambiguities, yet we show that the query- and key
                models learn to represent accurate multi-modal surface distributions.
                Our pose estimation method improves the state-of-the-art significantly on the comprehensive BOP
                Challenge, trained purely on synthetic data, even compared with methods trained on real data.
            </p>
            <Section>Estimated Correspondence Distributions</Section>
            <p>
                Hover over the input image (left) or query image (middle) to see the estimated correspondence
                distribution.
                Drag the keys (right) to rotate them, or drag the slider to interpolate between keys'
                object coordinates and UMAP projection.
            </p>
            <p>
                Interesting examples include discrete rotational symmetry:
                <ExampleLink dataset="tless" obj="2"/>,
                <ExampleLink dataset="tless" obj="27"/>,
                <ExampleLink dataset="tless" obj="23"/>,
                <ExampleLink dataset="itodd" obj="7"/>,
                <span> </span>full rotational symmetry:
                <ExampleLink dataset="tless" obj="14"/>,
                <ExampleLink dataset="tless" obj="15"/>,
                <ExampleLink dataset="tless" obj="17"/>,
                <span> </span>and no symmetry:
                <ExampleLink dataset="tless" obj="7"/>,
                <ExampleLink dataset="tless" obj="25"/>,
                <ExampleLink dataset="lmo" obj="8"/>,
                <ExampleLink dataset="tudl" obj="1"/>,
                <ExampleLink dataset="icbin" obj="1"/>,
                <ExampleLink dataset="hb" obj="1"/>,
                <ExampleLink dataset="ycbv" obj="1"/>.
            </p>
            <Box sx={{width: '100%', marginBottom: 2}}>
                <Box>
                    <Tabs variant='scrollable' scrollButtons allowScrollButtonsMobile value={datasetIdx}
                          onChange={(event, newValue) => {
                              setDatasetIdx(newValue);
                              console.log(newValue)
                          }}>
                        {datasets.map((dataset, i) =>
                            <Tab key={i} label={dataset}/>
                        )}
                    </Tabs>
                    <ObjectTabs objIds={objIds[datasetIdx]} objIdx={objIdx} setObjIdx={setObjIdx}/>
                </Box>
            </Box>
            <Box>
                <div style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center',
                    flexWrap: 'wrap', gap: 20, userSelect: 'none'
                }}>
                    <DistributionViewer embDim={embDim} urlRoot={objUrlRoot}/>
                    <KeyViewer key={2} urlRoot={objUrlRoot}/>
                </div>
            </Box>
            <p>
                The UMAP projection of keys shows the key manifold and primarily
                provides insight to constant ambiguities, like global symmetry.
                A query can also represent view-dependent ambiguities which is best seen by exploring the distributions.
            </p>
            <p>
                Examples are chosen randomly for each object in the seven BOP Challenge datasets.
                Models are trained purely on synthetic images and shown on real images
                except for ITODD and HB, shown on synthetic images, because ground truth poses are not
                publicly available on the real images.
            </p>
            <p>
                Distributions may appear worse than they are because of poor ground truth poses:
                <ExampleLink dataset="lmo" obj="1"/> (see the distributions near the edges), or poor meshes:
                <ExampleLink dataset="tudl" obj="1"/>.
            </p>
            <Section>Pose Estimation</Section>
            <p> We use the distributions to sample, score and refine pose hypotheses.
                Our pose estimation method is trained and evaluated on the seven BOP Challenge datasets:</p>
            <PoseTable/>
            <p>
                Synth: Method is trained purely on synthetic images.
                Note that only T-LESS, TUD-L and YCBV provide real images for training.
                * Methods do not use the available training data.
            </p>
            <p>&nbsp;</p>
        </Container>
    );
}