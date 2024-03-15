import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const handleMouseMove = (e) => {
    const bisect = d3.bisector((d) => d.date).left,
        x0 = getX.invert(d3.pointer(e, this)[0]),
        index = bisect(data, x0, 1);
    setActiveIndex(index);
};

const handleMouseLeave = () => {
    setActiveIndex(null);
};

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([height, 0]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;