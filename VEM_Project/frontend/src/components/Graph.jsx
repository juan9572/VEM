import * as React from 'react';
import { useEffect, useState } from 'react';
import { Chart, Series } from 'devextreme-react/chart';

function Graph(data){
    return (
        <Chart id="chart" title={data.evento.title} dataSource={data.evento.estadistica}>
            <Series
                valueField="cantidad"
                argumentField="mes"
                name= "Cantidad de clicks"
                type="bar"
                color="#2c3bbf" />
        </Chart>
    );
}
export default Graph;
