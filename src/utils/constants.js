

// Configurações do sistema de fidelidade
export const FIDELIDADE_CONFIG = {
  PONTOS_POR_RECOMPENSA: 10,
  PONTOS_POR_COMPRA: 1, // Pontos por real gasto (futura implementação)
  MAX_PONTOS_POR_COMPRA: 50, // Máximo de pontos por compra
};

// Configurações de validação
export const VALIDATION_CONFIG = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
};

// Configurações de UI
export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#eb8b47',
    SECONDARY: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40',
    WHITE: '#ffffff',
    GRAY: '#6c757d',
    LIGHT_GRAY: '#f5f5f5',
  },
  FONT_SIZES: {
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    XLARGE: 18,
    XXLARGE: 24,
    TITLE: 28,
  },
  SPACING: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    XLARGE: 32,
  },
};

// Mensagens de erro
export const ERROR_MESSAGES = {
  AUTH: {
    USER_NOT_FOUND: 'Usuário não encontrado. Verifique seu e-mail.',
    WRONG_PASSWORD: 'Senha incorreta.',
    INVALID_EMAIL: 'E-mail inválido.',
    EMAIL_ALREADY_IN_USE: 'Este e-mail já está sendo usado por outra conta.',
    WEAK_PASSWORD: 'A senha é muito fraca.',
    TOO_MANY_REQUESTS: 'Muitas tentativas de login. Tente novamente mais tarde.',
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo é obrigatório.',
    INVALID_EMAIL: 'E-mail inválido.',
    PASSWORD_TOO_SHORT: 'Senha deve ter pelo menos 6 caracteres.',
    PASSWORDS_DONT_MATCH: 'As senhas não coincidem.',
    NAME_TOO_SHORT: 'Nome deve ter pelo menos 2 caracteres.',
  },
  GENERAL: {
    UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',
    LOADING_ERROR: 'Erro ao carregar dados.',
    SAVE_ERROR: 'Erro ao salvar dados.',
  },
};

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login efetuado com sucesso!',
  SIGNUP: 'Conta criada com sucesso!',
  LOGOUT: 'Você foi desconectado.',
  POINTS_ADDED: 'Pontos adicionados com sucesso!',
  REWARD_REDEEMED: 'Recompensa resgatada com sucesso!',
  RAFFLE_JOINED: 'Participação no sorteio confirmada!',
};

// Configurações do Firebase
export const FIREBASE_CONFIG = {
  COLLECTIONS: {
    USERS: 'users',
    RAFFLES: 'raffles',
    TRANSACTIONS: 'transactions',
  },
  USER_FIELDS: {
    NAME: 'name',
    EMAIL: 'email',
    PONTOS_FIDELIDADE: 'pontosFidelidade',
    SORTEIOS_PARTICIPADOS: 'sorteiosParticipados',
    DATA_CRIACAO: 'dataCriacao',
    ULTIMA_ATUALIZACAO: 'ultimaAtualizacao',
  },
};

// Configurações de navegação
export const SCREENS = {
  LOGIN: 'LoginScreen',
  CADASTRO: 'CadastroScreen',
  HOME: 'HomeScreen',
};

// Configurações de QR Code
export const QR_CODE_CONFIG = {
  SIZE: 200,
  COLOR: 'black',
  BACKGROUND_COLOR: 'white',
  ERROR_CORRECTION_LEVEL: 'M', // L, M, Q, H
};


