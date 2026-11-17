
import "react-native-gesture-handler";

import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Alert,
  Switch
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  NavigationContainer,
  DrawerActions
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// ========================================
// 1. NAVEGADORES
// ========================================

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// ========================================
// 2. IDENTIDADE VISUAL
// ========================================

const CORES = {
  marinho: "#172A3A",
  azul: "#243B53",
  oliva: "#3B8067",
  fundo: "#172A3A",
  branco: "#F2F0E8",
  texto: "#F2F0E8",
  secundario: "#AAB8C4",
  borda: "#526A7C",
  aprovado: "#3B8067",
  reprovado: "#D97777"
};

// ========================================
// 3. DADOS DAS DISCIPLINAS
// ========================================

// Dados fictícios para demonstração.
// A média é calculada a partir das duas notas.
// Aprovação: média >= 7 e frequência >= 75%.

const disciplinas = [
  {
    id: "1",
    nome: "Desenvolvimento Mobile",
    professor: "Carlos Almeida",
    nota1: 8.0,
    nota2: 7.0,
    frequencia: 90
  },
  {
    id: "2",
    nome: "Banco de Dados",
    professor: "Mariana Costa",
    nota1: 6.0,
    nota2: 7.0,
    frequencia: 85
  },
  {
    id: "3",
    nome: "Engenharia de Software",
    professor: "Ricardo Santos",
    nota1: 7.5,
    nota2: 8.0,
    frequencia: 70
  },
  {
    id: "4",
    nome: "Desenvolvimento Web",
    professor: "Ana Oliveira",
    nota1: 9.0,
    nota2: 8.0,
    frequencia: 95
  },
  {
    id: "5",
    nome: "Redes de Computadores",
    professor: "Paulo Ferreira",
    nota1: 6.0,
    nota2: 5.0,
    frequencia: 80
  }
];

// ========================================
// 4. FUNÇÕES DE CÁLCULO
// ========================================

function calcularMedia(disciplina: any) {
  return (disciplina.nota1 + disciplina.nota2) / 2;
}

function verificarSituacao(disciplina: any) {
  const media = calcularMedia(disciplina);

  return media >= 7 && disciplina.frequencia >= 75
    ? "Aprovado"
    : "Reprovado";
}

// ========================================
// 5. COMPONENTES REUTILIZÁVEIS
// ========================================

function MeuBotao({
  titulo,
  onPress,
  secundario = false
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.botao,
        secundario && styles.botaoSecundario
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textoBotao,
          secundario && styles.textoBotaoSecundario
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

function Cartao({
  children
}: any) {
  return (
    <View style={styles.cartao}>
      {children}
    </View>
  );
}

function TituloSecao({
  children
}: any) {
  return (
    <Text style={styles.tituloSecao}>
      {children}
    </Text>
  );
}

// ========================================
// 6. TELA DE LOGIN
// ========================================

function Login({ onEntrar }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons
        name="school-outline"
        size={85}
        color={CORES.aprovado}
      />

      <Text style={styles.titulo}>
        Portal do Aluno
      </Text>

      <Text style={styles.descricao}>
        Bem-vindo ao aplicativo acadêmico!
      </Text>

      <Cartao>
        <Text style={styles.subtitulo}>
          Acesse sua área acadêmica
        </Text>

        <MeuBotao
          titulo="Entrar"
          onPress={onEntrar}
        />
      </Cartao>
    </ScrollView>
  );
}

// ========================================
// 7. TELA INICIAL
// ========================================

function Home({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.iconeGrande}>🎓</Text>

      <Text style={styles.titulo}>
        Portal do Aluno
      </Text>

      <Text style={styles.descricao}>
        Bem-vindo ao aplicativo acadêmico!
      </Text>

      <Cartao>
        <Ionicons
          name="school-outline"
          size={38}
          color={CORES.aprovado}
        />

        <Text style={styles.subtitulo}>
          Sua vida acadêmica
        </Text>

        <Text style={styles.descricao}>
          Consulte suas disciplinas, acompanhe suas notas
          e organize suas atividades.
        </Text>

        <MeuBotao
          titulo="Ver disciplinas"
          onPress={() =>
            navigation.navigate("Disciplinas")
          }
        />
      </Cartao>

      <Cartao>
        <Text style={styles.subtitulo}>
          Acesso rápido
        </Text>

        <MeuBotao
          titulo="Consultar notas"
          onPress={() =>
            navigation.navigate("Notas")
          }
          secundario
        />
      </Cartao>
    </ScrollView>
  );
}

