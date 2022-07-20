import React from 'react'
import { Translate } from './Translate'

import './tooltip.css'

export const Tooltip = ({ point, xScale, yScale, width, height }) => {
    if (!point) {
        return null
    }

    const screenX = xScale(point.x)
    const screenY = yScale(point.y)
    const time = point.x.toFixed(3)
    const value = point.y.toFixed(3)
    const tipContent = (
        <>
            <div>
                <span className={''}>Time</span>: {time}
            </div>
            <div>
                <span className={''}>Value</span>: {value}
            </div>
        </>
    )

    const tipOverlay = {
        size: {
            width,
            height
        },
        pos: {
            x: 0,
            y: 0
        }
    }
    return (
        <g pointerEvents="none">
            <circle cx={screenX} cy={screenY} r={8} fill="#59bc8e" />
            <Translate {...tipOverlay.pos}>
                <foreignObject {...tipOverlay.size}>
                    <div className="tooltipOverlay">
                        <div className="tooltip" style={{ transform: `translate(calc(${screenX}px - 50%),calc(${screenY}px - 100% - 20px)` }}>
                            {tipContent}
                        </div>
                    </div>
                </foreignObject>
            </Translate>
        </g>
    )
}