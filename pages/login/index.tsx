import { NextPage } from "next";

const Login: NextPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-green-700">
            <div className="flex w-full">
                <div className="w-1/2 p-4">

                </div>
                <div className="flex justify-center items-center w-1/2 p-4 h-screen">
                    <div className="flex flex-col bg-black p-4 gap-4 rounded-2xl">
                        <input placeholder="Login" className="p-2 border-r-gray-900 border-solid rounded-lg" type="text" name="" id="" />
                        <input placeholder="Password" className="p-2 border-r-gray-900 border-solid rounded-lg" type="text" name="" id="" />
                        <button className="bg-[#00b5cc] text-white rounded-lg h-10 hover:bg-[#17cbe2]" type="submit">Entrar</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;