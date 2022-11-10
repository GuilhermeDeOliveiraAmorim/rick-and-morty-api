import { NextPage } from "next";
import { LinkedIn, GitHub, WhatsApp } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { api } from "../api/api_url";
import { useRouter } from "next/router";
import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

const Signin: NextPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post("/users", {
        username: username,
        password: password,
      });

      const userNookie = response.data.id;

      globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, response.data.refreshToken);

      globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, response.data.refreshToken);

      nookies.set(null, ACCESS_TOKEN_KEY, userNookie, {
        maxAge: ONE_HOUR,
        path: "/",
      });

      router.push(`/login`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex md:justify-center lg:justify-center items-center h-screen bg-green-700">
      <div className="md:flex lg:flex w-full">
        <div className="md:w-1/2 lg:w-1/2 bg-cover-login bg-no-repeat bg-center bg-cover">
          <div className="md:w-full lg:w-full sm:h-screen lg:h-screen flex flex-col justify-between items-center bg-opacity-50 bg-black">
            <div className="flex-2 flex justify-center items-center h-full text-5xl text-white">
              Rick & Morty Favorites
            </div>
            <footer className="p-4 flex justify-between text-left min-w-full text-white">
              <span>Guilherme Amorim</span>
              <div className="flex flex-row gap-2">
                <a
                  href="https://www.linkedin.com/in/guideoliveiraamorim/"
                  target="_blank"
                >
                  <LinkedIn />
                </a>
                <a
                  href="https://github.com/GuilhermeDeOliveiraAmorim"
                  target="_blank"
                >
                  <GitHub />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=5579991145680&text=Ol%C3%A1!%20Cheguei%20aqui%20atrav%C3%A9s%20do%20seu%20portf%C3%B3lio!"
                  target="_blank"
                >
                  <WhatsApp />
                </a>
              </div>
            </footer>
          </div>
        </div>
        <div className="sm:flex-col lg:flex-col sm:flex sm:justify-center sm:items-center sm:w-1/2 sm:h-screen lg:flex lg:justify-center lg:items-center lg:w-1/2 lg:h-screen p-4 bg-white">
          <h1 className="p-4">Register</h1>
          <form
            className="flex flex-col bg-green-900 shadow-2xl p-4 gap-4 rounded-2xl"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Login"
              className="p-2 border-r-gray-900 border-solid rounded-lg"
              type="text"
              onChange={event => setUsername(event.target.value)} value={username}
            />
            <input
              placeholder="Password"
              className="p-2 border-r-gray-900 border-solid rounded-lg"
              type="password"
              onChange={event => setPassword(event.target.value)} value={password}
            />
            <button
              className="bg-[#00b5cc] text-white rounded-lg h-10 hover:bg-[#17cbe2]"
              type="submit"
            >
              Signin
            </button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Signin;
