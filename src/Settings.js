import * as React from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <h2 className="m-2">Úvodné nastavenia</h2>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="kLabel0">Prvé K</InputLabel>
          <Select
            labelId="kLabel0"
            id="k0"
            name="0"
            value={this.props.ks[0]}
            label="Prvé K"
            onChange={this.props.changeK}
          >
            {[...Array(20)].map((x, i) => {
              if (i % 2 === 1)
                return <MenuItem value={i}>{i}</MenuItem>
              else return null;
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="kLabel1">Druhé K</InputLabel>
          <Select
            labelId="kLabel1"
            id="k1"
            name="1"
            value={this.props.ks[1]}
            label="Druhé K"
            onChange={this.props.changeK}
          >
            {[...Array(20)].map((x, i) => {
              if (i % 2 === 1)
                return <MenuItem value={i}>{i}</MenuItem>
              else return null;
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="kLabel0">Tretie K</InputLabel>
          <Select
            labelId="kLabel2"
            id="k2"
            name="2"
            value={this.props.ks[2]}
            label="Tretie K"
            onChange={this.props.changeK}
          >
            {[...Array(20)].map((x, i) => {
              if (i % 2 === 1)
                return <MenuItem value={i}>{i}</MenuItem>
              else return null;
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="kLabel3">Štvrté K</InputLabel>
          <Select
            labelId="kLabel3"
            id="k3"
            name="3"
            value={this.props.ks[3]}
            label="Tretie K"
            onChange={this.props.changeK}
          >
            {[...Array(20)].map((x, i) => {
              if (i % 2 === 1)
                return <MenuItem value={i}>{i}</MenuItem>
              else return null;
            })}
          </Select>
        </FormControl>
        <Box className="box" sx={{ width: 300 }}>
          <Typography className='title'>Počet bodov</Typography>
          <Slider
            aria-label="Počet bodov"
            name="pointsCount"
            onChange={this.props.handleSlider}
            value={this.props.pointsCount}
            valueLabelDisplay="on"
            size="small"
            className="slider"
            step={1000}
            marks
            min={1000}
            max={20000}
          />
        </Box>
        <Button onClick={this.props.startClassification} className="ml-5 mb-5 button" variant="outlined">Začať algoritmus</Button>
      </div >
    );
  }
}