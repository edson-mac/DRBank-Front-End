import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import { useProvider } from "../provider/provider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Header from '../components/Header';

const Login = () => {
    const { setToken, setUser } = useProvider();
    const [loginInfos, setLoginInfos] = useState({ name: '', cpf: '' })
    const [apiResponse, setApiResponse] = useState('')
    const navigate = useNavigate();


    const handleChange = (e) => {
        setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value })
    }

    const activateButton = () => {
        const { name, cpf } = loginInfos;
        if (name === '' || cpf === '') {
            return true;
        }
        if (name.length < 3) {
            return true;
        }
        if (cpf.length < 11) {
            return true;
        }
        if (!/^\d+$/.test(cpf) || !/[a-zA-Z]+/g.test(name)) {
            return true;
        }

        return false;
    }

    const sendLogin = async (e) => {
        e.preventDefault();
        const { name, cpf } = loginInfos;
        const body = {
            name,
            cpf
        }
        const response = await fetch('https://drbank-production.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const content = await response.json();
        if (!content.message.token) {
            setApiResponse(content.message);
        }

        if (content.message.token) {
            setToken(content.message.token);
            setUser(content.message.name);
            navigate('/home');
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
                <div className='flex flex-col mt-80 items-center'>
                <Header />
                <div className='Registerbox mt-4 shadow-xl rounded-3xl border-solid border-4
     border-green-400 bg-green-300 w-96 text-center content-center'>


                    <div className="Registerbox__title mt-4 text-4xl">Login</div>

                    <div className='Registerbox__input mt-4 flex flex-col'>
                        <label className='mr-1 text-lg'>Nome</label>
                        <Input name='name' type='text' onChange={handleChange} />
                    </div>

                    <div className='Registerbox__input mt-1 mb-5 flex flex-col'>
                        <label className='mr-3 text-lg'>CPF</label>
                        <Input name='cpf' type='number' onChange={handleChange} />
                    </div>

                    <div className="response mb-2 w-6/12 ml-auto mr-auto">
                        <p className='text-base bg-rose-200 rounded-lg'>{apiResponse}</p>
                    </div>

                    <div className='sendRegisterButton'>
                        <Button name="Entrar" onClick={sendLogin} disabled={activateButton} />
                    </div>

                    <div className="mt-2 mb-2 text-sm font-medium text-black dark:text-gray-300">
                        Não cadastrado? <button onClick={ () => navigate('/register')} className="text-blue-700 hover:underline dark:text-blue-500">Criar uma conta.</button>
                    </div>

                </div>
                </div>
            
        </motion.div >
        
    )
}

export default Login