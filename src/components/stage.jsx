
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Transformer, Text } from 'react-konva';
import useImage from 'use-image';
import CalfImage from './calf';
import Center from './center';
const originSpirteList = [{
    id: 0,
    name: "calf-1",
    visible: true,
    size: 1,
    x: -130,
    y: 0,
    heading: 0,
    costumeIndex: 0,
}, {
    id: 2,
    x: -30,
    y: 0,
    heading: 90,
    name: "calf-2",
    visible: true,
    size: 1,
    costumeIndex: 0,
}, {
    id: 3,
    x: 70,
    y: 0,
    heading: 180,
    name: "calf-3",
    visible: true,
    size: 1,
    costumeIndex: 0,
}, {
    id: 4,
    x: 170,
    y: 0,
    heading: -90,
    name: "calf-4",
    visible: true,
    size: 1,
    costumeIndex: 0,
}]
function StageViewer() {
    const [spirteList, setSpriteList] = useState([...originSpirteList])
    const [selectedId, selectShape] = React.useState(null);
    const [editTarget, setEditTarget] = useState(null)
    const onNewPosition = (id, { x, y }) => {
        const newSpirteList = spirteList.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    x,
                    y,
                };
            }
            return item;
        });
        setSpriteList(newSpirteList);
    }
    const onNewTransform = (id, { rotation, size }) => {
        const newSpirteList = spirteList.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    heading: rotation,
                    size,
                };
            }
            return item;
        });
        setSpriteList(newSpirteList);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stage style={{ width: '100%', display: 'flex', justifyContent: 'center' }} width={480} height={360} >
                <Layer>
                    {spirteList
                        .map((item, index) =>
                            <Text
                                fill={item.id === selectedId ? 'red' : 'black'}
                                text={'精灵:' + item.id + ' x:' + item.x.toFixed(2) + ' y:' + item.y.toFixed(2) + ' heading:' + item.heading.toFixed(2) + ' size:' + item.size}
                                offsetY={-index * 20} fontSize={20}></Text>
                        )}
                </Layer>
                <Layer >
                    {spirteList.map(item =>
                        <CalfImage
                            id={item.id} key={item.id}
                            heading={item.heading} position={item}
                            size={item.size}
                            isSelected={selectedId === item.id}
                            onNewTransform={onNewTransform}
                            onNewPosition={onNewPosition}
                            onSelect={(id) => {
                                selectShape(id)
                                // 将当前编辑的对象修改为当前选中的对象
                                for (let i = 0; i < spirteList.length; i++) {
                                    if (spirteList[i].id === id) {
                                        setEditTarget(spirteList[i])
                                    }
                                }
                            }} />
                    )}
                </Layer>
            </Stage>
            <Stage style={{ width: '100%', display: 'flex', justifyContent: 'center' }} width={480} height={360} >
                <Layer>
                    <Center editTarget={editTarget}></Center>
                </Layer>
            </Stage>
        </div>
    )
}
export default StageViewer;