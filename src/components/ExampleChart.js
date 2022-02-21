// import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
const ExampleChart = (props) => {
    const { children } = props;
    // const [opacity, setOpacity] = useState({
    //     uv: 1,
    //     pv: 1,
    // })
    // const handleMouseEnter = (o) => {
    //     const { dataKey } = o;
    //     const { opacityTemp } = opacity;
    //     setOpacity({ ...opacityTemp, [dataKey]: 0.5 });
    // };

    // const handleMouseLeave = (o) => {
    //     const { dataKey } = o;
    //     const { opacityTemp } = opacity;
    //     setOpacity({ ...opacityTemp, [dataKey]: 1 });
    // };

    return (
        <div >

            <div className='row m-0' style={{ "maxWidth": 2400 }}>
                {/* <div className='col-6'>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            width={600}
                            height={400}
                            data={children}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 8" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                            <Line type="monotone" name='Độ ẩm' dataKey="doam" strokeOpacity={opacity.pv} stroke="rgba(54, 162, 235, 1)" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="nhietdo" name="Nhiệt độ" strokeOpacity={opacity.uv} stroke="rgba(255,99,132,1)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div> */}
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                            width={500}
                            height={400}
                            data={children}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="ap" name='Áp' stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className='w-100 text-center h5' width="100%">
                        <span>
                            Biểu đồ áp
                        </span>
                    </div>

                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                            width={500}
                            height={400}
                            data={children}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="dong" name='Dòng' stroke="#abba00" fill="rgb(242, 255, 94)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className='w-100 text-center h5' width="100%">
                        <span>
                            Biểu đồ dòng
                        </span>
                    </div>

                </div>
                <div className=' col-12'>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                            width={500}
                            height={400}
                            data={children}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="congsuat" name='Công suất' stroke="#99004a" fill="rgb(255, 94, 172)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className='w-100 text-center h5' width="100%">
                        <span>
                            Biểu đồ công suất
                        </span>
                    </div>

                </div>

            </div>



        </div >
    )
}
export default ExampleChart;