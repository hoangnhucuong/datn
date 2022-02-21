import { useState } from "react";
import App from "./App";
import Action from "./components/Action";
import Paho from 'paho-mqtt';
import Login from "./Login";

const makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
const doFail = (e) => {
    console.log(e);
}
const onConnect = () => //sự kiên kết nối thành công
{
    clientTemp.subscribe("Test");
}
var options = {
    useSSL: true,
    userName: "HoangNhuCuong",
    password: "Cuong12345",
    onSuccess: onConnect,
    onFailure: doFail
}
var clientTemp = new Paho.Client("91f3d37a8fd64ec8be753f1b3b279991.s2.eu.hivemq.cloud", 8884, makeid());
console.log("Connect to broker.hivemq.com:8000");
// connect the client
clientTemp.connect(options);

const Main = () => {
    const [page, setPage] = useState("App");
    const [isLogin, setIsLogin] = useState(false);
    return (
        <div>
            {!isLogin ? <Login setIsLogin={setIsLogin} /> :
                <div>
                    <header>
                        {/* <!-- Quản lý năng lượng, Quản lý nhiệt độ, Theo dõi thời gian hoạt động, Thống kê tuần suất hoạt động --> */}
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className='h2 col-2 text-white'>HNC</div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll"
                                aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style={{}}>
                                    <li className="nav-item active">
                                        <div className="nav-link" ><button className={"bg-transparent border-0 h6   " + (page === "App" ? "text-light" : "text-secondary")} onClick={() => setPage("App")}>Thông số kỹ thuật</button>  <span className="sr-only">(current)</span></div>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link" ><button className={"bg-transparent border-0 h6 " + (page === "Action" ? "text-light" : "text-secondary")} onClick={() => setPage("Action")}>Điều khiển thiết bị</button> </div>
                                    </li>
                                </ul>
                                <form className="d-flex">
                                    <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                        </nav>
                    </header>
                    <div className="container">
                        {
                            page === "App" && <App clientTemp={clientTemp} />
                        }
                        {
                            page === "Action" && <Action>{clientTemp}</Action>
                        }
                    </div>
                </div>
            }
        </div>

    )
}
export default Main;