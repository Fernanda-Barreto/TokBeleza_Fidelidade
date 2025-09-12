
// Validação de e-mail mais robusta
export const validateEmail = (email) => {
  // Regex mais rigoroso para validação de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Verificar se não é um email genérico/fake
  const fakeEmails = [
    'test@test.com',
    'test@example.com',
    'admin@admin.com',
    'user@user.com',
    'email@email.com',
    'teste@teste.com',
    'a@a.com',
    'b@b.com',
    'c@c.com',
    '123@123.com',
    'abc@abc.com'
  ];
  
  if (fakeEmails.includes(email.toLowerCase())) {
    return false;
  }
  
  // Verificar se o domínio tem pelo menos 2 caracteres
  const domain = email.split('@')[1];
  if (domain && domain.length < 2) {
    return false;
  }
  
  return true;
};

// Validação de senha
export const validatePassword = (password) => {
  // Senha deve ter pelo menos 6 caracteres
  return password.length >= 6;
};

// Validação de nome
export const validateName = (name) => {
  // Nome deve ter pelo menos 2 caracteres e não pode conter apenas espaços
  return name.trim().length >= 2;
};

// Validação de confirmação de senha
export const validatePasswordConfirmation = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Validação de telefone (BR): aceita com/sem máscara, exige DDD e 10-11 dígitos
export const validatePhone = (phone) => {
  if (!phone) return false;
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
};

// Função para validar todos os campos do cadastro
export const validateSignUp = (name, email, password, confirmPassword) => {
  const errors = [];

  if (!validateName(name)) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!email.trim()) {
    errors.push('E-mail é obrigatório');
  } else if (!validateEmail(email)) {
    errors.push('E-mail inválido. Use um e-mail real e válido.');
  }

  if (!validatePassword(password)) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }

  if (!validatePasswordConfirmation(password, confirmPassword)) {
    errors.push('As senhas não coincidem');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Função para validar campos do login
export const validateLogin = (email, password) => {
  const errors = [];

  if (!email.trim()) {
    errors.push('E-mail é obrigatório');
  } else if (!validateEmail(email)) {
    errors.push('E-mail inválido. Use um e-mail real e válido.');
  }

  if (!password.trim()) {
    errors.push('Senha é obrigatória');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Função para formatar pontos de fidelidade
export const formatPoints = (points) => {
  return points.toLocaleString('pt-BR');
};

// Função para calcular progresso para próxima recompensa
export const calculateNextReward = (currentPoints, pointsPerReward = 10) => {
  const remainder = currentPoints % pointsPerReward;
  if (remainder === 0) {
    return currentPoints === 0 ? pointsPerReward : 0;
  }
  return pointsPerReward - remainder;
};

// Função para verificar se pode resgatar recompensa
export const canRedeemReward = (currentPoints, pointsPerReward = 10) => {
  return currentPoints >= pointsPerReward;
};

