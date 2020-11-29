

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNewList, updateNewListPositions } from '../actions/rankList';
import { Item } from '../components/Item';

let dataPositions = [];
let _count = 0;
const timeTransformRation = 0.1; // 0.2s/Item
let heightItem = 52;

function RankListPage() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.rankList.list);
    const positions = useSelector(state => state.rankList.listPositions);

    const [data, setData] = useState(list);

    useEffect(() => {

        dataPositions = getPosition();

        // getPosition();
        const timer =()=>{
            setInterval(sortUsers, 3000)
        }
        // test()
        timer();
        return () => clearInterval(timer);
    }, []);

    const getPosition = () => {
        const newPoitions = list.map(user => {
            let element = document.getElementById(user.id);
            return element.offsetTop
        })
        // const action = updateNewListPositions([...newPoitions]);
        // dispatch(action);
        // console.log(positions)
        return newPoitions;

    }


    const sortUsers = () => {
        _count = _count + 1;
        // const dataPositions = getPosition();
        console.log('dataPositions', dataPositions);

        // debugger;
        const newData = [...list];
        // const randomCountUsers = newData.map((user=>{
        //     user.count = user.count + Math.floor(Math.random() * 100)
        //     return user
        // })) 
        newData.forEach((element, index) => {
            const start = element.count;
            const end = element.count + Math.floor(Math.random() * 100)
            // const end = randomCountUsers[index].count;
            animateValue(start, end, 5000, (newCount) => {
                element.count = newCount;
                const action = updateNewList([...newData]);
                dispatch(action);
            })
        });

        newData.sort((a, b) => b.count - a.count);


        console.log('New List',  newData);
        console.log('Old List', list);


        // Sau khi xap sep list moi la newData
        newData.forEach((data, indexNew) => {
            const {id} = data;

            const topOld = dataPositions[findIndexById(list, id)];
            const topNew = dataPositions[indexNew];

            console.log('TOP CHANGE', topOld, topNew);

            let element = document.getElementById(data.id);            

            // const element = document.getElementById(id);

            // debugger;
            // console.log(top2-top);
            // const y= (index - data.id)*52
            transformItem(data.id, element, {topNew, topOld}, animationTransform);
        })

        const action = updateNewListPositions(newData);
        dispatch(action);
        setData([...data]);

        // if (_count < 1) {
        //     const action = updateNewListPositions(newData);
        //     dispatch(action);
        //     setData([...data]);
        // }
        
        // debugger

    }

    function animationTransform(element, offset) {
        element.style.transform = 'translateY(' + offset + 'px)';
    }

    function findIndexById(list, id){
        let indexOld = null;
        list.forEach((item, index) => {
            if(item.id === id) indexOld = index;
        })
        return indexOld;
    }

    const transformItem = (id, element, {topNew, topOld}, animationTransform) => {
        const KC = topNew - topOld;
        let start;

        function step(timestamp) {
            if (start === undefined)
                start = timestamp;
            
            const elapsed = timestamp - start;

            console.log('topNew', topNew);
            console.log('topOld', topOld);

            console.log('KC', KC);

            let offset;

            let x;

            if (topNew > topOld) {
                offset = Math.min(timeTransformRation * elapsed, topNew - topOld);
                x = KC;
                element.style.transform = 'translateY(' + offset + 'px)';

            } else {
                const x1 = timeTransformRation * elapsed;
                const x2 = -1 * KC;
                x = -1 * KC;
                console.log('X1, X2', x1, x2);
                offset = Math.min(timeTransformRation * elapsed, topOld -  topNew);
                element.style.transform = 'translateY(-' + offset + 'px)';
                console.log('offset - am', offset, KC);
            }
            // animationTransform(element, offset);
            if (elapsed < ( x / timeTransformRation)) { // Stop the animation after 2 seconds
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    const _transformItem = (id, element, {topNew, topOld}, animationTransform) => {
        // const element = document.getElementById(id);
        let start;

        function step(timestamp) {
            if (start === undefined)
                start = timestamp;
            const elapsed = timestamp - start;
            const khCach = topNew - topOld;
            let newPx;
            if (topNew > topOld) {
                newPx = Math.min(0.1 * elapsed, khCach);
                // element.style.zIndex = 2;
                newPx += 5;
                if (khCach <= newPx) {
                    // element.style.transform = 'translateY(' + khCach + 'px)';
                    return;
                }
            } else {
                newPx = Math.max(-0.1 * elapsed, khCach);
                // element.style.zIndex = 0;
                newPx -= 5;
                if (khCach >= newPx) {
                    // element.style.transform = 'translateY(' + khCach + 'px)';
                    return;
                }
            }
            animationTransform(element, newPx);


            // `Math.min()` is used here to make sure that the element stops at exactly 200px.
            // element.style.transform = 'translateY(' + newPx + 'px)';


            // element.style.transform = 'translate(' + Math.min(0.1 * elapsed, left) + 'px, ' + Math.min(0.1 * elapsed, top) + 'px)';
            // element.style.transform = 'transform 2000ms cubic-bezier(0, 0, 1, 1) 1000ms, opacity 2000ms cubic-bezier(0, 0, 1, 1) 1000ms';

            // element.style.offsetTop ='20px';
            // element.style.offsetLeft ='20px';

            if (elapsed < 3000) { // Stop the animation after 2 seconds
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
    function animateValue(start, end, duration, callback) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const numberRun = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
            callback(numberRun);
        }
        window.requestAnimationFrame(step);
    }
    // console.log(positions);
    return (
        <div className="flex flex-col items-center  mt-8">
            <header className="">
                <h1 id="ahihi">Bảng xếp hạng</h1>
            </header>
            <ul className="w-2/5 content-center relative">
                {
                    data.map((item) =>
                        <Item key={item.id} item={item} />
                    )
                }
            </ul>
        </div>
    );
}

export default RankListPage;
