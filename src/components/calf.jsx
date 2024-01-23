
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Transformer, Text } from 'react-konva';
import useImage from 'use-image';
const getPosition = (x, y) => {
    // 返回计算后的位置  stage.width / 2 + x ，stage.height / 2 + y
    return {
        x: 480 / 2 + x,
        y: 360 / 2 + y,
    };
};
const backPosition = (x, y) => {
    return {
        x: x - 480 / 2,
        y: y - 360 / 2,
    }
}
const getRotation = (rotation) => {
    return {
        rotation: rotation - 90
    };
};
const backRotation = (rotation) => {
    let newRotation = rotation + 90;
    if (newRotation > 180) {
        newRotation = -180 + (newRotation - 180);
    }
    return { rotation: newRotation };
}
const CalfImage = ({ id = -1, position = { x: 0, y: 0 }, size = 1, isSelected = () => { }, onSelect = () => { }, onNewTransform = () => { }, onNewPosition = () => { }, onNewSize = () => { }, onNewRotation, heading }) => {
    const { x, y } = getPosition(position.x, position.y);
    const { rotation } = getRotation(heading);
    const shapeRef = useRef();

    const trRef = useRef();
    const [image] = useImage('calf-0.png');
    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    const handleDragEnd = (e) => {
        const absolutePosition = e.target.getAbsolutePosition();
        onNewPosition(id, backPosition(absolutePosition.x, absolutePosition.y));
    };
    const handleTransformEnd = (e) => {
        console.log(e.currentTarget.width())
        //这里缩放存在x，y，只取一个即可
        onNewTransform(id, {
            size: e.target.attrs.scaleX,
            rotation: backRotation(e.target.attrs.rotation).rotation
        })
        // onNewRotation(id, backRotation(e.target.attrs.rotation).rotation);
        // onNewSize(id, e.target.attrs.scaleX)
    };

    console.log(image)
    return <Fragment>
        <Image
            size={size}
            rotation={rotation}
            draggable={true}
            ref={shapeRef}
            onClick={() => onSelect(id)}
            image={image}
            x={x} y={y}
            offsetX={0} offsetY={0}
            onTransformEnd={handleTransformEnd}
            onDragEnd={handleDragEnd}
        />
        {isSelected && (
            <Transformer
                ref={trRef}
                flipEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
        )}
    </Fragment>;
};
export default CalfImage