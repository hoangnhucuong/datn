import { useEffect, useState, useRef } from "react";
import on from '../img/fan-gif-on.gif';
import off from '../img/fan-gif-off.png';
import light_off from '../img/light-off.png';
import light_on from '../img/light-on.gif';
import Paho from 'paho-mqtt';
import React from "react";

// function useInterval(callback, delay) {
//     const savedCallback = useRef();

//     // Remember the latest callback.
//     useEffect(() => {
//         savedCallback.current = callback;
//     }, [callback]);

//     // Set up the interval.
//     useEffect(() => {
//         function tick() {
//             savedCallback.current();
//         }
//         if (delay !== null) {
//             let id = setInterval(tick, delay);
//             return () => clearInterval(id);
//         }
//     }, [delay]);
// }

const Action = (props) => {
    const { children } = props;
    const publish = (topic, data) => {
        var message = new Paho.Message(data);
        message.destinationName = topic;
        children.send(message);
    }
    const [fan, setFan] = useState("ON");
    const [light, setLight] = useState("ON");
    const handleFan = () => {
        if (fan === "OFF") {
            var msg = "1";
            publish("Dieu_khien", msg);
        }
        else {
            var msg = "2";
            publish("Dieu_khien", msg);
        }
    }
    const handleLight = () => {
        if (light === "OFF") {
            var msg = "3";
            publish("Dieu_khien", msg);

        }
        else {
            var msg = "4";
            publish("Dieu_khien", msg);
        }
    }
    // const handleSend = () => {
    //     var msg = (light === "OFF" ? "1" : "0") + "" + (fan === "OFF" ? "1" : "0");
    //     publish("Dieu_khien", msg);
    //     console.log(msg);
    // }

    // useInterval(() => {
    //     handleSend();
    // }, 1000);

    const onMessageArrived = (message) => {
        const temp = message.payloadString.toString().trim().replace("ND:", "").trim().replace("DA:", "").replace("AP:", "").replace("D:", "").replace("TT1:", "").replace("TT2:", "").split(" ");
        if (temp[4] !== undefined && temp[5] !== undefined) {
            // if(temp[4]===1)
            // {
            //     console.log(true);
            // }
            console.log(temp[4] === '0');
            if (temp[4] === '1') {
                setFan("OFF");
            }
            if (temp[4] === '0') {
                setFan("ON");
            }
            if (temp[5] === '1') {
                setLight("OFF")
            }
            if (temp[5] === '0') {
                setLight("ON");
            }
            // setFan(Number(temp[4]) === '1' ? "OFF" : "ON");
            // setLight(Number(temp[5]) === '1' ? "OFF" : "ON");
        }
    }
    const onConnectionLost = (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log(responseObject.errorMessage);
        }
    }



    children.onConnectionLost = onConnectionLost;
    children.onMessageArrived = onMessageArrived;




    return (
        <div className="container-lg container-xl container-fluid">
            <div className="row m-0 bg-dark ">
                <div className="h2 text-light p-1">Điều khiển thiết bị</div>
            </div>

            <div className="row m-0">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="text-center">
                        {
                            (fan === "OFF" ? (<img src={on} alt="" />) : (<img src={off} alt="" />))
                        }


                    </div>
                    <div className="text-center w-100">
                        <div className="h3">Trạng thái : {fan === "OFF" ? "Đang hoạt động" : "Đang tắt"}</div>
                    </div>
                    <div className="text-center w-100">
                        <button className={fan === "OFF" ? "btn btn-danger" : "btn btn-success"} onClick={handleFan}>{fan}</button>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="text-center">
                        {
                            (light === "OFF" ? (<img src={light_on} width="65%" alt="" />) : (<img src={light_off} width="65%" alt="" />))
                        }


                    </div>
                    <div className="text-center w-100">
                        <div className="h3">Trạng thái : {light === "OFF" ? "Đang hoạt động" : "Đang tắt"}</div>
                    </div>
                    <div className="text-center w-100">
                        <button className={light === "OFF" ? "btn btn-danger" : "btn btn-success"} onClick={handleLight}>{light}</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Action;