import { db } from './components/Data';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
const Login = (props) => {
    const { setIsLogin } = props;
    const usersCollectionRef = collection(db, "account");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);
    const [valid, setValid] = useState({
        username: false,
        password: false
    });
    useEffect(() => {
        const getUsers = async () => {
            const tempDb = await getDocs(usersCollectionRef);
            const mainDb = tempDb.docs.map(doc => doc.data());
            setData(mainDb);

        }
        getUsers();
        //eslint-disable-next-line
    }, []);

    const handleValidate = () => {
        const tempValid = {
            username: valid.username,
            password: valid.password
        }
        if (username.length === 0) {
            tempValid.username = true;
        }
        else {
            tempValid.username = false;

        }
        if (password.length === 0) {
            tempValid.password = true;
        }
        else {
            tempValid.password = false;

        }
        setValid(tempValid);
    }
    const handleSubmit = () => {
        handleValidate();
        if (username !== "" && password !== "") {
            const temp = data.filter(s => s.password === password && s.username.toLowerCase() === username.toLowerCase());
            console.log(temp.length);
            if (temp.length === 1) {
                setIsLogin(true);
                document.cookie = "name=" + temp[0].username;
            }
            else {
                alert("Tài khoản hoặc mật khẩu không chính xác!!!");
                setPassword("");
            }
        }

    }
    return (
        <div className="container d-flex justify-content-center " height="400px">
            <div className="card w-50 mt-5">
                <div className="card-header text-center">
                    <div className="h3">Đăng nhập</div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <input className={"form-control m-2 " + (valid.username ? "is-invalid" : "")} type="text" placeholder="Nhập tài khoản..." value={username} onChange={(e) => { setUsername(e.target.value) }} />
                        <div className="ml-3 invalid-feedback">
                            Vui lòng nhập tài khoản!
                        </div>
                    </div>
                    <div className='from-group'>
                        <input className={"form-control m-2 " + (valid.password ? "is-invalid" : "")} type="password" placeholder="Nhập mật khẩu..." value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <div className="ml-3 invalid-feedback">
                            Vui lòng nhập mật khẩu!
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <div className="btn btn-danger" onClick={() => { handleSubmit() }}>Đăng nhập</div>
                </div>
            </div>
        </div>
    )
}
export default Login;