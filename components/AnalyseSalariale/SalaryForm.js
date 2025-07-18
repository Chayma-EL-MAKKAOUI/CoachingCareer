import React from 'react';

const SalaryForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="number" name="salary" placeholder="Salaire" />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default SalaryForm; 