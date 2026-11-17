# Portal do Aluno

Aplicativo acadêmico desenvolvido com **React Native**, **Expo** e **TypeScript**, como projeto de estudo de navegação e desenvolvimento mobile passado pelo professor Icaro Ferreira.

## Funcionalidades

- **Login:** tela inicial de acesso ao aplicativo.
- **Início:** apresentação do portal e atalhos para as principais áreas.
- **Disciplinas:** listagem de cinco disciplinas e acesso aos detalhes.
- **Notas:** consulta de avaliações, médias, frequência e situação acadêmica.
- **Detalhes:** visualização das informações individuais de cada disciplina.
- **Atividades:** cadastro, conclusão e exclusão de atividades.
- **Perfil:** apresentação de informações do estudante.
- **Configurações:** opção para ativar ou desativar notificações.
- **Sobre:** informações sobre o aplicativo.
- **Sair:** confirmação para retornar à tela de login.

## Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Vector Icons

## Navegação

O aplicativo utiliza três estruturas de navegação:

- **Stack Navigation:** navegação entre a área principal e os detalhes das disciplinas.
- **Bottom Tabs Navigation:** acesso às telas Início, Disciplinas, Notas e Perfil.
- **Drawer Navigation:** menu lateral com acesso às demais funcionalidades.

## Dados e cálculos

O projeto utiliza dados fictícios para demonstrar as funcionalidades acadêmicas.

A média é calculada a partir de duas avaliações. Para a aprovação, são considerados os seguintes critérios:

- Média igual ou superior a 7,0.
- Frequência igual ou superior a 75%.

A aprovação depende do atendimento aos dois critérios.

## Como executar o projeto

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o Expo:

```bash
npx expo start
```

4. Escolha a plataforma desejada para executar o aplicativo.

## Observações

O projeto possui finalidade acadêmica e utiliza dados fictícios. O login é apenas visual, sem autenticação real ou integração com banco de dados. As atividades são mantidas em memória durante a execução do aplicativo.

## Objetivo

Praticar conceitos de desenvolvimento mobile com React Native, gerenciamento de estado, componentes, listas, modais e navegação entre telas.
