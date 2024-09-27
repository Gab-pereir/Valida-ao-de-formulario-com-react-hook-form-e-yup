import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './form.module.css';

// Esquema de validação usando Yup
const schema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Endereço de e-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Sua senha deve ter no mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais'),
}).required();

function App() {
  // Função do React Hook Form com validação pelo schema do Yup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    console.log('Formulário submetido');
  };

  // Função para aplicar a classe de erro, se houver erro no campo
  const applyErrorClass = (error) => (error ? `${styles.inputError}` : '');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contentForm}>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Insira seu nome"
          {...register('name')}
          className={applyErrorClass(errors.name)}
        />
        <span className={styles.labelError}>{errors.name?.message}</span>
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          placeholder="Insira seu e-mail"
          {...register('email')}
          className={applyErrorClass(errors.email)}
        />
        <span className={styles.labelError}>{errors.email?.message}</span>
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          placeholder="Insira sua senha"
          {...register('password')}
          className={applyErrorClass(errors.password)}
        />
        <span className={styles.labelError}>{errors.password?.message}</span>
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          placeholder="Confirme sua senha"
          {...register('password_confirmation')}
          className={applyErrorClass(errors.password_confirmation)}
        />
        <span className={styles.labelError}>{errors.password_confirmation?.message}</span>
      </div>

      <button type="submit">Enviar Formulário</button>
    </form>
  );
}

export default App;