// ========================================
// 8. TELA DE DISCIPLINAS
// ========================================

function Disciplinas({ navigation }: any) {
  function abrirDetalhes(item: any) {
    // Envia a disciplina selecionada para o Stack.

    navigation.getParent()?.navigate("Detalhes", {
      disciplina: item
    });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        Minhas disciplinas
      </Text>

      <Text style={styles.descricao}>
        Selecione uma disciplina para consultar os detalhes.
      </Text>

      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemLista}
            onPress={() => abrirDetalhes(item)}
          >
            <View style={styles.itemConteudo}>
              <Ionicons
                name="book-outline"
                size={25}
                color={CORES.aprovado}
              />

              <View style={styles.itemTexto}>
                <Text style={styles.itemTitulo}>
                  {item.nome}
                </Text>

                <Text style={styles.itemDescricao}>
                  Professor: {item.professor}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={22}
              color={CORES.secundario}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ========================================
// 9. TELA DE DETALHES - STACK
// ========================================

function Detalhes({ route, navigation }: any) {
  // Recebe os dados enviados pela tela Disciplinas.

  const { disciplina } = route.params;

  const media = calcularMedia(disciplina);
  const situacao = verificarSituacao(disciplina);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.iconeGrande}>📚</Text>

      <Text style={styles.titulo}>
        {disciplina.nome}
      </Text>

      <Cartao>
        <Text style={styles.subtitulo}>
          Informações da disciplina
        </Text>

        <Text style={styles.descricao}>
          Professor: {disciplina.professor}
        </Text>

        <Text style={styles.descricao}>
          Primeira avaliação: {disciplina.nota1.toFixed(1)}
        </Text>

        <Text style={styles.descricao}>
          Segunda avaliação: {disciplina.nota2.toFixed(1)}
        </Text>

        <Text style={styles.descricao}>
          Média: {media.toFixed(2)}
        </Text>

        <Text style={styles.descricao}>
          Frequência: {disciplina.frequencia}%
        </Text>

        <Text
          style={[
            styles.situacao,
            {
              color: situacao === "Aprovado"
                ? CORES.aprovado
                : CORES.reprovado
            }
          ]}
        >
          {situacao}
        </Text>
      </Cartao>

      <MeuBotao
        titulo="Voltar"
        onPress={() => navigation.goBack()}
        secundario
      />
    </ScrollView>
  );
}

// ========================================
// 10. TELA DE NOTAS
// ========================================

function Notas() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        Notas e desempenho
      </Text>

      <Text style={styles.descricao}>
        Consulte suas avaliações, médias e frequência.
      </Text>

      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => {
          const media = calcularMedia(item);
          const situacao = verificarSituacao(item);

          return (
            <Cartao>
              <Text style={styles.itemTitulo}>
                {item.nome}
              </Text>

              <View style={styles.linhaInfo}>
                <Text style={styles.itemDescricao}>
                  Nota 1: {item.nota1.toFixed(1)}
                </Text>

                <Text style={styles.itemDescricao}>
                  Nota 2: {item.nota2.toFixed(1)}
                </Text>
              </View>

              <Text style={styles.media}>
                Média: {media.toFixed(2)}
              </Text>

              <Text style={styles.itemDescricao}>
                Frequência: {item.frequencia}%
              </Text>

              <Text
                style={[
                  styles.situacao,
                  {
                    color: situacao === "Aprovado"
                      ? CORES.aprovado
                      : CORES.reprovado
                  }
                ]}
              >
                {situacao}
              </Text>
            </Cartao>
          );
        }}
      />
    </View>
  );
}

// ========================================
// 11. TELA DE PERFIL
// ========================================

function Perfil() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons
        name="person-circle-outline"
        size={85}
        color={CORES.aprovado}
      />

      <Text style={styles.titulo}>
        Meu Perfil
      </Text>

      <Cartao>
        <Text style={styles.descricao}>
          Nome: João Silva
        </Text>

        <Text style={styles.descricao}>
          Curso: Análise e Desenvolvimento de Sistemas
        </Text>
      </Cartao>
    </ScrollView>
  );
}

