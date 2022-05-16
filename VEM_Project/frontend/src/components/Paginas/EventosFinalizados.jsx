import React, { Component } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Imagen from '../../17010.jpg';
import Box from '@mui/material/Box';
import Card from '../Card';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { Room, Star } from "@material-ui/icons";


export default class EventosFinalizados extends Component {
  constructor(props) {
    super(props);

    this.state = { eventos: [] };
  }

  componentDidMount() {
    axios.get('/api/publicitarios/getFinalizados')
      .then(response => {
        this.setState({ eventos: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  eventList() {
    return this.state.eventos.map(currentevent => {
      return (<Grid item xs={3}><Card evento={currentevent} /></Grid>)
    })
  }

  render() {
    const settings = {
      cycleNavigation: false,
      swipe:false,
      indicators: false,
      navButtonsAlwaysInvisible:true,
  };
    return (
      <div>
        <Carousel
          className="MainCarousel"
          {...settings}
        >
          <Paper
            sx={{
              position: 'relative',
              backgroundColor: 'grey.800',
              color: '#ffffff',
              mb: 2,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${Imagen})`,
              height: 350
            }}
          >
            {<img style={{ display: 'none' }} src={Imagen} alt={"Error"} />}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.3)',
              }}
            />
          </Paper>
        </Carousel>
        <Grid container direction="column" alignItems="center" justifyContent="center">
          {this.eventList()}
        </Grid>
      </div>
    )
  }
}