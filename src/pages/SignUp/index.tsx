import React, { useRef, useCallback } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signUp } = useAuth();
  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        // Remove all previous errors
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().email().required('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Validation passed
        const { name, email, password } = data;
        await signUp({ name, email, password });

        await addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        await addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: err.response.data.message,
        });
      }
    },
    [signUp, addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
