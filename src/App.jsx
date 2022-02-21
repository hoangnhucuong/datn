
import './App.css';
import { useEffect, useState } from 'react';
import outData from './data.json';
import ReactSpeedometer from "react-d3-speedometer";
import ExampleChart from './components/ExampleChart';

const App = (props) => {
  const [data, setData] = useState(outData);
  const { clientTemp } = props;
  const [valid, SetValid] = useState({
    "nhietDo": false,
    "dong": false
  })
  const onMessageArrived = (message) => {
    const temp = message.payloadString.toString().trim().replace("ND:", "").trim().replace("DA:", "").replace("AP:", "").replace("D:", "").replace("TT1:", "").replace("TT2:", "").split(" ");
    if (temp[0] !== undefined && temp[1] !== undefined && temp[2] !== undefined && temp[3] !== undefined) {
      const obj = {
        "date": new Date().toTimeString().substring(0, 8),
        "dong": temp[3] / 100,
        "ap": temp[2],
        "doam": temp[1],
        "nhietdo": temp[0],
        "congsuat": (temp[3] / 100) * temp[2]
      }
      setData([...data, obj]);
    }
  }
  const onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log(responseObject.errorMessage);
    }
  }





  // useEffect(() => {
  //   const publish = (topic, data) => {
  //     var message = new Paho.Message(data);
  //     message.destinationName = topic;
  //     clientTemp.send(message);

  //   }

  //   // setInterval(() => {
  //   //   publish("Test", "3");
  //   // }, 3000);
  // }, [])
  useEffect(() => {
    if (data.length > 10) {
      const temp = [];
      for (let index = data.length - 10; index < data.length; index++) {
        temp.push(data[index]);
      }
      setData(temp);
    }

  }, [data])


  clientTemp.onConnectionLost = onConnectionLost;
  clientTemp.onMessageArrived = onMessageArrived;

  useEffect(() => {
    const temp = {
      "nhietDo": valid.nhietDo,
      "dong": valid.dong
    }
    if (data[data.length - 1].nhietdo >= 30) {
      temp.nhietDo = true;
    }
    else {
      temp.nhietDo = false;
    }
    if (data[data.length - 1].dong >= 3.0) {
      temp.dong = true;
    }
    else {
      temp.dong = false;
    }
    SetValid(temp);
  }, [data])
  //called when the client loses its connection
  return (
    <div className="App">
      <div id="content">
        <div className="row m-0 bg-dark">
          <h2 className="col-xl-6 col-lg-6 col-md-12 col-sm-12 bg-dark text-white ">Quản lý thiết bị</h2>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 row ml-0 mb-sm-2 mb-md-2 ">
            <label htmlFor='text' className="h4 col-6 text-white">Máy móc</label>
            <select name="maymoc" id="maymoc" className=" col-6 form-control">
              <option value="máy 1">Máy 1</option>
              <option value="máy 2">Máy 2</option>
              <option value="máy 3">Máy 3</option>
              <option value="máy 4">Máy 4</option>
              <option value="máy 5">Máy 5</option>
              <option value="máy 6">Máy 6</option>

            </select>
          </div>
        </div>
        <div className="container" data-spy="scroll">
          <div className='h2'>Thông số kỹ thuật</div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Thời gian</th>
                <th>Dòng</th>
                <th>Áp</th>
                <th>Công suất</th>
                <th>Độ ẩm</th>
                <th>Nhiệt độ</th>
              </tr>
            </thead>
            <tbody id="bodyTable">
              {
                data.length !== 0 &&
                (data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.date}</td>
                      <td>{item.dong}</td>
                      <td>{item.ap}</td>
                      <td>{item.congsuat}</td>
                      <td>{item.doam}</td>
                      <td>{item.nhietdo}</td>
                    </tr>
                  )
                }))
              }
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
        <hr />
        <div className='row m-0'>
          <div className='h2 p-2'>Biểu đồ</div>
        </div>
        <div className='row m-0'>

          <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
            {
              valid.nhietDo && <div className='text-warning h3'><span><i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i></span> Cảnh báo quá nhiệt!!!</div>
            }
            {
              valid.dong && <div className='text-warning h3'><span><i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i></span> Cảnh báo dòng quá cao!!!</div>
            }
            <ReactSpeedometer value={Number(data[data.length - 1].nhietdo)} currentValueText={"Nhiệt độ : " + data[data.length - 1].nhietdo} maxSegmentLabels={5} minValue={0} maxValue={100} startColor={"rgb(114, 245, 66)"} needleColor={"rbg(245, 236, 66)"} segments={100} endColor={"rgb(245, 66, 66)"} />
          </div>
          <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
            <ReactSpeedometer value={Number(data[data.length - 1].doam)} currentValueText={"Độ ẩm : " + data[data.length - 1].doam} maxSegmentLabels={5} minValue={0} maxValue={100} startColor={"rgb(66, 203, 245)"} needleColor={"rbg(66, 245, 69)"} segments={100} endColor={"rgb(245, 66, 66)"} />
          </div>
        </div>
        <div className='w-100 text-center h5 ' width="100%" style={{ "marginTop": "-100px" }}>
          <span>
            Thước đo nhiệt độ, độ ẩm
          </span>
        </div>
        <ExampleChart >{data}</ExampleChart>


      </div>
      <div>
      </div>
    </div >
  );
}

export default App;
