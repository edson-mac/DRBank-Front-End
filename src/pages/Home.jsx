import React, { useEffect, useState } from 'react'
import { useProvider } from "../provider/provider";
import Input from '../components/input';
import Button from '../components/button';
import { motion } from "framer-motion"
import info from '../assets/info.svg';
import logout from '../assets/logout.svg';
import Header from '../components/Header';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';


const Home = () => {

  const { token, user, setToken } = useProvider();
  const [balance, setBalance] = useState(0);
  const [depositoValue, setDepositoValue] = useState('');
  const [transferInfo, setTransferInfo] = useState({ cpf: '', value: '' });


  const getSaldo = async () => {
    const response = await fetch('https://drbank-production.up.railway.app/account/saldo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      }
    })
    const content = await response.json();
    setBalance(content.saldo);
  }

  const deposit = async () => {
    const response = await fetch('https://drbank-production.up.railway.app/account/deposito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ deposito: depositoValue })
    })
    const content = await response.json();
    console.log(content);
    getSaldo();
    setDepositoValue('');
    Swal.fire(`${content.message}`);
  }

  const disableDepositButton = () => {
    if (Number(depositoValue) === 0) {
      return true;
    }
    if (Number(depositoValue) < 0) {
      return true;
    }
    return false;
  }

  const transferencia = async () => {
    const response = await fetch('https://drbank-production.up.railway.app/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({
        transferValue: transferInfo.value,
        destinatario: transferInfo.cpf
      })
    })
    const content = await response.json();
    console.log(content);
    getSaldo();
    setTransferInfo({ cpf: '', value: '' });
    Swal.fire(`${content.message}`);
  }

  const disableTransferButton = () => {
    if (Number(transferInfo.value) === 0) {
      return true;
    }
    if (Number(transferInfo.value) < 0) {
      return true;
    }
    if (transferInfo.cpf.length !== 11) {
      return true;
    }
    if (!/^\d+$/.test(transferInfo.cpf)) {
      return true;
    }
    if (transferInfo.cpf === '') {
      return true;
    }
    if (transferInfo.value === '') {
      return true;
    }
    if (Number(transferInfo.value) > balance) {
      return true;
    }
    return false;
  }

  const handleChange = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value })
  }

  const handleLogout = () => {
    setToken('');
  }





  useEffect(() => {
    getSaldo();
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <div>
        <div className='flex flex-col mt-12 lg:mt-44 items-center'>
          <Header />
          <div className='Registerbox mt-4 shadow-xl rounded-3xl border-solid border-4
     border-green-400 bg-green-300 w-96 text-center'>
            <div className='flex justify-end'>
              <img onClick={handleLogout} className="absolute carLogo w-8 mt-2" src={logout} alt="logoutSvg" />
            </div>
            <div className='flex justify-center'>
              <h2 className='mt-4 text-2xl'>Bem-vindo(a) {user}</h2>
            </div>


            <p className='mt-4 text-3xl'>Saldo: R$ {balance}</p>

            <div className='deposito mt-4 flex flex-col ml-auto mr-auto text-center rounded-xl border-2 bg-green-200 border-green-300 border-solid w-8/12'>
              <p className='mt-2 text-xl'>Realizar Dep??sito</p>
              <div className='mt-2'>
                <Input name='deposito' type='number' placeholder='Valor do dep??sito' value={depositoValue} onChange={(e) => setDepositoValue(e.target.value)} />
              </div>
              <div className='mb-2 mt-2'>
                <Button name="Depositar" disabled={disableDepositButton} onClick={() => deposit()} />
              </div>
            </div>

            <div className='mt-5 mb-5 transferencia flex flex-col ml-auto mr-auto text-center rounded-xl border-2 bg-green-200 border-green-300 border-solid w-8/12'>
              <div className='flex flex-raw gap-2 ml-auto mr-auto mt-3'>
                <p className='text-xl'>Realizar Transfer??ncia</p>
                <div className="group flex relative">
                  <img className="carLogo w-4" src={info} alt="infoLogo" />
                  <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/6 opacity-0 m-4 w-56 mx-auto">Por quest??es de seguran??a, o limite de uma transfer??ncia ?? de R$ 2000.</span>
                </div>

              </div>
              <div className='mt-3'>
                <Input name='cpf' type='number' placeholder='CPF do destinat??rio' value={transferInfo.cpf} onChange={(e) => handleChange(e)} />
              </div>
              <div className='mt-2'>
                <Input name='value' type='number' placeholder='Valor da transfer??ncia' value={transferInfo.value} onChange={(e) => handleChange(e)} />
              </div>
              <div className='mb-2 mt-2'>
                <Button name="Transferir" disabled={disableTransferButton} onClick={() => transferencia()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

  )
}

export default Home