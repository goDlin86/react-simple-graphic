import React from 'react'
import { curveNatural, line } from 'd3'

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
        },
    }
    const bottomAxis = {
        pos: {
            x: paddingX + leftAxisWidth,
            y: paddingY + bodyHeight,
        },
        size: {
            width: bodyWidth,
            height: bottomAxisHeight,
        },
    }
    const body = {
        pos: {
            x: leftAxis.pos.x + leftAxisWidth,
            y: paddingY,
        },
        size: {
            width: bodyWidth,
            height: bodyHeight,
        },
    }

    const stepX = bodyWidth / data.length
    const linePath = line().curve(curveNatural)(data.map((d, i) => [stepX * (i + 1), bodyHeight - d[1]]))

    return (
        <svg width="300" height="200" viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
            <Translate {...body.pos}>
                <linearGradient id="linear-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="rgba(89, 188, 142, 0.3)"></stop>
                    <stop offset="100%" stop-color="rgba(253, 238, 249, 0.3)"></stop>
                </linearGradient>
                <path d={linePath + ` L${bodyWidth},${bodyHeight},${stepX},${bodyHeight}Z`} fill="url(#linear-gradient)"/>
                <path d={linePath} stroke="#59bc8e" fill="none" strokeWidth={4} />
            </Translate>

        </svg>
    )
}

const Translate = ({ x=0, y=0, children }) => {
    if (!x && !y) return children
    return <g transform={`translate(${x},${y})`}>{children}</g>
}