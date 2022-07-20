import React, { useRef, useLayoutEffect } from 'react'
import { curveNatural, line, axisBottom, axisLeft, select, extent, scaleTime, scaleLinear } from 'd3'

import { Translate } from './Translate'
import { Mouse } from './Mouse'
import { Tooltip } from './Tooltip'

export const SimpleGraphic = ({ data }) => {
    const viewBoxWidth = 600
    const viewBoxHeight = 400
    const paddingX = 6
    const paddingY = 4
    const bottomAxisHeight = 30
    const leftAxisWidth = 50
    const bodyHeight = viewBoxHeight - bottomAxisHeight - 2 * paddingY
    const bodyWidth = viewBoxWidth - leftAxisWidth - 2 * paddingX
    const leftAxis = {
        pos: {
            x: paddingX,
            y: paddingY,
        },
        size: {
            width: leftAxisWidth,
            height: bodyHeight,
        }
    }
    const bottomAxis = {
        pos: {
            x: paddingX + leftAxisWidth,
            y: paddingY + bodyHeight,
        },
        size: {
            width: bodyWidth,
            height: bottomAxisHeight,
        }
    }
    const body = {
        pos: {
            x: leftAxis.pos.x + leftAxisWidth,
            y: paddingY,
        },
        size: {
            width: bodyWidth,
            height: bodyHeight,
        }
    }

    const xExtent = extent(data, d => d.x)
    const yExtent = extent(data, d => d.y)
    const xScale = scaleLinear().domain(xExtent).range([0, body.size.width])
    const yScale = scaleLinear().domain(yExtent).range([body.size.height, 0])

    const linePath = line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(curveNatural)(data)

    const handleClick = (pt) => {
        console.log(pt)
    }

    const mapToDataPoint = (mouse) => {
        const closest = data.reduce(
            (result, datum, idx) => {
                const thisDistance = Math.abs(mouse.x - xScale(datum.x))
                if (thisDistance < result.distance) {
                    return {
                        distance: thisDistance,
                        index: idx,
                    }
                }
                
                return result
            },
            { distance: Infinity, index: -1 }
        )
    
        return data[closest.index]
    }

    return (
        <svg width="300" height="200" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            <Translate {...body.pos}>
                <linearGradient id="linear-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(89, 188, 142, 0.3)"></stop>
                    <stop offset="100%" stopColor="rgba(253, 238, 249, 0.3)"></stop>
                </linearGradient>
                <path d={linePath + ` L${body.size.width},${body.size.height},0,${body.size.height}Z`} fill="url(#linear-gradient)"/>
                <path d={linePath} stroke="#59bc8e" fill="none" strokeWidth={4} />

                <Mouse {...body.size} onClick={handleClick} toDataPoint={mapToDataPoint}>
                    {pt => <Tooltip point={pt} xScale={xScale} yScale={yScale} {...body.size} />}
                </Mouse>
            </Translate>
            {/* <Translate {...leftAxis.pos}>
                <LeftAxis scale={yScale} {...leftAxis.size} />
            </Translate>
            <Translate {...bottomAxis.pos}>
                <BottomAxis scale={xScale} {...bottomAxis.size} />
            </Translate> */}
        </svg>
    )
}

const LeftAxis = ({ scale, width }) => {
    const ref = useRef(null)
    useLayoutEffect(() => {
        const [start, end] = extent(scale.range())
        if (start == null || end == null) {
            return
        }
        const pxPerTick = 60
        const tickCount = Math.ceil((end - start) / pxPerTick)
        const axisGenerator = axisLeft(scale)
        axisGenerator.ticks(tickCount)

        const host = select(ref.current)
        host.select('g').remove()
        const group = host.append('g')
        group.attr('transform', `translate(${width}, 0)`)
        group.call(axisGenerator)
    }, [scale, width])

    return <g ref={ref} />
}

const BottomAxis = ({ scale, width }) => {
    const ref = useRef(null)
    useLayoutEffect(() => {
        const host = select(ref.current)
        host.select('g').remove()
        const axisGenerator = axisBottom(scale)
        const [start, end] = extent(scale.range())
        if (start == null || end == null) {
            return
        }
        const pxPerTick = 80
        const tickCount = Math.ceil((end - start) / pxPerTick)
        axisGenerator.ticks(tickCount)
    
        const group = host.append('g')
        group.call(axisGenerator)
    }, [scale, width])
  
    return <g ref={ref} />
}