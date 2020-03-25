import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'CADASTRO',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.nome.focus();
  }

  fSubmit = (e) =>{                                     /* ATO DE SALVAR CADASTRO */ 
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let nome = this.refs.nome.value;
    let sobrenome = this.refs.sobrenome.value;
    let email = this.refs.email.value;
    let endereco = this.refs.endereco.value;

    if(this.state.act === 0){                         /* CADASTRANDO */
      let data = {
        nome, sobrenome, email, endereco
      }
      datas.push(data);
    }else{                                              /*ATUALIZANDO*/
      let index = this.state.index;
      datas[index].nome = nome;
      datas[index].sobrenome = sobrenome;
      datas[index].email = email;
      datas[index].endereco = endereco;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.nome.focus();
  }

  fRemove = (i) => {                                      /* FUNÇÃO DE REMOÇÃO */
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.nome.focus();
  }

  fEdit = (i) => {                                         /* FUNÇÃO DE EDIÇÃO */
    let data = this.state.datas[i];
    this.refs.nome.value = data.nome;
    this.refs.sobrenome.value = data.sobrenome;
    this.refs.email.value = data.email;
    this.refs.endereco.value = data.endereco;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.nome.focus();
  }  

  render() {                                                  /* Corpo da página */
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="nome" placeholder="Nome" className="formField" />
          <input type="text" ref="sobrenome" placeholder="Sobrenome" className="formField" />
          <input type="text" ref="email" placeholder="Seu melhor e-mail" className="formField" />
          <input type="text" ref="endereco" placeholder="Seu endereço" className="formField" />

          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.nome}, {data.sobrenome}, {data.email}, {data.endereco}
              <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