// ========================================
// 12. NAVEGAÇÃO BOTTOM TABS
// ========================================

function NavegacaoTabs({ navigation }: any) {
  const icones: any = {
    "Início": "home-outline",
    "Disciplinas": "book-outline",
    "Notas": "stats-chart-outline",
    "Perfil": "person-outline"
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: CORES.marinho
        },

        headerTintColor: CORES.branco,

        headerTitleStyle: {
          fontWeight: "bold"
        },

        tabBarStyle: {
          backgroundColor: CORES.marinho,
          borderTopColor: CORES.borda,
          height: 62,
          paddingBottom: 7,
          paddingTop: 5
        },

        tabBarActiveTintColor: "#4B9A7D",
        tabBarInactiveTintColor: "#AAB8C4",

        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={icones[route.name] || "ellipse-outline"}
            size={size}
            color={color}
          />
        ),

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold"
        },

        headerLeft: () => (
          <TouchableOpacity
            style={styles.menuBotao}
            onPress={() =>
              navigation.getParent()?.dispatch(
                DrawerActions.toggleDrawer()
              )
            }
          >
            <Ionicons
              name="menu"
              size={28}
              color={CORES.branco}
            />
          </TouchableOpacity>
        )
      })}
    >
      <Tabs.Screen
        name="Início"
        component={Home}
      />

      <Tabs.Screen
        name="Disciplinas"
        component={Disciplinas}
      />

      <Tabs.Screen
        name="Notas"
        component={Notas}
      />

      <Tabs.Screen
        name="Perfil"
        component={Perfil}
      />
    </Tabs.Navigator>
  );
}

// ========================================
// 13. TELA DE ATIVIDADES
// ========================================

