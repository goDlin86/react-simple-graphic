import React, { useState } from 'react'

export const Mouse = ({ width, height, onClick, children, toDataPoint }) => {
    const [hoverPt, setHoverPt] = useState(undefined)

    const handleMouseMove = (e) => {
        const mouse = getMouse(e, width, height)
        const newPt = toDataPoint(mouse)

        if (!pointsEqual(hoverPt, newPt)) {
            setHoverPt(newPt)
        }
    }
    const handleMouseLeave = () => {
        setHoverPt(undefined)
    }
    const handleMouseUp = () => {
        onClick && hoverPt && onClick(hoverPt)
    }

    return (
        <>
            <rect
                width={width}
                height={height}
                pointerEvents="all"
                fill="none"
                stroke="none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
            />
            {children && children(hoverPt)}
        </>
    )
}

const getMouse = (e, width, height) => {
    const dims = e.currentTarget.getBoundingClientRect()
    const rawX = e.clientX - dims.left
    const rawY = e.clientY - dims.top
    const x = (rawX / dims.width) * width
    const y = (rawY / dims.height) * height
    return { x, y }
}

const pointsEqual = (p1, p2) => {
    return (!p1 && !p2) || (p1 && p2 && p1.x === p2.x && p1.y === p2.y)
}