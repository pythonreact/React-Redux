import React from 'react';
import { useSudoku } from '../../logics/useSudoku';

const Sudoku: React.FC = () => {
  const { Table } = useSudoku();

  return <Table />;
};

export default Sudoku;