function Atividades() {
  const [atividades, setAtividades] = useState<any[]>([]);

  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [atividadeSelecionada, setAtividadeSelecionada] =
    useState<any>(null);

  function adicionarAtividade() {
    if (!titulo.trim()) {
      Alert.alert(
        "Atenção",
        "Informe o nome da atividade."
      );
      return;
    }

    const novaAtividade = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      concluida: false
    };

    setAtividades((lista) => [
      ...lista,
      novaAtividade
    ]);

    setTitulo("");
    setDescricao("");
    setModalAdicionar(false);
  }

  function alternarConclusao(id: string) {
    setAtividades((lista) =>
      lista.map((item) =>
        item.id === id
          ? { ...item, concluida: !item.concluida }
          : item
      )
    );
  }

  function confirmarExclusao() {
    if (!atividadeSelecionada) return;

    setAtividades((lista) =>
      lista.filter(
        (item) => item.id !== atividadeSelecionada.id
      )
    );

    setAtividadeSelecionada(null);
    setModalExcluir(false);
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        Minhas atividades
      </Text>

      <Text style={styles.descricao}>
        Cadastre, conclua e organize suas atividades.
      </Text>

      <MeuBotao
        titulo="+ Adicionar atividade"
        onPress={() => setModalAdicionar(true)}
      />

      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma atividade cadastrada.
          </Text>
        }
        renderItem={({ item }) => (
          <Cartao>
            <View style={styles.atividadeLinha}>
              <TouchableOpacity
                style={styles.atividadeConteudo}
                onPress={() => alternarConclusao(item.id)}
              >
                <Ionicons
                  name={
                    item.concluida
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={25}
                  color={
                    item.concluida
                      ? CORES.aprovado
                      : CORES.secundario
                  }
                />

                <View style={styles.itemTexto}>
                  <Text
                    style={[
                      styles.itemTitulo,
                      item.concluida && styles.textoConcluido
                    ]}
                  >
                    {item.titulo}
                  </Text>

                  {item.descricao ? (
                    <Text style={styles.itemDescricao}>
                      {item.descricao}
                    </Text>
                  ) : null}

                  <Text style={styles.itemDescricao}>
                    {item.concluida ? "Concluída" : "Pendente"}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setAtividadeSelecionada(item);
                  setModalExcluir(true);
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={23}
                  color={CORES.reprovado}
                />
              </TouchableOpacity>
            </View>
          </Cartao>
        )}
      />

      {/* Modal de cadastro */}

      <Modal
        visible={modalAdicionar}
        transparent
        animationType="slide"
        onRequestClose={() => setModalAdicionar(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.tituloModal}>
              Nova atividade
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da atividade"
              placeholderTextColor={CORES.secundario}
              value={titulo}
              onChangeText={setTitulo}
            />

            <TextInput
              style={[styles.input, styles.inputMultilinha]}
              placeholder="Descrição (opcional)"
              placeholderTextColor={CORES.secundario}
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <MeuBotao
              titulo="Cadastrar"
              onPress={adicionarAtividade}
            />

            <MeuBotao
              titulo="Cancelar"
              secundario
              onPress={() => setModalAdicionar(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Modal de confirmação de exclusão */}

      <Modal
        visible={modalExcluir}
        transparent
        animationType="fade"
        onRequestClose={() => setModalExcluir(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.tituloModal}>
              Excluir atividade?
            </Text>

            <Text style={styles.descricao}>
              Deseja realmente excluir esta atividade?
            </Text>

            <MeuBotao
              titulo="Confirmar exclusão"
              onPress={confirmarExclusao}
            />

            <MeuBotao
              titulo="Cancelar"
              secundario
              onPress={() => setModalExcluir(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ========================================
// 14. TELA DE CONFIGURAÇÕES
// ========================================

function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        Configurações
      </Text>

      <Cartao>
        <View style={styles.configLinha}>
          <View style={styles.configTexto}>
            <Text style={styles.itemTitulo}>
              Notificações
            </Text>

            <Text style={styles.itemDescricao}>
              Ativar ou desativar notificações.
            </Text>
          </View>

          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            trackColor={{
              false: CORES.borda,
              true: CORES.aprovado
            }}
            thumbColor={CORES.branco}
          />
        </View>
      </Cartao>
    </View>
  );
}

// ========================================
// 15. TELA SOBRE
// ========================================

function Sobre() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="information-circle-outline"
        size={75}
        color={CORES.aprovado}
      />

      <Text style={styles.titulo}>
        Sobre o aplicativo
      </Text>

      <Cartao>
        <Text style={styles.descricao}>
          Projeto para aprender navegação no React Native.
        </Text>

        <Text style={styles.descricao}>
          Professor: Icaro Ferreira
        </Text>
      </Cartao>
    </View>
  );
}

// ========================================
// 16. SAIR
// ========================================

function Sair({ onLogout }: any) {
  // Controla a exibição da confirmação de saída.

  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  return (
    <View style={styles.container}>
      <Ionicons
        name="log-out-outline"
        size={75}
        color={CORES.aprovado}
      />

      <Text style={styles.titulo}>
        Sair do aplicativo
      </Text>

      <Text style={styles.descricao}>
        Deseja retornar à tela de login?
      </Text>

      <MeuBotao
        titulo="Sair"
        onPress={() => setModalConfirmacao(true)}
      />

      {/* Modal de confirmação de saída */}

      <Modal
        visible={modalConfirmacao}
        transparent
        animationType="fade"
        onRequestClose={() => setModalConfirmacao(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.tituloModal}>
              Sair do aplicativo?
            </Text>

            <Text style={styles.descricao}>
              Deseja retornar à tela de login?
            </Text>

            <MeuBotao
              titulo="Confirmar saída"
              onPress={onLogout}
            />

            <MeuBotao
              titulo="Cancelar"
              secundario
              onPress={() => setModalConfirmacao(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ========================================
// 17. STACK: PRINCIPAL E DETALHES
// ========================================

function NavegacaoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PrincipalTabs"
        component={NavegacaoTabs}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{
          title: "Detalhes da disciplina",
          headerStyle: {
            backgroundColor: CORES.marinho
          },
          headerTintColor: CORES.branco
        }}
      />
    </Stack.Navigator>
  );
}

// ========================================
// 18. DRAWER
// ========================================

function NavegacaoDrawer({ onLogout }: any) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: CORES.marinho
        },

        headerTintColor: CORES.branco,

        drawerStyle: {
          backgroundColor: CORES.marinho
        },

        drawerActiveBackgroundColor: CORES.aprovado,

        drawerActiveTintColor: CORES.branco,

        drawerInactiveTintColor: CORES.branco,

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600"
        }
      }}
    >
      <Drawer.Screen
        name="Principal"
        component={NavegacaoStack}
        options={{
          title: "Portal do Aluno",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Atividades"
        component={Atividades}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="clipboard-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Configurações"
        component={Configuracoes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Sobre"
        component={Sobre}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Drawer.Screen
        name="Sair"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="log-out-outline"
              size={size}
              color={color}
            />
          )
        }}
      >
        {() => (
          <Sair onLogout={onLogout} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// ========================================
// 19. APLICATIVO PRINCIPAL
// ========================================

export default function App() {
  // Controla se o usuário entrou no aplicativo.

  const [logado, setLogado] = useState(false);

  // Enquanto não entrar, exibe a tela de Login.

  if (!logado) {
    return (
      <Login
        onEntrar={() => setLogado(true)}
      />
    );
  }

  // Depois de entrar, exibe a navegação do aplicativo.

  return (
    <NavigationContainer>
      <NavegacaoDrawer
        onLogout={() => setLogado(false)}
      />
    </NavigationContainer>
  );
}

// ========================================
// 20. ESTILOS
// ========================================

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.marinho,
    padding: 20,
    width: "100%",
    maxWidth: 800,
    alignSelf: "center"
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CORES.marinho,
    padding: 22,
    width: "100%",
    maxWidth: 760,
    alignSelf: "center"
  },

  lista: {
    paddingTop: 12,
    paddingBottom: 25,
    width: "100%"
  },

  iconeGrande: {
    fontSize: 65,
    marginBottom: 15
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    color: CORES.texto,
    textAlign: "center",
    marginBottom: 12
  },

  tituloSecao: {
    fontSize: 19,
    fontWeight: "bold",
    color: CORES.texto,
    marginBottom: 12
  },

  subtitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: CORES.texto,
    textAlign: "center",
    marginVertical: 12
  },

  descricao: {
    fontSize: 15,
    color: CORES.secundario,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 12
  },

  cartao: {
    width: "100%",
    backgroundColor: CORES.azul,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.borda,
    padding: 20,
    marginVertical: 8
  },

  botao: {
    backgroundColor: CORES.aprovado,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    minWidth: 160,
    alignItems: "center",
    alignSelf: "center"
  },

  botaoSecundario: {
    backgroundColor: CORES.azul,
    borderWidth: 1,
    borderColor: "#71869A"
  },

  textoBotao: {
    color: CORES.branco,
    fontSize: 16,
    fontWeight: "bold"
  },

  textoBotaoSecundario: {
    color: CORES.branco
  },

  menuBotao: {
    marginLeft: 15,
    padding: 5
  },

  itemLista: {
    backgroundColor: CORES.azul,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CORES.borda,
    padding: 16,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  itemConteudo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  itemTexto: {
    flex: 1,
    marginLeft: 12
  },

  itemTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: CORES.texto,
    marginBottom: 5
  },

  itemDescricao: {
    fontSize: 13,
    color: CORES.secundario,
    marginTop: 4
  },

  linhaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 8
  },

  media: {
    fontSize: 18,
    fontWeight: "bold",
    color: CORES.aprovado,
    marginTop: 10
  },

  situacao: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10
  },

  listaVazia: {
    textAlign: "center",
    color: CORES.secundario,
    marginTop: 35,
    fontSize: 15
  },

  atividadeLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  atividadeConteudo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: CORES.secundario
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  modalConteudo: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: CORES.azul,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 12,
    padding: 22,
    alignItems: "center"
  },

  tituloModal: {
    fontSize: 21,
    fontWeight: "bold",
    color: CORES.texto,
    marginBottom: 18
  },

  input: {
    width: "100%",
    backgroundColor: CORES.marinho,
    borderWidth: 1,
    borderColor: "#71869A",
    borderRadius: 8,
    padding: 13,
    fontSize: 15,
    color: CORES.texto,
    marginBottom: 12
  },

  inputMultilinha: {
    minHeight: 85,
    textAlignVertical: "top"
  },

  configLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  configTexto: {
    flex: 1,
    marginRight: 12
  }
});
