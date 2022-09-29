import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const produtos = [
    {
      codigo: 1000,
      descricao: 'Teclado gamer RGB',
      preco: 758.99,
      quantidade: 237,
    },
    {
      codigo: 1001,
      descricao: 'Memória RAM 16GB',
      preco: 459.99,
      quantidade: 436,
    },
    {
      codigo: 1002,
      descricao: 'Ryzen 9 5900x',
      preco: 3249.99,
      quantidade: 244,
    },
    { codigo: 1003, descricao: 'RTX 3090TI', preco: 12990.0, quantidade: 196 },
  ];

  const [codigo, setCodigo] = useState();
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState();
  const [quantidade, setQuantidade] = useState();
  const [lista, setLista] = useState(produtos);

  const index = lista.findIndex((item) => item.codigo == Number(codigo));
  const codigos = lista.map((l) => l.codigo);

  const adicionar = () => {
    if (
      codigo == '' ||
      codigo < 1 ||
      codigos.includes(Number(codigo)) ||
      descricao == '' ||
      preco == '' ||
      preco < 1 ||
      quantidade == '' ||
      quantidade < 1
    ) {
      alert('Favor preencher os dados corretamente!');
      return;
    }

    setLista((lista) => [
      ...lista,
      {
        codigo: codigo,
        descricao: descricao,
        preco: preco,
        quantidade: quantidade,
      },
    ]);
    limparImputs();
  };

  const apagar = () => {
    if (!Number(codigo)) {
      return;
    }
    setLista([
      ...produtos.slice(0, index),
      ...produtos.slice(index + 1, produtos.length),
    ]);
    limparImputs();
  };

  const editar = () => {
    if (codigo == '' || descricao == '' || preco == '' || quantidade == '') {
      return;
    }
    setLista(
      lista.map((produto) =>
        produto.codigo == codigo
          ? {
              ...produto,
              descricao: descricao,
              preco: preco,
              quantidade: quantidade,
            }
          : { ...produto }
      )
    );
    limparImputs();
  };

  function limparImputs() {
    setCodigo('');
    setDescricao('');
    setPreco('');
    setQuantidade('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewImputs}>
        <TextInput
          style={styles.camposImput}
          placeholder="Código"
          value={codigo}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setCodigo(valor);
          }}
        />

        <TextInput
          style={styles.camposImput}
          placeholder="Descrição"
          value={descricao}
          onChangeText={(valor) => {
            setDescricao(valor);
          }}
        />

        <TextInput
          style={styles.camposImput}
          placeholder="Preço"
          value={preco}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setPreco(valor);
          }}
        />

        <TextInput
          style={styles.camposImput}
          placeholder="Quantidade"
          value={quantidade}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setQuantidade(valor);
          }}
        />
      </View>

      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={adicionar}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={apagar}>
          <Text style={styles.textoBotao}>Apagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={editar}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        renderItem={({ item }) => (
          <Text style={styles.itemLista}>
            {'[' +
              item.codigo +
              ']' +
              ' ' +
              item.descricao +
              '\n' +
              'Preço: ' +
              item.preco.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) +
              '\n' +
              'Quantidade: ' +
              item.quantidade}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  viewImputs: {
    marginTop: 10,
    padding: 8,
  },
  camposImput: {
    borderWidth: 2,
    marginBottom: 5,
    color: '#dc143c',
    fontSize: 15,
    textAlign: 'center',
  },
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  botao: {
    borderRadius: 20,
    backgroundColor: '#daa520',
    padding: 8,
    marginLeft: 5,
  },
  textoBotao: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  itemLista: {
    borderBottomWidth: 2,
    padding: 8,
  },
});
