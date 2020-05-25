import React from 'react';
import { FiClock } from 'react-icons/fi';

import { Container, Content } from './styles';

interface AppointmentItem {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url?: string;
  };
}

interface AppointmentProps {
  appointments: AppointmentItem[];
}

const Appointment: React.FC<AppointmentProps> = ({ appointments }) => {
  return (
    <Container>
      {appointments.length === 0 && <p>Nenhum agendamento neste período</p>}

      {appointments.map((appointment) => (
        <Content key={appointment.id}>
          <span>
            <FiClock />
            {appointment.hourFormatted}
          </span>

          <div>
            <img
              src={appointment.user.avatar_url}
              alt={appointment.user.name}
            />

            <strong>{appointment.user.name}</strong>
          </div>
        </Content>
      ))}
    </Container>
  );
};

export default Appointment;
