# Fidelidade Virtual JS

Aplicativo de fidelidade digital desenvolvido em React Native com Expo, permitindo que clientes acumulem pontos através de QR Codes e participem de sorteios.

## 🚀 Funcionalidades

### Para o Cliente:
- ✅ **Autenticação**: Login e cadastro com Firebase Auth
- ✅ **Perfil do Usuário**: Dados pessoais e pontos de fidelidade
- ✅ **QR Code Dinâmico**: Código único para identificação na loja
- ✅ **Sistema de Pontos**: Visualização de pontos atuais e próximas recompensas
- ✅ **Sorteios**: Participação em sorteios ativos
- ✅ **Interface Moderna**: Design responsivo e intuitivo

### Para o Vendedor (Futuras Fases):
- 📋 Scanner de QR Code
- 📋 Gestão de pontos dos clientes
- 📋 Aplicação de descontos e recompensas

## 🛠️ Tecnologias Utilizadas

- **React Native** com Expo
- **Firebase Authentication** para autenticação
- **Firebase Firestore** para banco de dados
- **react-native-qrcode-svg** para geração de QR Codes

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Conta no Firebase Console

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd FidelidadeVirtualJS
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o Firebase:**
   - Acesse o [Firebase Console](https://console.firebase.google.com/)
   - Crie um novo projeto
   - Ative a autenticação por email/senha
   - Crie um app web e copie as credenciais
   - Ative o Firestore Database

4. **Configure as credenciais do Firebase:**
   - Edite o arquivo `firebaseConfig.js`
   - Substitua as configurações pelas suas credenciais do Firebase

5. **Execute o aplicativo:**
```bash
npm start
```

## 📱 Como Usar

### Cadastro de Usuário:
1. Abra o aplicativo
2. Toque em "Cadastrar"
3. Preencha: Nome completo, e-mail e senha
4. Confirme a senha
5. Toque em "Cadastrar"

### Login:
1. Digite seu e-mail e senha
2. Toque em "Entrar"

### Uso do QR Code:
1. Após o login, o QR Code será exibido automaticamente
2. Mostre o QR Code para o vendedor na loja
3. Os pontos serão adicionados automaticamente (quando implementado o app do vendedor)

### Visualização de Pontos:
- Os pontos atuais são exibidos na tela principal
- O sistema mostra quantos pontos faltam para a próxima recompensa
- A cada 10 pontos, o usuário pode resgatar uma recompensa

## 🗂️ Estrutura do Projeto

```
FidelidadeVirtualJS/
├── App.js                 # Componente principal
├── firebaseConfig.js      # Configuração do Firebase
├── package.json           # Dependências do projeto
├── src/
│   ├── screens/           # Telas do aplicativo
│   │   ├── LoginScreen.js
│   │   ├── CadastroScreen.js
│   │   └── HomeScreen.js
│   └── style/             # Estilos
│       ├── LoginScreenStyle.js
│       └── HomeScreenStyle.js
└── assets/                # Imagens e ícones
```

## 🔐 Configuração do Firestore

### Estrutura da Coleção `users`:
```javascript
{
  uid: {
    name: "Nome do Usuário",
    email: "email@exemplo.com",
    pontosFidelidade: 0,
    sorteiosParticipados: [],
    dataCriacao: Timestamp,
    ultimaAtualizacao: Timestamp
  }
}
```

### Regras de Segurança Recomendadas:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚧 Próximas Implementações

### Fase 2 - Funcionalidades Avançadas:
- [ ] Lista de sorteios ativos
- [ ] Participação em sorteios
- [ ] Histórico de transações
- [ ] Notificações push

### Fase 3 - App do Vendedor:
- [ ] Scanner de QR Code
- [ ] Interface para adicionar pontos
- [ ] Gestão de recompensas
- [ ] Relatórios de vendas

## 🐛 Solução de Problemas

### Erro de Autenticação:
- Verifique se as credenciais do Firebase estão corretas
- Confirme se a autenticação por email/senha está ativada

### Erro de QR Code:
- Certifique-se de que a biblioteca `react-native-qrcode-svg` foi instalada
- Verifique se o usuário está autenticado

### Erro de Firestore:
- Confirme se o Firestore está ativado no Firebase Console
- Verifique as regras de segurança





