import {useState} from  'react';
import {FiSearch} from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {

const [input, setInput]= useState('');
const [cep, setCep] = useState({});

async function handleSearch(){
  if(input === ''){
    alert("Preencha o trem abaixo")
    return;
  }

  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data);
    setInput("");
  }catch{
    alert("Deu ruim, erro de busca")
    setInput("")
  }
}

  return (
    <div className="App">
     <h1 className="title">BUSCADOR DE CEP</h1>
     <div className="InputPrincipal">
     <input 
     type="text" 
     placeholder="Digite seu CEP"
     value={input}
     onChange={(e) => setInput(e.target.value)}
     />
    <button className="btn" onClick={handleSearch}>
      <FiSearch size={25} color='#fff'/>
    </button>
    </div>
    
    {Object.keys(cep).length > 0 && (
      <main className="main">
       <h2>
         CEP: {cep.cep}
       </h2>
       <span>
         {cep.logradouro}
       </span>
       <span>
         Complemento: {cep.complemento}
       </span>
       <span>
         {cep.bairro}
       </span>
       <span>
         {cep.localidade} / {cep.uf}
       </span>
     </main>
    )}
   
    </div>
    
    
  );
}

export default App;
